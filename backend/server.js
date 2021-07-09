const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4202');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors());

app.use(bodyParser.json());
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.post('/sendFormData', (req, res) => {
  console.log(req.body.userdata.firstname);
  console.log(req.body.timesheet.matricule);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
      user: 'noriba.projects@gmail.com', // must be Gmail
      pass: 'TetsuoShima'
    }
  });

  var mailOptions = {
    from: 'noriba.projects@gmail.com',
    to: 'noriba.projects@gmail.com', // must be Gmail
    cc:`${req.body.userdata['firstname']}<${req.body.userdata['email']}>`,
    subject: 'Sending Email using Node.js',
    html: `
            <table style="width: 100%; border: none">
              <thead>
                <tr style="background-color: #000; color: #fff;">
                  <th style="padding: 10px 0">Name</th>
                  <th style="padding: 10px 0">E-mail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style="text-align: center">${req.body.userdata['firstname']}</th>
                  <td style="text-align: center">${req.body.userdata['email']}</td>
                </tr>
              </tbody>
            </table>
          `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email envoyée: ' + info.response);
      res.status(200).json({
        message: 'Envoyé avec succés!'
      })
    }
  });

});

app.listen(3000, () => {
  console.log("server run!!!");
});
