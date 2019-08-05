//jshint esversion:6

let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');


let app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);


    var options = {
        url: "https://us3.api.mailchimp.com/3.0/lists/API key", 
        method: "POST",
        headers: {
            "Authorization": "xxxxx API key"
        },
        body: jsonData
    };
    

    request(options, function(error, response, body) {
        if(error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if(response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");          
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
      }  
    });

    
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, () => {
    console.log('listening 3000...')

})

//1cbeacaf13e1410323d46c6df61296ba-us3
//088bc14c82
//1cbeacaf13e1410323d46c6df61296ba-us
//088bc14c82


//8b39658f73e22d8c8020c5c4e7ee3b7f-us3
//
