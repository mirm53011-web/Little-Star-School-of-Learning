import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  increment
} from 'firebase/firestore';
import { db, auth } from './firebase';
import {
  HeroSlide,
  SchoolInfo,
  AcademicLevel,
  AdmissionInfo,
  StudentResource,
  NoticeItem,
  SchoolEvent,
  GalleryItem,
  EnquirySubmission
} from '../types';
import {
  DEFAULT_SCHOOL_INFO,
  DEFAULT_HERO_SLIDES,
  DEFAULT_ACADEMIC_LEVELS,
  DEFAULT_ADMISSIONS,
  DEFAULT_NOTICES,
  DEFAULT_RESOURCES,
  DEFAULT_EVENTS,
  DEFAULT_GALLERY
} from './initialData';

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

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
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
  console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
  return errInfo;
}

// Helper to seed initial data if Firestore is fresh
export async function seedInitialSchoolData(): Promise<void> {
  try {
    // 1. School Info
    const schoolInfoDocRef = doc(db, 'school_info', 'main');
    const schoolInfoSnap = await getDoc(schoolInfoDocRef);
    if (!schoolInfoSnap.exists()) {
      await setDoc(schoolInfoDocRef, DEFAULT_SCHOOL_INFO);
    }

    // 2. Admissions Info
    const admissionsDocRef = doc(db, 'admissions', 'main');
    const admissionsSnap = await getDoc(admissionsDocRef);
    if (!admissionsSnap.exists()) {
      await setDoc(admissionsDocRef, DEFAULT_ADMISSIONS);
    }

    // 3. Hero Slides
    const heroSlidesSnap = await getDocs(collection(db, 'hero_slides'));
    if (heroSlidesSnap.empty) {
      for (const slide of DEFAULT_HERO_SLIDES) {
        await setDoc(doc(db, 'hero_slides', slide.id), {
          ...slide,
          createdAt: new Date().toISOString()
        });
      }
    }

    // 4. Academic Levels
    const academicsSnap = await getDocs(collection(db, 'academics'));
    if (academicsSnap.empty) {
      for (const level of DEFAULT_ACADEMIC_LEVELS) {
        await setDoc(doc(db, 'academics', level.id), level);
      }
    }

    // 5. Notices
    const noticesSnap = await getDocs(collection(db, 'notices'));
    if (noticesSnap.empty) {
      for (const notice of DEFAULT_NOTICES) {
        await setDoc(doc(db, 'notices', notice.id), {
          ...notice,
          createdAt: new Date().toISOString()
        });
      }
    }

    // 6. Resources
    const resourcesSnap = await getDocs(collection(db, 'resources'));
    if (resourcesSnap.empty) {
      for (const res of DEFAULT_RESOURCES) {
        await setDoc(doc(db, 'resources', res.id), {
          ...res,
          createdAt: new Date().toISOString()
        });
      }
    }

    // 7. Events
    const eventsSnap = await getDocs(collection(db, 'events'));
    if (eventsSnap.empty) {
      for (const ev of DEFAULT_EVENTS) {
        await setDoc(doc(db, 'events', ev.id), {
          ...ev,
          createdAt: new Date().toISOString()
        });
      }
    }

    // 8. Gallery
    const gallerySnap = await getDocs(collection(db, 'gallery'));
    if (gallerySnap.empty) {
      for (const item of DEFAULT_GALLERY) {
        await setDoc(doc(db, 'gallery', item.id), {
          ...item,
          createdAt: new Date().toISOString()
        });
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'initial_seed');
  }
}

// Force Sync all Batpora default school data directly to Firestore
export async function forceSyncAllSchoolDataToFirestore(): Promise<{
  success: boolean;
  syncedCount: number;
  message: string;
}> {
  try {
    let count = 0;

    // 1. School Profile
    await setDoc(doc(db, 'school_info', 'main'), DEFAULT_SCHOOL_INFO, { merge: true });
    count++;

    // 2. Admissions
    await setDoc(doc(db, 'admissions', 'main'), DEFAULT_ADMISSIONS, { merge: true });
    count++;

    // 3. Hero Slides
    for (const slide of DEFAULT_HERO_SLIDES) {
      await setDoc(doc(db, 'hero_slides', slide.id), {
        ...slide,
        createdAt: new Date().toISOString()
      }, { merge: true });
      count++;
    }

    // 4. Academic Levels
    for (const level of DEFAULT_ACADEMIC_LEVELS) {
      await setDoc(doc(db, 'academics', level.id), level, { merge: true });
      count++;
    }

    // 5. Notices
    for (const notice of DEFAULT_NOTICES) {
      await setDoc(doc(db, 'notices', notice.id), {
        ...notice,
        createdAt: new Date().toISOString()
      }, { merge: true });
      count++;
    }

    // 6. Resources
    for (const res of DEFAULT_RESOURCES) {
      await setDoc(doc(db, 'resources', res.id), {
        ...res,
        createdAt: new Date().toISOString()
      }, { merge: true });
      count++;
    }

    // 7. Events
    for (const ev of DEFAULT_EVENTS) {
      await setDoc(doc(db, 'events', ev.id), {
        ...ev,
        createdAt: new Date().toISOString()
      }, { merge: true });
      count++;
    }

    // 8. Gallery
    for (const item of DEFAULT_GALLERY) {
      await setDoc(doc(db, 'gallery', item.id), {
        ...item,
        createdAt: new Date().toISOString()
      }, { merge: true });
      count++;
    }

    return {
      success: true,
      syncedCount: count,
      message: `Successfully synchronized ${count} school documents directly to Firestore database in real-time.`
    };
  } catch (error: any) {
    handleFirestoreError(error, OperationType.WRITE, 'force_sync');
    return {
      success: false,
      syncedCount: 0,
      message: error?.message || 'Failed to sync documents to Firestore.'
    };
  }
}

// Last sync timestamp tracking for UI diagnostics
let lastSyncTimestamp: Date = new Date();
const syncListeners: ((timestamp: Date) => void)[] = [];

export function recordSyncActivity(): void {
  lastSyncTimestamp = new Date();
  syncListeners.forEach(listener => listener(lastSyncTimestamp));
}

export function subscribeSyncActivity(callback: (timestamp: Date) => void): () => void {
  callback(lastSyncTimestamp);
  syncListeners.push(callback);
  return () => {
    const idx = syncListeners.indexOf(callback);
    if (idx !== -1) syncListeners.splice(idx, 1);
  };
}

// Check Firestore Connectivity with real live ping
export async function checkFirestoreConnection(): Promise<{
  connected: boolean;
  projectId: string;
  authDomain: string;
  latencyMs?: number;
  lastChecked: string;
  error?: string;
}> {
  const startTime = Date.now();
  try {
    const testDoc = await getDoc(doc(db, 'school_info', 'main'));
    const latency = Date.now() - startTime;
    recordSyncActivity();
    return {
      connected: true,
      projectId: (db as any).app?.options?.projectId || 'little-star-school-of-learning',
      authDomain: (db as any).app?.options?.authDomain || 'little-star-school-of-learning.firebaseapp.com',
      latencyMs: latency,
      lastChecked: new Date().toLocaleTimeString()
    };
  } catch (err: any) {
    return {
      connected: false,
      projectId: (db as any).app?.options?.projectId || 'little-star-school-of-learning',
      authDomain: (db as any).app?.options?.authDomain || '',
      lastChecked: new Date().toLocaleTimeString(),
      error: err?.message || 'Connection timeout / network error'
    };
  }
}

// ----------------------------------------------------
// Realtime Subscriptions
// ----------------------------------------------------

export function subscribeSchoolInfo(callback: (info: SchoolInfo) => void) {
  const docRef = doc(db, 'school_info', 'main');
  return onSnapshot(docRef, (snapshot) => {
    recordSyncActivity();
    if (snapshot.exists()) {
      callback(snapshot.data() as SchoolInfo);
    } else {
      callback(DEFAULT_SCHOOL_INFO);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, 'school_info/main');
    callback(DEFAULT_SCHOOL_INFO);
  });
}

export function subscribeAdmissions(callback: (info: AdmissionInfo) => void) {
  const docRef = doc(db, 'admissions', 'main');
  return onSnapshot(docRef, (snapshot) => {
    recordSyncActivity();
    if (snapshot.exists()) {
      callback(snapshot.data() as AdmissionInfo);
    } else {
      callback(DEFAULT_ADMISSIONS);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, 'admissions/main');
    callback(DEFAULT_ADMISSIONS);
  });
}

export function subscribeHeroSlides(callback: (slides: HeroSlide[]) => void) {
  const colRef = collection(db, 'hero_slides');
  return onSnapshot(colRef, (snapshot) => {
    recordSyncActivity();
    if (!snapshot.empty) {
      const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as HeroSlide));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      callback(items);
    } else {
      callback(DEFAULT_HERO_SLIDES);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'hero_slides');
    callback(DEFAULT_HERO_SLIDES);
  });
}

