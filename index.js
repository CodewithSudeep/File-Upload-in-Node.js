const http = require('http');
const PORT = process.env.PORT || 8000;

http.createServer(require('./app')).listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server Running => ${PORT}`)
})