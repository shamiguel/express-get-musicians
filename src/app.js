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

app.get('/musicians/:id', async(req, res)=>{
    console.log(req.params)
    try{
        const id = req.params.id;
        const musician = await Musician.findByPk(id);
        res.json(musician)
    }catch(error){
        res.status(500).json({error: `An error occured when fetching musician`});
    }
});

app.get('/bands', async(req, res)=>{
    try{
        const bands = await Band.findAll();
        res.json(bands);
    }catch(error){
        res.status(500).json({error: `An error occured when fetching bands`})
    }
})







module.exports = app;