export function subscribeAcademics(callback: (levels: AcademicLevel[]) => void) {
  const colRef = collection(db, 'academics');
  return onSnapshot(colRef, (snapshot) => {
    recordSyncActivity();
    if (!snapshot.empty) {
      const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as AcademicLevel));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      callback(items);
    } else {
      callback(DEFAULT_ACADEMIC_LEVELS);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'academics');
    callback(DEFAULT_ACADEMIC_LEVELS);
  });
}

export function subscribeNotices(callback: (notices: NoticeItem[]) => void) {
  const colRef = collection(db, 'notices');
  return onSnapshot(colRef, (snapshot) => {
    recordSyncActivity();
    if (!snapshot.empty) {
      const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as NoticeItem));
      // Sort pinned first, then newest publishDate
      items.sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        return new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime();
      });
      callback(items);
    } else {
      callback(DEFAULT_NOTICES);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'notices');
    callback(DEFAULT_NOTICES);
  });
}

export function subscribeResources(callback: (resources: StudentResource[]) => void) {
  const colRef = collection(db, 'resources');
  return onSnapshot(colRef, (snapshot) => {
    recordSyncActivity();
    if (!snapshot.empty) {
      const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as StudentResource));
      items.sort((a, b) => new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime());
      callback(items);
    } else {
      callback(DEFAULT_RESOURCES);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'resources');
    callback(DEFAULT_RESOURCES);
  });
}

