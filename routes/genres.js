const router = require('express').Router();
const movieGenres = require('../db/data');
const schema = require('../db/schema');

const apiRoute = '/api/genres';

router.get('/', (req, res, _next) => {
    res.send(movieGenres);
});

router.get('/:name', (req, res, _next) => {
    const name = req.params.name;
    const keyValue = movieGenres.findIndex(e => e.name === name);
    
    if(keyValue === -1){
        res.status(404).send(`GET ${apiRoute}/${name} Invalid Key`);
    }
    
    else{
        res.status(200).json(movieGenres[keyValue]);
    }
});

//Post Routes
router.post('/', (req, res, _next) => {
    const newEntry = { 'id' : getNewId(), ...req.body};

    if(isSchemaValid(req.body)){
        movieGenres.push(newEntry);
        res.send(`POST ${apiRoute} Key has been successfully inserted`);
    }
    else
        res.status(400).send(`ERR POST ${apiRoute} Invalid schema`);
});

//Put Route

router.put('/', (req, res, next) => {
    const name = req.body.name;
    const newEntry = { 'id' : getNewId(), ...req.body};
    const indexWithSameGenreName = movieGenres.findIndex((e) => {
        return e.name === name;
    });

    if( isSchemaValid(req.body) ){
        
        if(indexWithSameGenreName !== -1){
                movieGenres[indexWithSameGenreName].examples = req.body.examples;
                res.status(201)
                .json(movieGenres[indexWithSameGenreName]);
            }
        else{
            movieGenres.push(newEntry);
            res.status(201)
            .json(newEntry);
        }
    }

    else
        res.status(400).send(`ERR PUT ${apiRoute} Invalid schema`);
});

//Delete Routes
router.delete('/:name', (req, res, next) => {
    //Get the jsonObject from persistent data
    //Delete it ,if present else send an error.
    const name = req.params.name.toLowerCase();
    const indexWithSameGenreName = movieGenres.findIndex((e) => {
        return e.name === name;
    });

    if(indexWithSameGenreName !== -1){
        const deletedObj = movieGenres[indexWithSameGenreName];
        movieGenres.splice(indexWithSameGenreName, 1);
        res.status(201)
           .json(deletedObj);
    }
    else{
        res.status(404).send(`ERR DELETE ${apiRoute}/${name} Unable to find the name`);
    }

});

function getNewId(){
    const movieGenresIds = movieGenres.map(element => element.id);
    return Math.max(...movieGenresIds) + 1;
}

function isSchemaValid(obj) { 
    return schema.validate(obj).error === undefined;
}

function isEmptyObj(obj){
    return Object.keys(obj).length === 0;
}


module.exports = router;