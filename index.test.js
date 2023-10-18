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
        // console.log(response.body[0]);
        expect(response.body[0].name).toContain("The Beatles");
        expect(response.body[0].musicians[0].name).toBe("Mick Jagger");
    });
})

describe('./bands/:id endpoint', () => {
    it("finds band by id with musicians", async () => {
        const response = await request(app).get('/bands/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('The Beatles')
        expect(response.body.musicians[0].name).toBe("Mick Jagger")
    })
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
    //POST Success
    it('creates a new musician', async ()=> {
        const response = await request(app)
        .post('/musicians')
        .expect(200);
    });
    //POST failure
    it('sends an array of errors if validation fails', async()=>{
        const response = await request(app)
        .post('/musicians')
        .send({
            name: "",
            instrument: ""
        })
        const data = JSON.parse(response.text)
        console.log(response.body.error)
        console.log(data.error)
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body.error)).toBe(true);
        expect(data.error).toEqual(response.body.error);
    })




    //PUT Success
    it('updates a musician based on id', async ()=> {
        const response = await request(app)
        .put('/musicians/3')
        .send({name:"Michael Jackson"})
        .expect(200)
        expect(response.body.name).toBe('Michael Jackson')
    })

    it('deletes a musician based on id', async () => {
        const musician = await Musician.findByPk(3)
        const response = await request(app)
        .delete('/musicians/3')
        .expect(200)

    })
})