export function subscribeEvents(callback: (events: SchoolEvent[]) => void) {
  const colRef = collection(db, 'events');
  return onSnapshot(colRef, (snapshot) => {
    recordSyncActivity();
    if (!snapshot.empty) {
      const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as SchoolEvent));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      callback(items);
    } else {
      callback(DEFAULT_EVENTS);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'events');
    callback(DEFAULT_EVENTS);
  });
}

export function subscribeGallery(callback: (items: GalleryItem[]) => void) {
  const colRef = collection(db, 'gallery');
  return onSnapshot(colRef, (snapshot) => {
    recordSyncActivity();
    if (!snapshot.empty) {
      const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GalleryItem));
      items.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
      callback(items);
    } else {
      callback(DEFAULT_GALLERY);
    }
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'gallery');
    callback(DEFAULT_GALLERY);
  });
}

export function subscribeEnquiries(callback: (items: EnquirySubmission[]) => void) {
  // Check if authenticated user is present
  if (!auth.currentUser) {
    callback([]);
    return () => {};
  }

  const colRef = collection(db, 'enquiries');
  return onSnapshot(colRef, (snapshot) => {
    recordSyncActivity();
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as EnquirySubmission));
    items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    callback(items);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'enquiries');
    callback([]);
  });
}

// ----------------------------------------------------
// Mutation / Admin Operations
// ----------------------------------------------------

export async function updateSchoolInfo(info: Partial<SchoolInfo>): Promise<void> {
  try {
    const docRef = doc(db, 'school_info', 'main');
    await setDoc(docRef, info, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'school_info/main');
    throw error;
  }
}

export async function updateAdmissionsInfo(info: Partial<AdmissionInfo>): Promise<void> {
  try {
    const docRef = doc(db, 'admissions', 'main');
    await setDoc(docRef, info, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'admissions/main');
    throw error;
  }
}

