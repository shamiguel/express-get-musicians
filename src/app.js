const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;
const bandRouter = require("../routes/bands");
const musicianRouter = require("../routes/musicians");

app.use(express.json());
app.use("/musicians", musicianRouter);
app.use("/bands", bandRouter);

//TODO: Create a GET /musicians route to return all musicians 

/* app.get('/musicians', async(req, res)=>{
    try{
        const musicians = await Musician.findAll();
        res.json(musicians)
    }catch(error){
        res.status(500).json({error: `An error occured when fetching musicians`});
    }
});

app.get('/bands', async(req, res)=>{
    try{
        const bands = await Band.findAll();
        res.json(bands);
    }catch(error){
        res.status(500).json({error: `An error occured when fetching bands`})
    }
});

//create route for get musicians/:id, should return musician 

app.use(express.json());

app.get('/musicians/:id', async(req, res, next)=>{
    try{
        const id = req.params.id;
        const musician = await Musician.findByPk(id);
        res.json(musician);
    }catch(err){
        next(err)
    }
})


//Create route update(put) and delete
app.use(express.urlencoded());

//Create new artist
app.post('/musicians', async(req, res, next)=>{
    try{
        const artist = await Musician.create(req.body);
        res.json(artist);
    }
    catch(err){
        next(err);
    }
})

//Update musisican by id
app.put('/musicians/:id', async(req, res, next)=>{
    try{
        const musician = await Musician.findByPk(req.params.id)
        const updated = await musician.update(req.body)
        console.log(updated);
        res.json(updated);
    }
    catch(err){
        next(err);
    }
}) */
//Delete by id
/* app.delete('/musicians/:id', async (req, res, next)=>{
   try{
    // const deleted = await Musician.findByPk(req.params.id);
    await Musician.destroy({
        where: {id: req.params.id}});
    res.sendStatus(200);
   }
   catch(err){
    next(err);
   }
    
}) */



module.exports = app;