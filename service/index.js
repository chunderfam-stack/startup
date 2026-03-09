const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName ='token';

let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {

});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if(user){
        next();
    } else{
        res.status(401).send({msg: "Unauthorized"});
    }
};

async function findUser(field, value){
    if(!value) return null;
    return users.find((u) => u[field] === value);
}

app.listen(port, () => {
    console.log("Listening on port 8000");
});