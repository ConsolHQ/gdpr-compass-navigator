import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MetadataCategory {
  id: string;
  name: string;
  items: string[];
  count: number;
}

interface MetadataContextType {
  metadataCategories: MetadataCategory[];
  getMetadataItems: (categoryId: string) => string[];
  updateMetadataCategory: (categoryId: string, items: string[]) => void;
}

const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

const defaultMetadata: MetadataCategory[] = [
  { id: 'agreement-role', name: 'Agreement role', items: ['Controller', 'Processor', 'Joint Controller', 'Sub-processor', 'Third Party'], count: 5 },
  { id: 'control-requirement-status', name: 'Control requirement status', items: ['Not Started', 'In Progress', 'Completed'], count: 3 },
  { id: 'cost-currency', name: 'Cost (currency)', items: ['USD', 'EUR', 'GBP'], count: 3 },
  { id: 'cost-frequency', name: 'Cost (frequency)', items: ['One-time', 'Monthly', 'Quarterly', 'Annually'], count: 4 },
  { id: 'country', name: 'Country', items: ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'Netherlands', 'Sweden', 'Switzerland'], count: 10 },
  { id: 'data-access-type', name: 'Data Access Type', items: ['Read', 'Write'], count: 2 },
  { id: 'data-classification', name: 'Data classification', items: ['Public', 'Internal', 'Confidential', 'Restricted', 'Personal', 'Sensitive Personal', 'Special Category', 'Criminal', 'Health'], count: 9 },
  { id: 'data-subject-request-status', name: 'Data subject request status', items: ['Received', 'In Review', 'Approved', 'Rejected'], count: 4 },
  { id: 'data-subject-request-type', name: 'Data subject request type', items: ['Access', 'Rectification', 'Erasure', 'Restriction', 'Portability', 'Object', 'Automated Decision Making', 'Consent Withdrawal', 'Complaint', 'Other'], count: 10 },
  { id: 'data-transfer-format', name: 'Data transfer format', items: ['API', 'File Transfer', 'Database Sync'], count: 3 },
  { id: 'employee-function', name: 'Employee function', items: ['IT Department', 'HR Department', 'Finance', 'Marketing', 'Sales', 'Customer Support', 'Legal', 'Operations'], count: 8 },
  { id: 'incident-status', name: 'Incident status', items: ['Open', 'In Progress', 'Resolved', 'Closed'], count: 4 },
  { id: 'information-management-system-status', name: 'Information management system status', items: ['Active', 'Inactive', 'Retired', 'Under Development'], count: 4 },
  { id: 'information-management-system-type', name: 'Information management system type', items: ['CRM', 'ERP', 'Database'], count: 3 },
  { id: 'legal-basis', name: 'Legal basis', items: ['Consent', 'Contract', 'Legal Obligation', 'Vital Interests', 'Public Task', 'Legitimate Interests', 'Explicit Consent'], count: 7 },
  { id: 'mitigation', name: 'Mitigation', items: ['Technical', 'Organizational'], count: 2 },
  { id: 'mitigation-status', name: 'Mitigation status', items: ['Not Started', 'In Progress', 'Completed', 'On Hold'], count: 4 },
  { id: 'policy-type', name: 'Policy Type', items: ['Privacy Policy', 'Cookie Policy', 'Terms of Service', 'Data Processing Agreement'], count: 4 },
  { id: 'statuses', name: 'Statuses', items: ['Active', 'Inactive', 'Draft'], count: 3 },
  { id: 'department', name: 'Department', items: ['IT', 'HR', 'Marketing', 'Finance', 'Legal', 'Operations'], count: 6 },
  { id: 'vendor', name: 'Vendor', items: ['AWS', 'Microsoft', 'Google', 'Salesforce', 'HubSpot'], count: 5 },
  { id: 'data-subject-type', name: 'Data Subject Type', items: ['Customers', 'Employees', 'Suppliers', 'Website Visitors', 'Job Applicants'], count: 5 },
  { id: 'personal-data-type', name: 'Personal Data Type', items: ['Personal Identifiers', 'Contact Information', 'Financial Data', 'Location Data', 'Technical Data'], count: 5 },
  { id: 'special-category-ground', name: 'Special Category Ground', items: ['Explicit Consent', 'Employment Law', 'Public Health', 'Legal Claims'], count: 4 }
];

export const MetadataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [metadataCategories, setMetadataCategories] = useState<MetadataCategory[]>(defaultMetadata);

  const getMetadataItems = (categoryId: string): string[] => {
    const category = metadataCategories.find(cat => cat.id === categoryId);
    return category?.items || [];
  };

  const updateMetadataCategory = (categoryId: string, items: string[]) => {
    setMetadataCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, items, count: items.length }
          : cat
      )
    );
  };

  return (
    <MetadataContext.Provider value={{
      metadataCategories,
      getMetadataItems,
      updateMetadataCategory
    }}>
      {children}
    </MetadataContext.Provider>
  );
};

export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (context === undefined) {
    throw new Error('useMetadata must be used within a MetadataProvider');
  }
  return context;
};