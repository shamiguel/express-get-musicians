const { Musician, Band } = require("./models/index")
const { db } = require("./db/connection");
const { seedMusician, seedBand } = require("./seedData");

const syncSeed = async () => {
    await db.sync({force: true});
    seedMusician.map(musician => Musician.create(musician));
    seedBand.map(band => Band.create(band));

    //we are going to add 
    const musicians = await Musician.findAll();
    const band1 = await Band.findByPk(1);
    const band2 = await Band.findByPk(2);
    const band3 = await Band.findByPk(3);
    await band1.addMusicians(musicians[0]);
    await band2.addMusicians(musicians[1]);
    await band3.addMusicians(musicians[2]);
}

syncSeed();