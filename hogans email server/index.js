const nodemailer = require('nodemailer'),
  fs = require('fs'),
  hogan = require('hogan.js'),
  inlineCss = require('inline-css');

// Create and initialize the email transport object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: 'true',
  port: '465',
  auth: {
    user: 'vrpmanager75@gmail.com', // must be Gmail
    pass: 'Azerty59'
  }
});

(async function () {
  try {

    //Load the template file
    const templateFile = fs.readFileSync("./template/template.html");
    //Load and inline the style
    const templateStyled = await inlineCss(templateFile.toString(), {url: "file://" + __dirname + "/template/"});
    //Inject the data in the template and compile the html
    const templateCompiled = hogan.compile(templateStyled);
    const templateRendered = templateCompiled.render({text: "HelloWorld"});

    const emailData = {
      to: "vrpmanager75@gmail.com",
      from: 'vrpmanager75@gmail.com',
      subject: "My Beautiful Email",
      html: templateRendered
    };

    //Send the email
    await transporter.sendMail(emailData);

  } catch (e) {
    console.error(e);
  }
})()
