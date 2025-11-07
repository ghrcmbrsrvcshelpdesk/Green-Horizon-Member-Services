// Fix: Provide valid mock data constants.
// This file was previously invalid, causing build errors across the application.
// It now correctly defines and exports the required mock data for services, bills,
// participant records, and change requests, resolving all import errors.
import { Service, Bill, ChangeRequest, ParticipantRecord } from './types';

/**
 * A comprehensive list of all services offered by Green Horizon.
 */
export const MOCK_SERVICES: Service[] = [
    { id: 'S001', name: 'Financial Wellness Workshop', description: 'Learn budgeting, saving, and investment strategies from certified financial planners.', price: 25, category: 'Finance' },
    { id: 'S002', name: 'Mental Health Counseling', description: 'Confidential one-on-one sessions with licensed therapists to support your mental well-being.', price: 50, category: 'Health' },
    { id: 'S003', name: 'Resume Building & Career Coaching', description: 'Get professional help to craft a winning resume and navigate your career path.', price: 40, category: 'Career' },
    { id: 'S004', name: 'Legal Consultation Services', description: 'Access to a network of lawyers for basic legal advice on personal matters.', price: 75, category: 'Legal' },
    { id: 'S005', name: 'Cybersecurity Basics Training', description: 'Learn how to protect yourself from online threats, phishing, and scams.', price: 30, category: 'Technology' },
    { id: 'S006', name: 'Home Ownership Seminar', description: 'A comprehensive guide to buying your first home, from mortgage applications to closing.', price: 20, category: 'Home' },
    { id: 'S007', name: 'Small Business Mentorship', description: 'Connect with experienced entrepreneurs to guide you in your business journey.', price: 100, category: 'Business' },
    { id: 'S008', name: 'Community Gardening Club', description: 'Join fellow members in cultivating a community garden. Fresh produce and social connections!', price: 0, category: 'Community' },
    { id: 'S009', name: 'Local Charity Volunteering', description: 'Opportunities to give back to the community through organized volunteer events.', price: 0, category: 'Volunteer' },
    { id: 'S010', name: 'Advanced Tech Skill Bootcamp', description: 'Intensive training in modern software development practices.', price: 150, category: 'Technology', requires: 'S005' },
];

/**
 * A sample list of services a participant is currently enrolled in.
 * Used for the Participant Portal.
 */
export const MOCK_PARTICIPANT_SERVICES: Service[] = [
    MOCK_SERVICES[0], // Financial Wellness Workshop
    MOCK_SERVICES[2], // Resume Building & Career Coaching
];

/**
 * A sample list of bills for the current participant.
 */
export const MOCK_BILLS: Bill[] = [
    { id: 'B01', serviceName: 'Financial Wellness Workshop', amount: 25, dueDate: '2024-08-15', status: 'Paid' },
    { id: 'B02', serviceName: 'Resume Building & Career Coaching', amount: 40, dueDate: '2024-08-25', status: 'Due' },
    { id: 'B03', serviceName: 'Old Service Bill', amount: 30, dueDate: '2024-07-20', status: 'Overdue' },
];

/**
 * A list of all participant records in the system.
 * Used for Admin and Verification portals.
 */
export const MOCK_PARTICIPANT_RECORDS: ParticipantRecord[] = [
    { id: 'P001', participantName: 'Alex Doe', programId: 'PROG-A', programName: 'Career Advancement Program', enrollmentDate: '2023-01-15', expirationDate: '2025-01-14', eligibilityScore: 85, nextReviewDate: '2024-12-15', servicesUsed: ['S001', 'S003'] },
    { id: 'P002', participantName: 'Brenda Smith', programId: 'PROG-B', programName: 'Wellness & Health Initiative', enrollmentDate: '2022-11-20', expirationDate: '2024-11-19', eligibilityScore: 92, nextReviewDate: '2024-10-20', servicesUsed: ['S002'] },
    { id: 'P003', participantName: 'Charlie Brown', programId: 'PROG-A', programName: 'Career Advancement Program', enrollmentDate: '2023-05-10', expirationDate: '2025-05-09', eligibilityScore: 78, nextReviewDate: '2024-11-10', servicesUsed: ['S005', 'S006'] },
    { id: 'P004', participantName: 'Diana Prince', programId: 'PROG-C', programName: 'Community Engagement Track', enrollmentDate: '2024-02-01', expirationDate: '2026-01-31', eligibilityScore: 95, nextReviewDate: '2025-01-15', servicesUsed: ['S008', 'S009'] },
];

/**
 * A sample list of initial service change requests for the Admin Portal.
 */
export const MOCK_INITIAL_REQUESTS: ChangeRequest[] = [
    { id: 'R01', participantName: 'Charlie Brown', serviceId: 'S006', serviceName: 'Home Ownership Seminar', requestType: 'cancel', details: 'No longer planning to buy a house this year.', status: 'pending' },
    { id: 'R02', participantName: 'Alex Doe', serviceId: 'S001', serviceName: 'Financial Wellness Workshop', requestType: 'change', details: 'Would like to move to the evening session instead of the morning one.', status: 'pending' },
    { id: 'R03', participantName: 'Brenda Smith', serviceId: 'S002', serviceName: 'Mental Health Counseling', requestType: 'cancel', details: 'Feeling much better now, thank you for the support!', status: 'approved' },
];
