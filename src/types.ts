export type ResourceCategory =
  | 'Date Sheets'
  | 'Syllabus'
  | 'Exam Schedules'
  | 'Assignments'
  | 'Study Material'
  | 'Notices & Circulars'
  | 'Other Important Documents';

export type ClassGrade =
  | 'All Classes'
  | 'Class Nursery'
  | 'Class LKG'
  | 'Class UKG'
  | 'Class 1'
  | 'Class 2'
  | 'Class 3'
  | 'Class 4'
  | 'Class 5'
  | 'Class 6'
  | 'Class 7'
  | 'Class 8'
  | 'Class 9'
  | 'Class 10'
  | 'Class 11'
  | 'Class 12'
  | 'Pre-Nursery'
  | 'Nursery'
  | 'LKG'
  | 'UKG'
  | 'Grade I'
  | 'Grade II'
  | 'Grade III'
  | 'Grade IV'
  | 'Grade V'
  | 'Grade VI'
  | 'Grade VII'
  | 'Grade VIII'
  | 'Grade IX'
  | 'Grade X'
  | 'Grade XI'
  | 'Grade XII';

export const ALL_CLASSES: string[] = [
  'All Classes',
  'Class Nursery',
  'Class LKG',
  'Class UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12'
];

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'Date Sheets',
  'Syllabus',
  'Exam Schedules',
  'Assignments',
  'Study Material',
  'Notices & Circulars',
  'Other Important Documents'
];

export const GALLERY_CATEGORIES = [
  'Campus',
  'Classroom',
  'Sports',
  'Cultural Activities',
  'School Events',
  'Annual Functions',
  'Other'
] as const;

export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  bgImage: string;
  enabled: boolean;
  order: number;
  createdAt?: string;
}

export interface SchoolInfo {
  name: string;
  location: string;
  addressDetails: string;
  principalName: string;
  phone: string;
  altPhone?: string;
  email: string;
  establishedYear: string;
  affiliation: string;
  motto: string;
  aboutText: string;
  philosophy: string;
  vision: string;
  mission: string;
  principalMessage: string;
  principalPhotoUrl?: string;
  workingHours: string;
  mapEmbedQuery: string;
}

export interface AcademicLevel {
  id: string;
  title: string;
  subtitle: string;
  ageGroup: string;
  grades: string;
  description: string;
  highlights: string[];
  iconName: string;
  order: number;
  enabled: boolean;
}

export interface AdmissionInfo {
  academicSession: string;
  status: 'Open' | 'Closing Soon' | 'Closed';
  announcement: string;
  eligibilityCriteria: string[];
  procedureSteps: { step: number; title: string; description: string }[];
  requiredDocuments: string[];
  importantDates: { event: string; date: string }[];
  contactNote: string;
}

export interface StudentResource {
  id: string;
  title: string;
  description?: string;
  classGrade: ClassGrade;
  category: ResourceCategory;
  academicSession: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  publishDate: string;
  downloadCount: number;
  enabled: boolean;
  createdAt?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  category: 'General' | 'Exam' | 'Holiday' | 'Admission' | 'Academic' | 'Urgent';
  publishDate: string;
  isPinned: boolean;
  isUrgent: boolean;
  attachmentUrl?: string;
  attachmentName?: string;
  enabled: boolean;
  createdAt?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  location: string;
  imageUrl?: string;
  registrationUrl?: string;
  isUpcoming: boolean;
  order?: number;
  enabled?: boolean;
  createdAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'School Events' | 'Annual Functions' | 'Sports' | 'Cultural Activities' | 'Classroom' | 'Campus' | 'Other';
  imageUrl: string;
  caption?: string;
  date: string;
  enabled: boolean;
  createdAt?: string;
}

export interface EnquirySubmission {
  id: string;
  parentName: string;
  studentName: string;
  classGrade: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'In Review' | 'Resolved';
  staffNotes?: string;
}
