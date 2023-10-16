const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get('/musicians', async(req, res)=>{
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







module.exports = app;