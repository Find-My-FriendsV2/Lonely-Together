// uploadFiles.ts

// export async function uploadFiles(identifier: string, { files }: { files: File[] }) {
//     try {
//       const formData = new FormData();
//       files.forEach((file, index) => {
//         formData.append(`file${index}`, file);
//       });
  
//       const response = await fetch(`/api/upload/${identifier}`, {
//         method: 'POST',
//         body: formData,
//       });
  
//       const data = await response.json();
//       return data; // Adjust as per your response structure
//     } catch (error) {
//       throw new Error(`Upload failed: ${error.message}`);
//     }
//   }
  