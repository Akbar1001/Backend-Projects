// app.js file is used to create server

const express=require('express')

const app=express();

const notes=[]; // container which contains all the note written by user
/*
note is an object  and notes is an array of note(object)

structure of note-->
note={
    title :"",
    document :""
}

notes=[note1,note2,note3]
*/



// now the data coming on server is stored in req.body
// inorder to store data in req.body we use a midleware
/*
    express.json() -> it is a middleware which convert req.body into json format becoz we are sending data in json format
    and this middleware make express capable to read the data coming in req.body

    to use this middle ware we write it as 
    app.use(express.json())
*/

app.use(express.json())

//now we create 1st api using REST API
/*
Api name -> notes
api method -> post
purpose -> to store data on server coming from frontend
post() method is used when a new resource is created at the server
*/

app.post('/notes',(req,res)=>{
    //console.log(req.body);
    notes.push(req.body);

    res.status(201).json({
        message:"note created successfully"
    })
})

/*
2nd API for getting sending data from server to frontend
api name -> notes
api method -> get
*/

app.get('/notes',(req,res)=>{
    
    res.status(200).json({
        message:"notes fetched successfully",
        notes: notes
    })
})
    /*
3rd api for deleting a particular node at an index
api name-> notes/index
api method -> delete
*/

app.delete('/notes/:index',(req,res)=>{
    
    const index=req.params.index
    delete notes[index]

    res.status(204).json({
        message:"Note deleted successfully"
    })
})
 
/*
4th api is used to update the data on server
api name -> notes/index
api method -> patch
*/

app.patch('/notes/:index',(req,res)=>{
    const index=req.params.index

    const new_description=req.body.description  // new_description contains the new description which the user entered 

    notes[index].description=new_description

    res.status(200).json({
        message:"note updated successfully"
    })
})

module.exports=app // server created in this file is exported