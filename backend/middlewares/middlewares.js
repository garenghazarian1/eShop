import multer from 'multer';

export const upload = multer({ dest: '/uploads' });

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/'); 
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now());
//   }
// });

// const upload = multer({ storage: storage });

// export default upload;
export default upload;