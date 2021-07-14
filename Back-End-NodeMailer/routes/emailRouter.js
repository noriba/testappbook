var express=require('express');
var bodyParser = require('body-parser')// importing body parser middleware to parse form content from HTML
var cors = require('../cors');
const emailRouter = express.Router();
var nodemailer = require('nodemailer');//importing node mailer
var handlebars = require('handlebars');//importing node mailer
var fs = require('fs');//importing node mailer
var path = require('path');//importing node mailer

emailRouter.route('/')
.options(cors.cors,(req,res)=>{
    console.log("Coming email here");
    res.render('index', { title: 'Express' });
})

// route which captures form details and sends it to your personal mail
.post(cors.cors,(req,res,next)=>{

  console.log("Envoie de l'email ...",req.body.userdata.email)
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
    here we are using gmail as our service
    In Auth object , we specify our email and password
  */
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
      user: 'vrpmanager75@gmail.com',//replace with your email
      pass: 'Azerty59'//replace with your password
    }
  });

  const filePath = path.join(__dirname, '../views/timesheet.hbs');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    timesheet:req.body.timesheet
  }
  const htmlToSend = template(replacements);




  /*
    In mail options we specify from and to address, subject and HTML content.
    In our case , we use our personal email as from and to address,
    Subject is Contact name and
    html is our form details which we parsed using bodyParser.
  */
  var mailOptions = {
    from: 'vrpmanager75@gmail.com',//replace with your email
    to: 'vrpmanager75@gmail.com',//replace with your email
    cc:`${req.body.userdata['firstname']}<${req.body.userdata['email']}>`,
    subject: `NodeMail Testing`,
    html: htmlToSend
/*
     `
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
          ` */
           };



  /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
   call back as parameter
  */

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('Error') // if error occurs send error as response to client
    } else {
      console.log('Email envoyé: ' + info.response);
      res.send('Envoyé avec succés!')//if mail is sent successfully send Sent successfully as response
    }
  });
})


module.exports = emailRouter;
