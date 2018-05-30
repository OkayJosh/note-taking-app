//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
var notes = ["Photoshop", "Ruby on Rails"];

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
//render the ejs and display added task, completed task
app.get("/", function(req, res) {

    res.render("index", { notes: notes});
});
//post route for adding new task
app.post("/addNote", function(req, res) {
    var newNote = req.body.newnote;
    if (!isEmpty(newNote)){
        notes.push(newNote);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }

});

app.post("/removeNote", function(req, res) {
    var removeNote = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof removeNote === "string") {
        notes.splice(notes.indexOf(removeNote), 1);
        res.redirect("/");
    }

});
//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});