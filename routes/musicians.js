const express = require("express");
const router = express.Router();
const Musician = require("../models/Musician")
const {check, validationResult} = require("express-validator");

router.get('/', async(req, res)=>{
    try{
        const musicians = await Musician.findAll();
        res.json(musicians)
    }catch(error){
        res.status(500).json({error: `An error occured when fetching musicians`});
    }
});

/* router.get('/bands', async(req, res)=>{
    try{
        const bands = await Band.findAll();
        res.json(bands);
    }catch(error){
        res.status(500).json({error: `An error occured when fetching bands`})
    }
}); */

//create route for get musicians/:id, should return musician 



router.get('/:id', async(req, res, next)=>{
    try{
        const id = req.params.id;
        const musician = await Musician.findByPk(id);
        res.json(musician);
    }catch(err){
        next(err)
    }
})




//Create new artist

//ADD VALIDATIONS (non empty inputs)
router.post('/',[
    check('name').not().isEmpty().trim(),
    check('instrument').not().isEmpty().trim(),
    // Min/Max number of characters
    check('name').isLength({min: 2, max:20}),
    check('instrument').isLength({min:2, max:20})
], async(req, res, next)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        //log the error
        res.json({error: errors.array()})//we should see the results for multiple errors 
    }else{
        //if no errors, POST
        const artist = await Musician.create(req.body);
        res.json(artist);
    }  
});

//Update musisican by id
router.put('/:id', [
    check('name').optional().not().isEmpty().trim(),
    check('instrument').optional().not().isEmpty().trim(),
    // Min/Max number of characters
    check('name').optional().isLength({min: 2, max:20}),
    check('instrument').optional().isLength({min:2, max:20})
], async(req, res, next)=>{
    const errors = validationResult(req)//server side validation
    if(!errors.isEmpty()){
        //log the error
        res.json({error: errors.array()})//we should see the results for multiple errors 
    }else{
        //if no errors update musician
        const musician = await Musician.findByPk(req.params.id)
        const updated = await musician.update(req.body)
        res.json(updated);
    } 
})
//Delete by id
router.delete('/:id', async (req, res, next)=>{
   try{
    // const deleted = await Musician.findByPk(req.params.id);
    await Musician.destroy({
        where: {id: req.params.id}});
    res.sendStatus(200);
   }
   catch(err){
    next(err);
   }
    
})

module.exports = router;