// Hero Slides CRUD
export async function saveHeroSlide(slide: Omit<HeroSlide, 'id'> & { id?: string }): Promise<string> {
  try {
    if (slide.id) {
      const docRef = doc(db, 'hero_slides', slide.id);
      await setDoc(docRef, slide, { merge: true });
      return slide.id;
    } else {
      const docRef = await addDoc(collection(db, 'hero_slides'), {
        ...slide,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'hero_slides');
    throw error;
  }
}

export async function deleteHeroSlide(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'hero_slides', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `hero_slides/${id}`);
    throw error;
  }
}

// Notice CRUD
export async function saveNotice(notice: Omit<NoticeItem, 'id'> & { id?: string }): Promise<string> {
  try {
    if (notice.id) {
      const docRef = doc(db, 'notices', notice.id);
      await setDoc(docRef, notice, { merge: true });
      return notice.id;
    } else {
      const docRef = await addDoc(collection(db, 'notices'), {
        ...notice,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'notices');
    throw error;
  }
}

export async function deleteNotice(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'notices', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `notices/${id}`);
    throw error;
  }
}

// Student Resources CRUD
export async function saveResource(res: Omit<StudentResource, 'id'> & { id?: string }): Promise<string> {
  try {
    if (res.id) {
      const docRef = doc(db, 'resources', res.id);
      await setDoc(docRef, res, { merge: true });
      return res.id;
    } else {
      const docRef = await addDoc(collection(db, 'resources'), {
        ...res,
        downloadCount: 0,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'resources');
    throw error;
  }
}

export async function deleteResource(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'resources', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `resources/${id}`);
    throw error;
  }
}

export async function incrementResourceDownload(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'resources', id);
    await updateDoc(docRef, {
      downloadCount: increment(1)
    });
  } catch (err) {
    // Non-critical metric increment
    console.warn('Could not update download metric');
  }
}

// Events CRUD
export async function saveEvent(event: Omit<SchoolEvent, 'id'> & { id?: string }): Promise<string> {
  try {
    if (event.id) {
      const docRef = doc(db, 'events', event.id);
      await setDoc(docRef, event, { merge: true });
      return event.id;
    } else {
      const docRef = await addDoc(collection(db, 'events'), {
        ...event,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'events');
    throw error;
  }
}

export async function deleteEvent(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'events', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `events/${id}`);
    throw error;
  }
}

// Gallery CRUD
export async function saveGalleryItem(item: Omit<GalleryItem, 'id'> & { id?: string }): Promise<string> {
  try {
    if (item.id) {
      const docRef = doc(db, 'gallery', item.id);
      await setDoc(docRef, item, { merge: true });
      return item.id;
    } else {
      const docRef = await addDoc(collection(db, 'gallery'), {
        ...item,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'gallery');
    throw error;
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
    throw error;
  }
}

// Academic Levels CRUD
export async function saveAcademicLevel(level: Omit<AcademicLevel, 'id'> & { id?: string }): Promise<string> {
  try {
    if (level.id) {
      const docRef = doc(db, 'academics', level.id);
      await setDoc(docRef, level, { merge: true });
      return level.id;
    } else {
      const docRef = await addDoc(collection(db, 'academics'), level);
      return docRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'academics');
    throw error;
  }
}

export async function deleteAcademicLevel(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'academics', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `academics/${id}`);
    throw error;
  }
}

// Enquiry Submissions
export async function submitEnquiry(enquiry: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...enquiry,
      createdAt: new Date().toISOString(),
      status: 'New'
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'enquiries');
    throw error;
  }
}

export async function updateEnquiryStatus(id: string, status: EnquirySubmission['status'], staffNotes?: string): Promise<void> {
  try {
    const docRef = doc(db, 'enquiries', id);
    const data: Record<string, any> = { status };
    if (staffNotes !== undefined) data.staffNotes = staffNotes;
    await updateDoc(docRef, data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `enquiries/${id}`);
    throw error;
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'enquiries', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `enquiries/${id}`);
    throw error;
  }
}

