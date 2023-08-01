const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");
const multer = require('multer');
const nodemailer = require('nodemailer');
const upload = multer();
const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lemoteurlemoteur13@gmail.com',
    pass: 'faeyyltdrdnaabuq',
  },
});

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signIn", controller.signIn);

  app.post(
    "/api/auth/createModirator",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.CreateManager
  );


  
app.post('/send-email', upload.single('pdf'), (req, res) => {
  const emailData = {
    from: 'lemoteurlemoteur13@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message,
    attachments: [
      {
        filename: 'form_data.pdf',
        content: req.file.buffer,
      },
    ],
  };

  smtpTransport.sendMail(emailData, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent successfully!', info);
      res.json({ message: 'Email sent successfully!' });
    }
  });
});


};




