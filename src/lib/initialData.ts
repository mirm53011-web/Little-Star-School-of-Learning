import {
  HeroSlide,
  SchoolInfo,
  AcademicLevel,
  AdmissionInfo,
  StudentResource,
  NoticeItem,
  SchoolEvent,
  GalleryItem
} from '../types';

export const DEFAULT_SCHOOL_INFO: SchoolInfo = {
  name: 'Little Star School of Learning',
  location: 'Batpora, Jammu & Kashmir, India',
  addressDetails: 'Batpora, District Srinagar / Pulwama Region, Jammu & Kashmir, India',
  principalName: 'Javid Bhat',
  phone: '+91 96975 67081',
  altPhone: '+91 96975 67081',
  email: 'littlestarschool.batpora@gmail.com',
  establishedYear: '2012',
  affiliation: 'State Board of School Education (JKBOSE) / Recognized',
  motto: 'Nurturing Intellect, Character & Excellence',
  aboutText: 'Little Star School of Learning, situated in the scenic and historic community of Batpora, Jammu & Kashmir, is dedicated to providing high-quality, inclusive, and transformative education. Under the esteemed leadership of Principal Javid Bhat, our school fosters academic rigor, ethical values, creative curiosity, and holistic personal growth for every student from early childhood through senior grades.',
  philosophy: 'We believe that every child is a unique spark of potential. Our pedagogical philosophy combines structured conceptual learning with progressive, student-centered experiential methods. We emphasize character building, scientific temperament, bilingual proficiency, and deep respect for cultural heritage and nature.',
  vision: 'To be a beacon of premier education in Jammu & Kashmir, empowering young minds with modern knowledge, strong moral compass, and leadership abilities to thrive in a dynamic global society.',
  mission: 'To provide a safe, inspiring, and technologically enriched learning environment; to maintain high standards of academic and co-curricular excellence; and to nurture responsible, compassionate, and visionary citizens.',
  principalMessage: 'Welcome to Little Star School of Learning. As Principal, it is my utmost privilege to guide a dynamic community of enthusiastic learners and dedicated educators in Batpora. Education at Little Star is not merely about syllabus completion—it is an inspiring journey of discovering intellectual talents, cultivating discipline, and building a foundation of integrity. We partner closely with parents and the wider community to ensure that every student is equipped with critical thinking, resilience, and compassion. I invite you to explore our campus, our academic programs, and join us in shaping a bright future for our children.',
  principalPhotoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  workingHours: 'Monday – Saturday: 8:30 AM – 3:30 PM (Sunday: Closed)',
  mapEmbedQuery: 'Batpora, Jammu and Kashmir, India'
};

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'ADMISSIONS OPEN 2026–2027',
    heading: 'Inspiring Minds, Shaping Tomorrow',
    description: 'Premier quality education from Kindergarten through Senior grades in Batpora, Jammu & Kashmir under the visionary leadership of Principal Javid Bhat.',
    ctaText: 'Apply For Admission',
    ctaUrl: '#admissions',
    bgImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80',
    enabled: true,
    order: 1
  },
  {
    id: 'slide-2',
    badge: 'ACADEMIC EXCELLENCE',
    heading: 'Holistic Development & Modern Learning',
    description: 'Empowering students with strong conceptual foundations, digital literacy, dynamic science laboratories, and vibrant sports programs.',
    ctaText: 'Explore Academics',
    ctaUrl: '#academics',
    bgImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80',
    enabled: true,
    order: 2
  },
  {
    id: 'slide-3',
    badge: 'STUDENT PORTAL & RESOURCES',
    heading: 'Class-Wise Syllabus, Date Sheets & Notes',
    description: 'Easily access and download official examination schedules, syllabi, holiday homework, and curriculum worksheets for all grades.',
    ctaText: 'Download Resources',
    ctaUrl: '#resources',
    bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80',
    enabled: true,
    order: 3
  }
];

