const app = require('./app');

const port = 801;

const server = app.listen(port, () => {
    console.log('port is listening at ' + port);   
})