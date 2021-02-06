
const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student");

router.post("/api/students/signup", studentController.signup);
router.post("/api/students/login", studentController.login);

router.route("/api/Students").get(studentController.getAllStudents)
    .post(studentController.StudentAddOne);




router.route("api/Students/:studentId").get(studentController.StudenGetOne)
    .put(studentController.StudentUpdateOne)
    .delete(studentController.StudentDeleteOne);

var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})

router.post('url', upload.single('file'), (req, res) => {
    // the file is uploaded when this route is called with formdata.
    // now you can store the file name in the db if you want for further reference.
    const filename = req.file.filename;
    const path = req.file.path;
    // Call your database method here with filename and path
    res.json({ 'message': 'File uploaded' });
});

module.exports = router;