export const DEFAULT_ACADEMIC_LEVELS: AcademicLevel[] = [
  {
    id: 'acad-1',
    title: 'Early Childhood Education',
    subtitle: 'Foundation & Play-Based Discovery',
    ageGroup: 'Ages 3 – 5 Years',
    grades: 'Pre-Nursery, Nursery, LKG, UKG',
    description: 'A joyful, sensory-rich environment fostering motor skills, phonics, basic arithmetic concepts, social bonding, and playful curiosity.',
    highlights: [
      'Play-way methodology & thematic classrooms',
      'Language development and phonetics',
      'Early mathematical cognition & tactile activities',
      'Safe, hygienic indoor & outdoor activity zones'
    ],
    iconName: 'Sparkles',
    order: 1,
    enabled: true
  },
  {
    id: 'acad-2',
    title: 'Primary Education',
    subtitle: 'Core Knowledge & Conceptual Mastery',
    ageGroup: 'Ages 6 – 10 Years',
    grades: 'Grade I to Grade V',
    description: 'Building strong literacy, numeracy, environmental awareness, and creative thinking through interactive pedagogy and supportive mentorship.',
    highlights: [
      'Comprehensive English, Urdu, Kashmiri & Hindi proficiency',
      'Mental math & hands-on science activities',
      'Art, music, physical fitness and moral education',
      'Continuous diagnostic assessment & personalized care'
    ],
    iconName: 'BookOpen',
    order: 2,
    enabled: true
  },
  {
    id: 'acad-3',
    title: 'Middle School',
    subtitle: 'Analytical Thinking & Applied Sciences',
    ageGroup: 'Ages 11 – 13 Years',
    grades: 'Grade VI to Grade VIII',
    description: 'Fostering deep analytical inquiry, scientific experiments, linguistic mastery, and structured problem-solving skills.',
    highlights: [
      'Specialized subject educators and science demonstrations',
      'Computer education & foundational coding concepts',
      'Social sciences, regional heritage, and environmental projects',
      'Debating, quiz clubs, and competitive sports'
    ],
    iconName: 'GraduationCap',
    order: 3,
    enabled: true
  },
  {
    id: 'acad-4',
    title: 'Secondary Education',
    subtitle: 'Board Exam Preparation & Rigorous Academics',
    ageGroup: 'Ages 14 – 15 Years',
    grades: 'Grade IX & Grade X',
    description: 'Intensive academic preparation aligned with official board curricula, structured mock examinations, and career guidance.',
    highlights: [
      'Targeted Board syllabus coverage & doubt resolution',
      'Advanced Mathematics, Physics, Chemistry & Biology laboratory work',
      'Regular test series, performance analytics & counseling',
      'Leadership training and co-curricular excellence'
    ],
    iconName: 'Award',
    order: 4,
    enabled: true
  },
  {
    id: 'acad-5',
    title: 'Senior Secondary Education',
    subtitle: 'Specialized Streams & Higher Education Readiness',
    ageGroup: 'Ages 16 – 18 Years',
    grades: 'Grade XI & Grade XII',
    description: 'Rigorous specialized coursework preparing ambitious scholars for competitive exams, university admissions, and future professional paths.',
    highlights: [
      'Science (Medical / Non-Medical), Commerce & Arts streams (as configured)',
      'Expert faculty mentoring & entrance exam readiness',
      'Structured practical examinations & comprehensive seminars',
      'Individual academic counseling and career orientation'
    ],
    iconName: 'Compass',
    order: 5,
    enabled: true
  }
];

export const DEFAULT_ADMISSIONS: AdmissionInfo = {
  academicSession: '2026–2027',
  status: 'Open',
  announcement: 'Registration & Admissions are now open for Pre-Nursery through Grade XII for the academic session 2026–2027 at Little Star School of Learning, Batpora.',
  eligibilityCriteria: [
    'Pre-Nursery / Nursery: Minimum age of 3+ years as on March 31st of the admission year.',
    'LKG & UKG: 4+ and 5+ years respectively with foundational assessment.',
    'Grade I to IX: Based on previous academic performance and interactive verification.',
    'Grade X to XII: Transfer certificate, marks transcript, and official board eligibility verification.'
  ],
  procedureSteps: [
    {
      step: 1,
      title: 'Enquiry & Application Form',
      description: 'Submit an online enquiry via this portal or collect the official admission booklet from the school office in Batpora.'
    },
    {
      step: 2,
      title: 'Interaction / Diagnostic Assessment',
      description: 'A friendly, non-stressful interactive session for kindergarten or a foundational concept review for higher grades.'
    },
    {
      step: 3,
      title: 'Document Verification',
      description: 'Verification of birth certificate, previous school records/TC, passport photos, and address proof.'
    },
    {
      step: 4,
      title: 'Admission Confirmation',
      description: 'Completion of formal admission paperwork, fee remittance, and issuance of student ID and booklist.'
    }
  ],
  requiredDocuments: [
    'Original & Photocopy of Municipal / Panchayat Birth Certificate',
    'Previous School Transfer Certificate (TC) counter-signed (for Grade II onwards)',
    'Academic Progress Report / Marks Card of the previous class',
    'Four recent passport-size photographs of the student',
    'Two passport-size photographs of each parent / guardian',
    'Aadhaar Card copy of student and parents',
    'Category / Special certificate (if applicable)'
  ],
  importantDates: [
    { event: 'Commencement of Admission Enquiries', date: 'Ongoing for Session 2026–2027' },
    { event: 'Kindergarten & Primary Registration', date: 'Open & Active' },
    { event: 'Document Verification & Office Hours', date: 'Mon – Sat: 9:00 AM – 2:30 PM' },
    { event: 'Orientation & Academic Session Start', date: 'As notified per official school calendar' }
  ],
  contactNote: 'For direct admission queries and fee structure details, please reach out to the school administrative desk or call +91 96975 67081.'
};

