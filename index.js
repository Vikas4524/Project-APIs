const express = require("express");
const app = express();
const port =8080;
const path =require("path");
                //  method override (package)
const methodOverride = require('method-override');

// Universally unique identifier (package).
const { v4: uuidv4 } = require('uuid');



app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("views engine","ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
 

let posts  = [
    {
        id : uuidv4(),
        username : "apnacollege",
        content : "I love coding!",
    },
    {
        id : uuidv4(),
        username : "VikasNirmal",
        content : "Hard work is important to achieve success",
    },
    {
        id : uuidv4(),
        username : "AjayKhichi",
        content : "I got selected for my 1st internship!",
    },

];


                    // Index Route

app.get("/posts", (req, res)=>{
    
    res.render("index.ejs",{posts});
})


                //   Create Route
                  
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req, res)=>{
    console.log(req.body);
let {username, content} = req.body;
let id = uuidv4(); 
 posts.push({id, username, content});

 res.redirect("/posts");
})


                    //    Show Route (To get one post using id)

app.get("/posts/:id",(req, res) =>{
    let {id} = req.params;
   console.log(id);
    for(let post of posts){
        if(post.id === id){
            // console.log(post);
            res.render("show.ejs",{post});
        }
    }
});

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})



                  // Update Route   

app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params;
    console.log(id);
    let Newcontent = req.body.content;

    let post = posts.find((p) => id === p.id);
    post.content = Newcontent;
    console.log(post)
    res.redirect("/posts");
})


                    //  Edit Route 

 app.get("/posts/:id/edit",(req, res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
 });


                    // Destroy Route
app.delete("/posts/:id",(req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});