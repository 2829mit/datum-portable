export interface Representative {
  empNo: string;
  name: string;
  phone: string;
  email: string;
  department?: string;
  location?: string;
}

export const REPRESENTATIVES_DATA: Representative[] = [
  { empNo: 'RE1645', name: 'Rishabh A Kumar', phone: '9764050754', email: 'rishabh.kumar@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1578', name: 'Chirag Kishor Patil', phone: '8698572488', email: 'chirag.patil@reposenergy.com', department: 'SALES', location: 'Pune HO' },
  { empNo: 'RE1868', name: 'Kotturi Vineeth Kumar', phone: '6302038515', email: 'vineeth.kotturi@reposenergy.com', department: 'Sales - Demand Activation', location: 'Hyderabad' },
  { empNo: 'RE1851', name: 'Gaurav Hiralal Saindane', phone: '8380823204', email: 'gaurav.saindane@reposenergy.com', department: 'SALES', location: 'Pune HO' },
  { empNo: 'RE1587', name: 'Ketan Pradeep Sarode', phone: '7875487815', email: 'ketan.sarode@reposenergy.com', department: 'SALES', location: 'Pune HO' },
  { empNo: 'RE1612', name: 'Asif Samad Shaikh', phone: '9511691181', email: 'asif.shaikh@reposenergy.com', department: 'SALES', location: 'Pune HO' },
  { empNo: 'RE1542', name: 'Swapnil Thakur', phone: '8390900632', email: 'swapnil.thakur@reposenergy.com', department: 'SALES', location: 'Pune HO' },
  { empNo: 'RE1876', name: 'Kaveri Appasaheb Gore', phone: '9767611222', email: 'kaveri.gore@reposenergy.com', department: 'Marketing', location: 'Pune HO' },
  { empNo: 'RE1744', name: 'Prajakta Rajendra Ayade', phone: '9673902782', email: 'prajakta.ayade@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1701', name: 'Yash Laheja', phone: '9039385448', email: 'yash.laheja@reposenergy.com', department: 'SALES', location: 'Nagpur' },
  { empNo: 'RE1883', name: 'Pasam Radha Krishna Murthy', phone: '8501078146', email: 'radhakrishnapasam7@gmail.com', department: 'Sales - Supply Expansion', location: 'Hyderabad' },
  { empNo: 'RE1825', name: 'Prem Ranjan Pandey', phone: '9472898261', email: 'premranjan.pandey@reposenergy.com', department: 'Sales - Supply Expansion', location: 'Patna' },
  { empNo: 'RE1865', name: 'Sachin Varrier', phone: '9946033666', email: 'sachin.varrier@reposenergy.com', department: 'Sales - Supply Expansion', location: 'Pune HO' },
  { empNo: 'RE1695', name: 'Shamanth Gowda S', phone: '9632324369', email: 'shamanth.gowda@reposenergy.com', department: 'SALES', location: 'Bangalore' },
  { empNo: 'RE1647', name: 'Prahladkumar Patel', phone: '8128208523', email: 'prahladkumar.patel@reposenergy.com', department: 'SALES', location: 'Amhedabad' },
  { empNo: 'RE1475', name: 'Shreyas Chaudhari', phone: '8329580526', email: 'shreyas.chaudhari@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1809', name: 'Masabathini Gagan Sai Chandra Bose', phone: '7674894609', email: 'gagan.chandra@reposenergy.com', department: 'SALES', location: 'Hyderabad' },
  { empNo: 'RE1824', name: 'Prathamesh Ghanshyam Rajebhosale', phone: '9545399207', email: 'prathamesh.rajebhosale@reposenergy.com', department: 'Sales - Demand Activation', location: 'Pune HO' },
  { empNo: 'RE1611', name: 'Amaresh Hiremath', phone: '9611175207', email: 'amaresh.hiremath@reposenergy.com', department: 'SALES', location: 'Bangalore' },
  { empNo: 'RE1872', name: 'Rushikesh Prakash Patil', phone: '8421530997', email: 'rushikesh.patil@reposenergy.com', department: 'Marketing - MarCom', location: 'Pune HO' },
  { empNo: 'RE1730', name: 'Arun Singh', phone: '6396011932', email: 'arun.singh@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1873', name: 'Mukesh Yadav', phone: '7040100106', email: 'mukesh.yadav@reposenergy.com', department: 'Marketing - Media', location: 'Pune HO' },
  { empNo: 'RE1734', name: 'Bhavin Sutariya', phone: '6353360711', email: 'bhavin.sutariya@reposenergy.com', department: 'SALES', location: 'Gujarat' },
  { empNo: 'RE1803', name: 'Mandla Sai Krishna', phone: '9133163346', email: 'mandla.saikrishna@reposenergy.com', department: 'SALES', location: 'Hyderabad' },
  { empNo: 'RE1859', name: 'Yaddanapudi Pradeep', phone: '9703022666', email: 'yaddanapudi.pradeep@reposenergy.com', department: 'SALES', location: 'Hyderabad' },
  { empNo: 'RE1684', name: 'Kushagra Bhargava', phone: '9730252813', email: 'kushagra.bhargava@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1431', name: 'Shreyank VP', phone: '9741665761', email: 'shreyank.vp@reposenergy.com', department: 'SALES', location: 'Bangalore' },
  { empNo: 'RE1779', name: 'Kalakaturu Navya Sree', phone: '9573091909', email: 'Navya.Kalakaturu@reposenergy.com', department: 'MARKETING', location: 'Bangalore' },
  { empNo: 'RE1867', name: 'Riddhi Girish Pardeshi', phone: '7757977750', email: 'riddhi.pardeshi@reposenergy.com', department: 'PreSales - Marketing', location: 'Pune HO' },
  { empNo: 'RE1853', name: 'Madhuri Bhosle', phone: '8805729726', email: 'madhuri.bhosle@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1849', name: 'Yash Shantaram Barne', phone: '8237946055', email: 'yash.barne2@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1560', name: 'Greeshma Sajeev', phone: '7420084875', email: 'greeshma.sajeev@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1712', name: 'Prachiti Sudhanwa Khandekar', phone: '8788145946', email: 'prachiti.khandekar@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1510', name: 'Naveen Kodal', phone: '9986361958', email: 'naveen.n.kodal@reposenergy.com', department: 'SALES', location: 'Bangalore' },
  { empNo: 'RE1874', name: 'Rupesh Haridas Tonpe', phone: '7972081702', email: 'rupesh.tonpe@reposenergy.com', department: 'Marketing - MarCom', location: 'Pune HO' },
  { empNo: 'RE1594', name: 'Meshack Hella Lavis', phone: '8610125863', email: 'meshack.lavis@reposenergy.com', department: 'SALES', location: 'Salem' },
  { empNo: 'RE1767', name: 'Chinmay S Aradhya', phone: '8431604856', email: 'Chinmay.Aradhya@reposenergy.com', department: 'SALES', location: 'Mysore' },
  { empNo: 'RE1877', name: 'Charudatta Sunil Deshpande', phone: '9021442257', email: 'charudatta.deshpande@reposenergy.com', department: 'Sales - Demand Activation', location: 'Pune HO' },
  { empNo: 'RE1866', name: 'Niketan Sharma', phone: '8146140540', email: 'niketan.sharma@reposenergy.com', department: 'New Expansion', location: 'Gurgaon' },
  { empNo: 'RE1635', name: 'Siddhi Kailash Saungar', phone: '8087589243', email: 'siddhi.saungar@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1792', name: 'Abhishek Manikprabhu Potdar', phone: '9156201979', email: 'abhishek.potdar@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1856', name: 'Jaisurya Sankar', phone: '9360416716', email: 'jaisurya.sankar@reposenergy.com', department: 'SALES', location: 'Tamilnadu' },
  { empNo: 'RE1710', name: 'Sumita Sharma', phone: '9725324007', email: 'sumita.sharma@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1550', name: 'Sanket Bharat Chavan', phone: '9960739026', email: 'sanket.chavan@reposenergy.com', department: 'SALES', location: 'Pune HO' },
  { empNo: 'RE1693', name: 'Kishore G', phone: '9003229056', email: 'kishore.g@reposenergy.com', department: 'SALES', location: 'Chennai' },
  { empNo: 'RE1810', name: 'Abhishek P', phone: '8489291264', email: 'abhishek.p@reposenergy.com', department: 'SALES', location: 'Kerala Coimbatore' },
  { empNo: 'RE1846', name: 'Akhil Raj', phone: '9119977051', email: 'akhil.raj@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1307', name: 'Shreen Sharma', phone: '8890750989', email: 'shreen.sharma@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1750', name: 'Tanishq Sunil Sonawane', phone: '9067011706', email: 'tanishq.sonawane@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1711', name: 'Piyush Prakash Patil', phone: '9021612010', email: 'piyush.patil@reposenergy.com', department: 'SALES', location: 'Pune HO' },
  { empNo: 'RE1115', name: 'Ajay Kumar', phone: '7015493848', email: 'ajay@reposenergy.com', department: 'Business Growth', location: 'Pune HO' },
  { empNo: 'RE1556', name: 'Ankita Shivaji Nale', phone: '7420831998', email: 'ankita.nale@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1797', name: 'K Akash Sriram', phone: '7010169011', email: 'akash.sriram@reposenergy.com', department: 'SALES', location: 'Pune HO' },
  { empNo: 'RE1869', name: 'Muralidharan B', phone: '9487230915', email: 'muralidharan.b@reposenergy.com', department: 'Sales - Supply Expansion', location: 'Chennai' },
  { empNo: 'RE1791', name: 'Dhimanth MP', phone: '8637653230', email: 'dhimanth.ks@reposenergy.com', department: 'MARKETING', location: 'Bangalore' },
  { empNo: 'RE1732', name: 'Siddhesh Ratnakant Patil', phone: '7249787424', email: 'siddhesh.patil@reposenergy.com', department: 'SALES', location: 'Mumbai' },
  { empNo: 'RE1882', name: 'Meet Rajesh Patel', phone: '9699957190', email: 'pateelmeet@gmail.com', department: 'Sales - Supply Expansion', location: 'Mumbai' },
  { empNo: 'RE1662', name: 'Pratik Dinesh Punyarthi', phone: '8554864427', email: 'pratik.punyarthi@reposenergy.com', department: 'MARKETING', location: 'Pune HO' },
  { empNo: 'RE1597', name: 'Dipam Lalitkumar Tiwari', phone: '9175959579', email: 'dipam.tiwari@reposenergy.com', department: 'SALES', location: 'Nagpur' },
];