export const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: 'notice-1',
    title: 'Admissions Open for Academic Session 2026–2027',
    content: 'Little Star School of Learning, Batpora announces the commencement of admissions for the upcoming academic session 2026–2027 from Pre-Nursery to Grade XII. Parents seeking quality academic and holistic environment are invited to submit online enquiries or visit the school office.',
    category: 'Admission',
    publishDate: '2026-08-10',
    isPinned: true,
    isUrgent: true,
    enabled: true
  },
  {
    id: 'notice-2',
    title: 'Term-End Examination Schedule & Date Sheet Published',
    content: 'The official Date Sheet for the upcoming Term Examinations across all grades has been uploaded to the Student Resources section. Students and parents are advised to download their respective class timetables.',
    category: 'Exam',
    publishDate: '2026-08-08',
    isPinned: true,
    isUrgent: false,
    enabled: true
  },
  {
    id: 'notice-3',
    title: 'Parent-Teacher Interaction & Academic Review Meet',
    content: 'The monthly Parent-Teacher Conference (PTM) will be held this Saturday between 10:00 AM and 2:00 PM at the school campus in Batpora. Constructive discussion on student progress will take place.',
    category: 'Academic',
    publishDate: '2026-08-04',
    isPinned: false,
    isUrgent: false,
    enabled: true
  },
  {
    id: 'notice-4',
    title: 'Holiday Notice: Independence Day & Local Observance',
    content: 'The school shall remain closed on August 15th on account of Independence Day. Normal academic operations will resume on the next working day.',
    category: 'Holiday',
    publishDate: '2026-08-02',
    isPinned: false,
    isUrgent: false,
    enabled: true
  }
];

export const DEFAULT_RESOURCES: StudentResource[] = [
  {
    id: 'res-1',
    title: 'Class 10 Annual Examination Date Sheet 2026–27',
    description: 'Comprehensive official exam date sheet with subject timings, practicals schedule, and room allocation guidelines.',
    classGrade: 'Class 10',
    category: 'Date Sheets',
    academicSession: '2026–2027',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Class_10_Exam_DateSheet_2026_27.pdf',
    fileType: 'PDF',
    fileSize: '420 KB',
    publishDate: '2026-08-12',
    downloadCount: 142,
    enabled: true
  },
  {
    id: 'res-2',
    title: 'Class 8 Complete Academic Syllabus & Curriculum Blueprint',
    description: 'Detailed chapter-wise syllabus, textbook references, and marking schemes across English, Mathematics, Science, and Social Studies.',
    classGrade: 'Class 8',
    category: 'Syllabus',
    academicSession: '2026–2027',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Class_8_Annual_Syllabus.pdf',
    fileType: 'PDF',
    fileSize: '680 KB',
    publishDate: '2026-08-10',
    downloadCount: 98,
    enabled: true
  },
  {
    id: 'res-3',
    title: 'Class 5 Mathematics & Science Practice Assignments',
    description: 'Conceptual problem sets, word problems, and scientific activity sheets for home preparation.',
    classGrade: 'Class 5',
    category: 'Assignments',
    academicSession: '2026–2027',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Class_5_Maths_Science_Assignments.pdf',
    fileType: 'PDF',
    fileSize: '510 KB',
    publishDate: '2026-08-08',
    downloadCount: 76,
    enabled: true
  },
  {
    id: 'res-4',
    title: 'Class UKG English Phonics & Rhymes Study Material',
    description: 'Foundational reading comprehension, vocabulary puzzles, alphabet tracing, and interactive activity sheets.',
    classGrade: 'Class UKG',
    category: 'Study Material',
    academicSession: '2026–2027',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Class_UKG_Phonics_Workbook.pdf',
    fileType: 'PDF',
    fileSize: '340 KB',
    publishDate: '2026-08-06',
    downloadCount: 115,
    enabled: true
  },
  {
    id: 'res-5',
    title: 'Class 12 Mid-Term Exam Schedule & Roll Number Slip Guidelines',
    description: 'Senior secondary exam schedule, reporting time instructions, and examination center guidelines.',
    classGrade: 'Class 12',
    category: 'Exam Schedules',
    academicSession: '2026–2027',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Class_12_MidTerm_Exam_Schedule.pdf',
    fileType: 'PDF',
    fileSize: '290 KB',
    publishDate: '2026-08-04',
    downloadCount: 180,
    enabled: true
  },
  {
    id: 'res-6',
    title: 'Class Nursery Fun Activity Sheets & Coloring Workbook',
    description: 'Early learning cognitive motor skill exercises, shapes identification, and sensory discovery worksheets.',
    classGrade: 'Class Nursery',
    category: 'Study Material',
    academicSession: '2026–2027',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Class_Nursery_Activity_Sheets.pdf',
    fileType: 'PDF',
    fileSize: '460 KB',
    publishDate: '2026-08-02',
    downloadCount: 64,
    enabled: true
  },
  {
    id: 'res-7',
    title: 'Class 9 Physics & Chemistry Laboratory Manual & Notes',
    description: 'Prescribed practical experiments, safety instructions, and step-by-step observation tables.',
    classGrade: 'Class 9',
    category: 'Study Material',
    academicSession: '2026–2027',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Class_9_Science_Lab_Manual.pdf',
    fileType: 'PDF',
    fileSize: '820 KB',
    publishDate: '2026-07-28',
    downloadCount: 110,
    enabled: true
  },
  {
    id: 'res-8',
    title: 'All Classes Official Student Code of Conduct & Academic Almanac',
    description: 'School rules, attendance policies, uniform specifications, and annual academic calendar issued by Principal.',
    classGrade: 'All Classes',
    category: 'Other Important Documents',
    academicSession: '2026–2027',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'LittleStar_Student_Almanac_2026_27.pdf',
    fileType: 'PDF',
    fileSize: '540 KB',
    publishDate: '2026-07-20',
    downloadCount: 230,
    enabled: true
  }
];

