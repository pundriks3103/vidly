//Requiring the necessary modules
const app = require('./app');

//Setting up the port
const port = process.env.PORT || 8080;

//Server Listening on port
app.listen(port, ()=>{
    console.info(`Listening on port ${port}\n`);
    console.info(`http://localhost:${port}/api/genres`);
});