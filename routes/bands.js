const express = require("express");
const router = express.Router();
const { Band, Musician } = require("../models/index");
//Get All Bands + eager loading their musicians  
router.get('/', async(req, res)=>{
    try{
        const bandsWithMusicians = await Band.findAll({include: Musician}) ;
        res.json(bandsWithMusicians);
    }catch(err){
        console.log(err)
    }
})

router.get('/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        const bandWithMusicians = await Band.findByPk(id, {include: Musician}) ;
        res.json(bandWithMusicians);
    }catch(err){
        console.log(err)
    }
})

module.exports = router;
