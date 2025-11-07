export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  requires?: string;
}

export interface Bill {
  id: string;
  serviceName: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Due' | 'Overdue';
}

export interface ChangeRequest {
  id: string;
  participantName: string;
  serviceId: string;
  serviceName:string;
  requestType: 'add' | 'cancel' | 'change';
  details: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ParticipantRecord {
  id: string;
  participantName: string;
  programId: string;
  programName: string;
  enrollmentDate: string;
  expirationDate: string;
  eligibilityScore: number;
  nextReviewDate: string;
  servicesUsed: string[];
}