export const DEFAULT_EVENTS: SchoolEvent[] = [
  {
    id: 'event-1',
    title: 'Annual Science & Innovation Fair',
    description: 'Student exhibits featuring working models, robotics, environmental solutions, and interactive physics demonstrations.',
    eventDate: '2026-09-15',
    eventTime: '9:30 AM – 3:00 PM',
    location: 'Main School Auditorium & Quadrangle, Batpora',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    isUpcoming: true,
    order: 1
  },
  {
    id: 'event-2',
    title: 'Inter-House Sports & Athletic Meet',
    description: 'Track and field events, football, badminton, and cricket tournaments celebrating sportsmanship and teamwork.',
    eventDate: '2026-10-05',
    eventTime: '8:30 AM – 4:00 PM',
    location: 'School Sports Ground, Batpora',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    isUpcoming: true,
    order: 2
  },
  {
    id: 'event-3',
    title: 'Annual Cultural Day & Prize Distribution',
    description: 'Mesmerizing performances of traditional music, drama, folk dances, and felicitation of academic toppers.',
    eventDate: '2026-11-20',
    eventTime: '10:00 AM – 2:30 PM',
    location: 'Little Star Campus, Batpora',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    isUpcoming: true,
    order: 3
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Interactive Classroom Learning',
    category: 'Classroom',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    caption: 'Engaged students exploring science concepts in dynamic group sessions.',
    date: '2026-07-15',
    enabled: true
  },
  {
    id: 'gal-2',
    title: 'Scenic School Campus at Batpora',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    caption: 'Our modern, green, and secure school infrastructure in Batpora, J&K.',
    date: '2026-06-20',
    enabled: true
  },
  {
    id: 'gal-3',
    title: 'Annual Sports Day Celebrations',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
    caption: 'High-energy track competitions and teamwork display.',
    date: '2026-05-18',
    enabled: true
  },
  {
    id: 'gal-4',
    title: 'Science & Robotics Exhibition',
    category: 'School Events',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    caption: 'Young innovators showcasing scientific working models and charts.',
    date: '2026-04-10',
    enabled: true
  },
  {
    id: 'gal-5',
    title: 'Cultural Heritage & Art Fest',
    category: 'Cultural Activities',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    caption: 'Traditional performances and colorful student art gallery.',
    date: '2026-03-25',
    enabled: true
  },
  {
    id: 'gal-6',
    title: 'Kindergarten Play & Discovery',
    category: 'Classroom',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    caption: 'Playful foundational learning and phonics activities for early childhood.',
    date: '2026-02-14',
    enabled: true
  }
];
