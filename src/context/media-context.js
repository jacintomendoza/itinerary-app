import React, { createContext, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import storage from '../firebase/firebase';

const MediaContext = createContext();

function Provider({ children }) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);

    const uploadMedia = async (media) => {
        return new Promise((resolve, reject) => {
            try {
                const storageRef = ref(storage);
                const mediasRef = ref(storageRef, `medias/${media.name}`);
                const uploadTask = uploadBytesResumable(mediasRef, media);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const newProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(newProgress);
                    },
                    (error) => {
                        setUploadError(error);
                        reject(error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log('File available at', downloadURL);
                            const fileInfo = { downloadURL, filename: media.name };
                            resolve(fileInfo);
                        } catch (error) {
                            setUploadError(error);
                            reject(error);
                        }
                    }
                );
            } catch (error) {
                setUploadError(error);
                reject(error);
            }
        });
    };

    const deleteMedia = async (fileUrl) => {
        try {
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);
            console.log('File deleted successfully');
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <MediaContext.Provider value={{ uploadMedia, deleteMedia, uploadProgress, uploadError }}>
            {children}
        </MediaContext.Provider>
    );
};

export const MediaProvider = Provider;
export { MediaContext, Provider };