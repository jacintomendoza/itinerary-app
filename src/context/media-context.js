import React, { createContext, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from 'firebase/storage';
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
                        reject(error); // Reject the promise on error
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
                reject(error); // Reject the promise if an error occurs
            }
        });
    };


    return (
        <MediaContext.Provider value={{ uploadMedia, uploadProgress, uploadError }}>
            {children}
        </MediaContext.Provider>
    );
};

export const MediaProvider = Provider;
export { MediaContext, Provider };