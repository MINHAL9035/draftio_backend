import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        const extension = originalName.substring(originalName.lastIndexOf('.'));
        const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
        const uniqueName = `${baseName}-${Date.now()}${extension}`;

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
};

const fileSizeLimit = 5 * 1024 * 1024;

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: fileSizeLimit,
        fieldSize: 50 * 1024 * 1024
    }
});

export default upload;