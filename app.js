var contentstack = require("contentstack-express"),
    app = contentstack(),
     path = require('path'),
     moment = require('moment');
     nodemailer = require('nodemailer'),
     bodyParser = require('body-parser'),
     request = require("request"),
    config = contentstack.config,
    server = config.get("server"),
    environment = config.get("environment"),
    port = process.env.PORT || config.get("port");
 
/**
* start the application
*/
app.locals.substring = function(str, start, end)
{ 
  if(!str){ 
    return ""; 
  } 
  return str.substring(start, end || str.length) 
}

 
app.locals.moment = moment;
app.locals.env_server = environment;
app.locals.NODE_ENV = environment;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())
app.use("/", contentstack.static(path.join(__dirname, 'themes','basic','public','static')));
app.get('*', function(req, res, next){
	//Generating URL for canonical URL	
	var full_url = req.path;
 	if((full_url.lastIndexOf('/')+1) == full_url.length){
       full_url = full_url.substr(0, full_url.lastIndexOf('/'));   
   	} 
 	req.getViewContext().set('canonical', full_url);
 //  End Canonical URL   
 	next();
});

app.locals.host = "http://localhost:4003"
if(process.env.NODE_ENV == "staging"){

  app.locals.host = "https://stag-www.contentstack.com"
}
if(process.env.NODE_ENV == "production"){

  app.locals.host = "https://www.contentstack.com"
}

// app.post('/getpdf',function(req,res){
//         var name = req.body.first_name;
//         var email = req.body.email;
//         var link = req.body.link;
//         var transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: '',
//             pass: ''
//           }
//         });

//         var mailOptions = {
//           from: 'vikrant.raut@raweng.com',
//           to: email,
//           subject: 'Thank you for downland'+ " " + name +'!',
//           text: 'Your PDF is now available. Click to open'+ " " + link
//         };

//         transporter.sendMail(mailOptions, function(error, info){
//           if (error) {
//             console.log(error);
//           } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });
//         res.json({status:req.body});
        
// });

app.disable('x-powered-by');
app.listen(port, function() {
    console.log("Server(%s) is running on '%s' environment over %d port", server, environment, port);
});


