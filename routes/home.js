const router = require('express').Router();

router.get('/', (req, res, next) =>{
    res.send('<h1>Movie Genres API - HOME PAGE</h1>');
});

module.exports = router;