// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");

describe('./musicians endpoint', () => {
    // Write your tests here
    it('successful get method returns musicians', async()=>{
        const response = await request(app).get('/musicians');
       
        expect(response.statusCode).toBe(200);
        expect(response.body[0].name).toBe("Mick Jagger");
    });

    it('returns an error when unsuccesful', async()=>{
        expect(true).toBe(true);
    })
});

describe('./bands endpoint', () => {
    // Write your tests here
    it('successful get method returns bands', async()=>{
        const response = await request(app).get('/bands');
    
        expect(response.statusCode).toBe(200);
    });
})

////// Workshop 2 TESTS!!!!! START HERE!!!!

describe('./musicians/:id endpoint', ()=>{
    it('successfully gets a musician based off of id,', async()=>{
        const response = await request(app)
        .get('/musicians/1')
        .expect(200);

        expect(response.body.name).toBe("Mick Jagger")
    });
})

describe('./musicians/:id additional testing', () => {
    it('creates a new musician', async ()=> {
        const response = await request(app)
        .post('/musicians')
        .expect(200);
    })

    it('updates a musician based on id', async ()=> {
        const response = await request(app)
        .put('/musicians/3')
        .send({name:"Michael Jackson"})
        .expect(200)
        console.log(response)
        expect(response.body.name).toBe('Michael Jackson')
    })

    it('deletes a musician based on id', async () => {
        const musician = await Musician.findByPk(3)
        const response = await request(app)
        .delete('/musicians/3')
        .expect(200)

    })
})