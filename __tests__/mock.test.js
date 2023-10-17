const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('../db/connection');
const { Musician } = require('../models/index')
const app = require('../src/app');
const seedMusician = require("../seedData");

//******Jest Mock Test********** */
//jest.mock("../models/index", () => ({create: jest.fn()}));

describe('Jest mock test', ()=>{
    it('post', async ()=>{
        Musician.create = jest.fn();
       const musicianData ={
            name: "J.Cole", 
            instrument: "Voice"
        }
        const musicianMock = {...musicianData,_id:"mockedId"}
        Musician.create.mockResolvedValue(musicianMock);
        const response = await request(app)
        .post('/musicians')
        .send(musicianData)
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(musicianMock)
        expect(Musician.create).toHaveBeenCalledWith(musicianData);
    })
    /*
    it('PUT /musicians', async ()=>{
        Musician.update = jest.fn();
        //fake Object name = "Kendrick Lamar", instrument = Voice
        const newArtist ={
            //id: 99,
            name: "Kendrick Lamar", 
            instrument: "Voice"
        }
        //unpack object and give fake id
        //What would unpacked be
        Musician.update.mockResolvedValue(newArtist);//newArtist
        const response = await request(app)
        .put('/musicians/99')
        .send(newArtist)
        //expect(response.statusCode).toBe(200)
        //unneccessary line
        expect(Musician.update).toHaveBeenCalledWith(newArtist)//newartist

    })*/
})














































































