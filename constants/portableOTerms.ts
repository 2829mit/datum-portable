export interface TermItem {
  title?: string;
  content: string;
}

export interface TermSection {
  heading?: string;
  items: TermItem[];
}

export interface ProductTerms {
  documentTitle: string;
  documentSubtitle: string;
  documentCategory: string;
  intro: string;
  sections: TermSection[];
}

export const PORTABLE_O_TERMS: ProductTerms = {
  documentTitle: "REPOS DATUM PORTABLE O SERIES",
  documentSubtitle: "TERMS AND CONDITIONS FOR PROPOSAL",
  documentCategory: "(Consumer Pump Automation)",
  intro:
    "These Terms and Conditions form an integral part of this Proposal issued by Repos Energy India Private Limited (“Repos”) and shall apply to the Products and Services covered under this Proposal. The scope of supply, technical specifications, quantities, commercial terms and any product-specific requirements shall be as set out in this Proposal and the applicable technical documents expressly referenced herein. The Proposal shall specify the applicable products, scope, specifications, and any product-specific requirements. Upon acceptance of the Proposal, the Customer shall issue the applicable Purchase Order or Work Order in accordance with the terms agreed herein.",
  sections: [
    {
      heading: "A. GENERAL TERMS AND CONDITIONS",
      items: [
        {
          title: "1. Scope of Supply and Services",
          content:
            "Repos shall supply, configure and/or commission, as applicable, the products and components identified in this Proposal, in accordance with the scope of supply, technical specifications, quantities and deliverables set out herein and in any technical document expressly referenced in this Proposal. The scope of supply shall include R-ATG Sensors and IoT Controller Panel. Dispensing Unit and Submersible Motor shall be included only where specifically selected and identified in this Proposal as part of the agreed scope.\n\nUnless expressly included in the Proposal, communication wires, power cables, conduits, pipelines, civil works and high-tension (HT) power cable work shall be excluded from Repos’ scope of supply and services and shall be arranged by the Customer at its own cost.\n\nAny activity, service or deliverable not expressly included in the agreed scope shall be undertaken only upon mutual written agreement, including agreement on any additional charges and timelines, as applicable."
        },
        {
          title: "2. Site Readiness and Customer Responsibilities",
          content:
            "The Customer shall ensure that the site is ready for installation or commissioning on the mutually agreed date and shall provide the infrastructure and facilities required for the Products, as communicated by Repos. These shall include, as applicable, completion of civil works, availability of electrical power supply and proper earthing, network connectivity and cable/s routing including the cable/s specified by Repos, suitable site access and other necessary work permits and access permissions.\n\nThe Customer shall arrange, at its own cost, all items and works expressly excluded from Repos' scope under Clause 1, including communication wires, power cables, conduits, pipelines, civil works and high-tension (HT) power cable work, unless otherwise expressly agreed in writing between the parties. The Customer shall ensure that such infrastructure and works are completed in accordance with the technical requirements communicated by Repos and are ready before the scheduled installation and commissioning.\n\nThe Customer shall ensure that the relevant tanks, assets and associated infrastructure meet the compatibility and technical requirements communicated by Repos. Any fuel tank modifications or other infrastructure changes required for sensor installation shall be within the Customer's scope and at the Customer's cost, where applicable and identified in this Proposal or communicated by Repos in writing before the relevant work is undertaken.\n\nThe Customer shall, wherever required, obtain and maintain approvals, licences and permissions required under applicable law for its premises, tanks, vehicles/assets and its storage, handling and use of fuel, to the extent such matters fall within the Customer’s responsibility. Any delay or additional site visit arising from the Customer's failure to meet the agreed site-readiness requirements shall be addressed in accordance with these Terms and Conditions."
        },
        {
          title: "3. Commissioning and Acceptance",
          content:
            "The parties shall coordinate the commissioning schedule. Where commissioning cannot proceed because the site is not ready or the unavailability of any infrastructure, access, or customer-provided item required for the agreed scope, the parties shall mutually decide on a revised schedule; any additional site visit or associated charge shall be communicated to the Customer and shall be subject to the Customer’s written approval before being incurred, in accordance with Clause 7.\n\nWhere commissioning is included in the scope of this Proposal, Repos or its authorised personnel shall carry out the agreed commissioning checks. Any defects or outstanding items identified during installation or commissioning may be recorded in the installation/commissioning report. Signing the report or commencing use shall not, by itself, waive a valid warranty claim for a defect that could not reasonably have been identified at that time."
        },
        {
          title: "4. Operation, Access and Changes",
          content:
            "The Customer shall operate and use the Products in accordance with the instructions, specifications and safety requirements provided by Repos or the applicable original equipment manufacturer (“OEM”). The Customer shall provide reasonable site access for inspection, installation/commissioning, calibration, maintenance and servicing, as applicable. The Customer shall not tamper with, modify, relocate, dismantle or interfere with the Products without Repos’ prior written approval. Any approved modification or relocation shall be subject to the applicable technical requirements, including recommissioning, if required. Any associated charges and timelines shall be communicated to and approved by the Customer in writing before the work is undertaken."
        },
        {
          title: "5. Warranty and Product Defects",
          content:
            "5.1. Repos-Manufactured Products: Products and components manufactured by Repos shall carry a warranty of twelve (12) months from the date of successful commissioning or fifteen (15) months from the date of supply, whichever is earlier, covering manufacturing defects under normal operating conditions, unless otherwise specified in this Proposal.\n\n5.2. OEM-Manufactured Components: Products and components manufactured by third-party original equipment manufacturers (“OEMs”) shall be covered by the applicable OEM warranty. Repos shall facilitate the Customer’s warranty claims with the relevant OEM and extend the benefit of the applicable OEM warranty to the Customer on a back-to-back basis, subject to the OEM’s warranty terms, conditions, exclusions and limitations.\n\n5.3. Warranty Exclusions: The warranty shall not cover defects, damage or malfunction arising from misuse, unauthorised modification or relocation, failure to follow operating instructions, unsuitable site conditions, improper maintenance, or other circumstances excluded under the applicable warranty terms.\n\n5.4. Warranty Claims and Repairs: The Customer shall notify Repos of any suspected defect during the applicable warranty period and provide reasonable access and assistance for inspection. Repos shall assess the claim or coordinate with the relevant OEM, as applicable. Repairs or services not covered under the applicable warranty may be chargeable to the Customer, subject to prior communication and written approval in accordance with Clause 7."
        },
        {
          title: "6. Service Requests and Maintenance",
          content:
            "The Customer may report a technical issue or service request through the support channels communicated by Repos. Repos shall provide for the Products within the scope agreed under this Proposal and shall coordination with the relevant OEM, where required, for issues relating to OEM-manufactured components. Response times, service hours, preventive maintenance visits, spare-parts coverage and any service-level commitments shall apply only where expressly stated in this Proposal or under a separate Annual Maintenance Contract (“AMC”) executed between the parties. Any repair, maintenance or other service outside agreed scope or applicable warranty may be chargeable in accordance with Clause 7."
        },
        {
          title: "7. Chargeable Work and Customer Approval",
          content:
            "Any repair, replacement, maintenance or other work not covered under the applicable warranty or expressly included in this Proposal may be charged in accordance with Repos' applicable rates or terms, subject to prior communication and written approval from the Customer."
        },
        {
          title: "8. Connectivity, Data Transmission and Platform Availability",
          content:
            "The functioning of Products requiring connectivity, remote monitoring or data transmission is dependent on the availability of power supply, 3G/4G SIM Card based network connectivity, and other supporting infrastructure. The Customer shall provide and maintain the required infrastructure at its own cost, unless otherwise specified in this Proposal.\n\nRepos shall not be responsible for interruptions, delays or loss of data transmission to the extent caused by a third-party network outage, power failure or other circumstance outside its reasonable control. This limitation does not exclude the applicable obligations for a fault attributable to Products or services supplied by Repos, as determined under the applicable warranty or service terms. The Customer shall promptly report material connectivity or data-transmission issues through the designated service channel. Any offline storage, later synchronisation, alerts or alternative operating mode shall be available only to the extent supported by the relevant Product and specified by Repos."
        },
        {
          title: "9. Readings, Dispensing and Calibration",
          content:
            "The readings and dispensing records generated by the Products are intended for monitoring purposes and may be subject to variations depending on operating conditions, calibration and connectivity. The RATG Sensors are intended for tank-level monitoring only and operational visibility and shall not, by itself, be treated as a certified instrument for accounting, invoicing, financial reconciliation or statutory measurement. The Customer shall promptly report any discrepancies in readings or dispensing records to Repos. Calibration shall be carried out in accordance with the applicable product specifications, warranty terms and agreed service scope. Any calibration or related service not covered under the applicable warranty or expressly included in this Proposal may be chargeable in accordance with Clause 7."
        },
        {
          title: "10. Safety and Regulatory Compliance",
          content:
            "Each party shall comply with applicable laws and regulations in relation to the activities undertaken by it under this Proposal. The Customer shall be responsible for compliance with applicable laws and regulatory requirements relating to its premises, storage tanks, vehicles/assets, fuel storage, handling and dispensing operations, except to the extent such responsibility is expressly allocated to Repos under this Proposal or applicable law. Repos shall comply with applicable laws and safety requirements relating to the installation, commissioning and services undertaken by it under this Proposal."
        },
        {
          title: "11. Technology Annual Maintenance Contract (Technology AMC)",
          content:
            "If a Technology AMC is mandatory after the first year from installation/commissioning, the applicable AMC fee, scope, commencement date, duration, payment terms and renewal or discontinuation consequences shall be set out in a separate AMC document provided to the Customer. The AMC shall cover only the services and technology features expressly identified in that document. Any effect of not maintaining an AMC on platform access, support or technology features shall be disclosed in the applicable commercial terms before the Customer becomes bound by the AMC requirement."
        },
        {
          title: "12. Additional Features, Integration and Changes",
          content:
            "Standard technology features are those expressly described in the Proposal. Any additional integration, reporting, analytics, ERP connection, customisation or other change requested by the Customer shall be assessed separately. Repos shall provide a written description of the proposed scope, fees, dependencies and estimated timelines, and shall proceed only after written approval by the Customer."
        },
        {
          title: "13. Data and Records",
          content:
            "The Customer may access the data and records made available to it through the Repos Platform, subject to the functionality of the Products and the access rights described in this Proposal. The parties shall use customer and operational data in accordance with applicable law and any applicable privacy, confidentiality or data-processing terms agreed between them. Data availability, retention, export and access after expiry or termination shall be governed by the applicable platform terms. The Customer is responsible for maintaining any separate records it is legally required to retain."
        },
        {
          title: "14. Charges, Payment Terms and Taxes",
          content:
            "The Customer shall pay 100% of the total order value in advance, in accordance with the commercial terms set out in the Proposal. Based on the Proposal, the Customer shall issue the applicable Purchase Order or Work Order (“PO/WO”). Repos may issue a Pro Forma Invoice (“PI”) for the advance payment. Repos shall issue the Tax Invoice (“TI”) at the applicable stage of the transaction in accordance with applicable law.\n\nThe PI and TI shall serve their respective payment and invoicing purposes and shall not, by themselves, amend the scope, specifications, prices or other agreed terms set out in the Proposal and these Terms and Conditions. Any additional charges shall be communicated to and approved by the Customer in writing, where required under these Terms and Conditions. Applicable taxes shall be charged in accordance with law and shall be payable by the Customer in addition to the fees and charges, unless expressly stated otherwise in the Proposal."
        },
        {
          title: "15. Limitation of Liability",
          content:
            "To the extent permitted by applicable law, neither party shall be liable to the other for indirect or consequential losses arising out of the engagement. Repos shall not be liable for any indirect or consequential loss arising from temporary unavailability of the Products, connectivity failures, external factors affecting readings or data, or misuse of the Products by the Customer. Repos shall also not be responsible for delays or non-performance to the extent caused by force majeure events, site inaccessibility, delays in site readiness or infrastructure, or delays attributable to the Customer or third parties beyond Repos’ reasonable control. Nothing in these Terms and Conditions excludes or limits liability to the extent such exclusion or limitation is prohibited by law, or for fraud or wilful misconduct."
        },
        {
          title: "16. Documentation and Order of Precedence",
          content:
            "The Proposal, together with these Terms and Conditions, shall form the contractual basis of the transaction, and the Customer’s PO/WO shall confirm the order placed pursuant to the Proposal.\n\nAny additional or conflicting terms in the PO/WO shall apply only if expressly accepted in writing by authorized representatives of both parties. In the event of any inconsistency, any separately executed agreement or amendment shall prevail to the extent it addresses the relevant matter, followed by the Proposal and these Terms and Conditions, and then the PO/WO, unless otherwise agreed in writing.\n\nAny applicable OEM warranty service terms shall apply to the relevant component to the extent incorporated into the Proposal or otherwise agreed in writing."
        },
        {
          title: "17. Suspension, Termination and Post-Termination Matters",
          content:
            "Repos may suspend the affected services or use of the Products, upon written notice to the Customer, where necessary due to a material breach of these Terms and Conditions, non-payment of amounts due, or a safety or regulatory concern. Where reasonably practicable, Repos shall provide the Customer an opportunity to remedy the relevant issue before suspension, except where immediate suspension is necessary for safety or legal compliance. On expiry or termination, the Customer shall pay undisputed amounts due for Products supplied and services performed. Access to the platform, retrieval or export of available records, and any removal, return or continued use of Products shall be handled in accordance with the Proposal or the applicable platform, equipment or service terms."
        },
        {
          title: "18. General",
          content:
            "Any change to the agreed scope or these Terms and Conditions must be recorded in writing and accepted by authorised representatives of both parties. If any provision is held unenforceable, the remaining provisions shall continue to apply to the extent permitted by law. These Terms and Conditions shall be governed by the laws of India, and the courts at Pune, Maharashtra shall have exclusive jurisdiction over disputes arising out of or in connection with the Proposal and these Terms and Conditions."
        }
      ]
    },
    {
      heading: "B. COMPONENT-SPECIFIC TERMS",
      items: [
        {
          title: "1. Repos Automatic Tank Gauging (RATG) Sensor",
          content:
            "1. The RATG Sensor is intended for fuel-level monitoring and operational visibility. Readings may vary due to tank configuration, installation, fuel characteristics, temperature, calibration and other operating or environmental factors.\n2. The Customer shall ensure that the tank and associated infrastructure meet the compatibility requirements communicated by Repos and shall provide reasonable access for inspection, servicing and calibration.\n3. The RATG Sensor shall not, by itself, be relied upon as the basis for accounting, invoicing, financial reconciliation or statutory measurement. Suspected material discrepancies shall be reported and handled in accordance with Clause A.9."
        },
        {
          title: "2. Repos One Sync (IoT Controller)",
          content:
            "1. Repos One Sync enables communication, data transmission and remote monitoring of connected Products through the applicable Repos Platform. Its functions depend on power, network availability, signal strength and compatibility of connected hardware and software.\n2. Unless otherwise stated in the Proposal, the Customer shall arrange and maintain a functional 4G SIM in its name and comply with applicable telecom requirements.\n3. Installation and configuration shall follow the specifications communicated by Repos. Faults or interruptions shall be reported through the service process in Clause A.6 and addressed in accordance with the applicable warranty and service terms."
        },
        {
          title: "3. Repos Secure Fuelling",
          content:
            "1. A Repos Secure Fuelling passive tag is intended to identify and authenticate the designated vehicle or asset. Identification may be affected by tag placement, condition, reader compatibility, environmental conditions or other external factors.\n2. The Customer shall use each tag only for the vehicle or asset to which it has been assigned and shall promptly report a lost, damaged or suspected compromised tag. Any replacement, reassignment or reconfiguration charges shall be communicated in advance and handled under Clause A.7.\n3. Repos Secure Fuelling passive tag identification does not replace any other operational, safety or legal checks required for dispensing fuel."
        },
        {
          title: "4. Dispensing Unit (DU)",
          content:
            "1. The Dispensing Unit shall be installed, operated and maintained in accordance with the applicable OEM specifications and operating instructions.\n2. Calibration shall be carried out by the OEM or its authorised personnel, as applicable. The Proposal shall identify any calibration included in the supply or service scope and any charges for subsequent calibration.\n3. Maintenance, servicing and technical support shall be provided by the OEM or its authorised service personnel, with Repos providing coordination support to the extent specified in the Proposal. The applicable OEM warranty and service route shall be identified or provided to the Customer."
        },
        {
          title: "5. Repos Datum X-O Series",
          content:
            "1. The applicable model, configuration, capacity, specifications, intended use, installation requirements and included components shall be as set out in the Proposal and relevant product documentation.\n2. The Customer shall operate the relevant Product within the specified operating conditions and shall not alter or relocate it except with prior written approval in accordance with Clause A.4.\n3. Any model-specific safety, maintenance, warranty or operating conditions supplied with the Product shall be read together with these Terms and Conditions. In the event of a conflict, the order of precedence in Clause A.16 shall apply, unless the parties expressly agree otherwise in writing.\n4. The Customer shall use the DATUM unit only for its intended purpose and with fuel compatible with the unit's specifications, and shall comply with the operating, safety and maintenance instructions provided by Repos. The Customer shall not relocate the unit, alter its configuration or interfere with its safety features without prior written approval from Repos."
        }
      ]
    }
  ]
};