// Additional legacy representatives to preserve backwards compatibility
export const LEGACY_REPRESENTATIVES: Representative[] = [
  { empNo: 'LEGACY_01', name: 'Ketan Sarode', phone: '7875487815', email: 'ketan.sarode@reposenergy.com' },
  { empNo: 'LEGACY_02', name: 'Burhan Cyclewala', phone: '8149775353', email: 'burhan@reposenergy.com' },
  { empNo: 'LEGACY_03', name: 'Malvika Sharma', phone: '8956853779', email: 'Malvika.Sharma@reposenergy.com' },
  { empNo: 'LEGACY_04', name: 'Chetan Walunj', phone: '9552555555', email: 'chetan@reposenergy.com' },
  { empNo: 'LEGACY_05', name: 'Aditi Walunj', phone: '9552555555', email: 'aditi@reposenergy.com' },
  { empNo: 'LEGACY_06', name: 'Prerna Kumari', phone: '8669990062', email: 'prerna@reposenergy.com' },
];

export const ALL_REPRESENTATIVES: Representative[] = [
  ...REPRESENTATIVES_DATA,
  ...LEGACY_REPRESENTATIVES.filter(lr => !REPRESENTATIVES_DATA.some(rd => rd.name.toLowerCase() === lr.name.toLowerCase()))
];

// List of names for the Repos Representative dropdown
export const SALESPERSON_OPTIONS: string[] = ALL_REPRESENTATIVES.map(rep => rep.name);

// Fast lookup map by representative name and email (case-insensitive)
export const SALES_CONTACTS: Record<string, { mobile: string; email: string }> = {};

ALL_REPRESENTATIVES.forEach(rep => {
  const contact = { mobile: rep.phone, email: rep.email };
  SALES_CONTACTS[rep.name] = contact;
  SALES_CONTACTS[rep.name.toLowerCase()] = contact;
  SALES_CONTACTS[rep.email] = contact;
  SALES_CONTACTS[rep.email.toLowerCase()] = contact;
  if (rep.empNo) {
    SALES_CONTACTS[rep.empNo] = contact;
    SALES_CONTACTS[rep.empNo.toLowerCase()] = contact;
  }
});

export const DEFAULT_CONTACT = { mobile: '8669990062', email: 'rajesh.jadhav@reposenergy.com' };
