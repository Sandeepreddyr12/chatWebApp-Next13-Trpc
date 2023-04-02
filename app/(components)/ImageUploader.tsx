// 'use client';

// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import React, { useState, useRef } from 'react';
// import storage from '../firebaseConfig';

// function ImageUploader() {
//   const [imageFile, setImageFile] = useState<File>();
//   const [downloadURL, setDownloadURL] = useState('');
//   const filePickerRef = useRef();

//   const handleSelectedFile = (files: any) => {
//     if (files && files[0].size < 10000000) {
//       setImageFile(files[0]);

//       console.log(files[0]);
//     } else {
//       console.log('File size to large');
//     }
//   };

//   const handleUploadFile = () => {
//     if (imageFile) {
//       const { name } = imageFile;
//       const storageRef = ref(storage, `image/${name}`);
//       uploadBytesResumable(storageRef, imageFile).then((snapshot) => {
//         getDownloadURL(snapshot.ref).then((url) => {
//           setDownloadURL(url);
//         });
//       });
//     } else {
//       console.log('File not found');
//     }
//   };

//   // const handleRemoveFile = () => setImageFile(undefined);

//   const pickImageHandler = () => {
//     filePickerRef.current.click();
//   };

//   return (
//     <div className="Imageinput">
//       <div>
//         <input
//           type="file"
//           ref={filePickerRef}
//           placeholder="Select file to upload"
//           // style={{ display: 'none' }}
//           accept=".jpg,.png,.jpeg"
//           onChange={(files) => handleSelectedFile(files.target.files)}
//         />
//         <button
//           type="button"
//           onClick={pickImageHandler}
//           style={{ marginBottom: '1rem' }}
//           className="button"
//         >
//           📎
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ImageUploader;
