
import { CustomerDetails, QuoteData } from "../types";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, firebaseConfig, FIRESTORE_DATABASE_ID } from "./firebase";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Base URL for the Django Backend (if needed for optional server integrations)
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Submits lead form data to Firebase Firestore
 * Writes to top-level collection: `leads`
 */
export const submitLead = async (data: CustomerDetails): Promise<{ success: boolean; id: string; message: string }> => {
  const leadPayload = {
    name: data.name.trim(),
    mobile: data.mobile.trim(),
    email: data.email.trim(),
    company: data.company.trim(),
    industry: data.industry.trim(),
    state: data.state.trim(),
    consumption: data.consumption.trim(),
    salesperson: data.salesperson.trim(),
    status: 'new',
    createdAt: serverTimestamp(),
  };

  console.log('[Firestore] Initiating write to collection "leads":', {
    projectId: firebaseConfig.projectId,
    databaseId: FIRESTORE_DATABASE_ID,
    collection: 'leads',
    payload: leadPayload
  });

  const pathForWrite = 'leads';
  try {
    const leadsCollectionRef = collection(db, pathForWrite);
    const docRef = await addDoc(leadsCollectionRef, leadPayload);

    console.log('[Firestore] Document created successfully in "leads" collection! Document ID:', docRef.id);
    return {
      success: true,
      id: docRef.id,
      message: 'Lead submitted successfully'
    };
  } catch (error: any) {
    handleFirestoreError(error, OperationType.CREATE, pathForWrite);
  }
};

/**
 * Logs a quote generation event to the Django Backend
 * Payload: QuoteData (mapped to snake_case for backend)
 */
export const logQuoteGeneration = async (data: QuoteData): Promise<void> => {
  try {
    // Map camelCase frontend data to snake_case for Django
    const payload = {
      customer_details: data.customerDetails,
      payment_mode: data.paymentMode,
      configuration: data.configuration,
      total_price: data.totalPrice,
      monthly_price: data.monthlyPrice,
      gst_amount: data.gstAmount,
      total_contract_value: data.totalContractValue
    };

    const response = await fetch(`${API_BASE_URL}/quotes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn('Failed to log quote to backend');
    }
  } catch (error) {
    // Gracefully handle fetch errors (offline/no backend) to prevent console noise
    console.warn('Backend unreachable, skipping quote log.');
  }
};

/**
 * Authenticates a user
 * Note: For a real app, this should hit a JWT token endpoint (e.g., /api/token/)
 */
export const login = async (userId: string, password: string): Promise<{ success: boolean; role?: 'sales' | 'guest'; message?: string }> => {
  // Hardcoded allowed users based on the Sales Rep list
  // Matches First Name (case insensitive)
  const allowedUsers = [
    'salesrepos', // Original admin/sales
    'Ajay',
    'Ketan',
    'Burhan',
    'Malvika',
    'Chetan',
    'Aditi',
    'Prerna'
  ];

  const normalizedUserId = userId.trim().toLowerCase();
  const isValidUser = allowedUsers.some(user => user.toLowerCase() === normalizedUserId);
  
  let isValidPassword = false;
  if (normalizedUserId === 'prerna') {
    isValidPassword = password === 'prerna@123';
  } else {
    isValidPassword = password === 'Repos@123';
  }

  return new Promise(resolve => {
    setTimeout(() => {
        if (isValidUser && isValidPassword) {
            resolve({ success: true, role: 'sales' });
        } else {
            resolve({ success: false, message: 'Invalid credentials' });
        }
    }, 800);
  });
};
