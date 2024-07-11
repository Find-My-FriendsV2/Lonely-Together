// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import client from './aws';
// import { v4 as uuidv4 } from 'uuid';

// const upload = multer({
//   storage: multerS3({
//     s3: client,
//     bucket: process.env.S3_BUCKET_NAME || '',
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       cb(null, `${uuidv4()}-${file.originalname}`);
//     },
//   }),
// });

// export default upload;
