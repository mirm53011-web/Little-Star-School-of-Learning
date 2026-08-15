import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadProgressCallback {
  (progress: number): void;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 KB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getFileTypeFromName(filename: string): string {
  const ext = filename.split('.').pop()?.toUpperCase() || 'FILE';
  return ext;
}

export async function uploadFileToStorage(
  file: File,
  folderPath: string,
  onProgress?: UploadProgressCallback
): Promise<{ downloadUrl: string; fileName: string; fileSize: string; fileType: string }> {
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const timestamp = Date.now();
  const fullPath = `${folderPath}/${timestamp}_${cleanName}`;
  const storageRef = ref(storage, fullPath);

  try {
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        async (error) => {
          console.warn('Firebase Storage upload failed, fallback to base64 data URL for resilience:', error);
          // Fallback to Base64 Data URL if Firebase Storage bucket is restricted or uninitialized
          try {
            const base64Url = await fileToBase64(file);
            resolve({
              downloadUrl: base64Url,
              fileName: file.name,
              fileSize: formatBytes(file.size),
              fileType: getFileTypeFromName(file.name)
            });
          } catch (e) {
            reject(error);
          }
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            fileName: file.name,
            fileSize: formatBytes(file.size),
            fileType: getFileTypeFromName(file.name)
          });
        }
      );
    });
  } catch (err) {
    // Immediate fallback
    const base64Url = await fileToBase64(file);
    return {
      downloadUrl: base64Url,
      fileName: file.name,
      fileSize: formatBytes(file.size),
      fileType: getFileTypeFromName(file.name)
    };
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
