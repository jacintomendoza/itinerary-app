import { useState } from 'react';
import storage from './firebase/firebase'; // Ensure this path is correct
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Image() {
    const [image, setImage] = useState('');

    const upload = async () => {
        // Check if image is selected
        if (image) {
            try {
                // Create a storage reference
                const storageRef = ref(storage);

                // Create a reference to the file you want to upload
                const imagesRef = ref(storageRef, `images/${image.name}`);

                // Upload the file to Firebase Storage
                const uploadTask = uploadBytesResumable(imagesRef, image);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.error(error);
                    },
                    async () => {
                        // Handle successful uploads on complete
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);
                        // You can save the download URL to your database or use it as needed
                    }
                );
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            alert('Please select an image to upload.');
        }
    };

    return (
        <div className="App">
            <center>
                <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                <button onClick={upload}>Upload</button>
            </center>
        </div>
    );
}

export default Image;