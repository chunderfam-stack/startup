const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { Db } = require('mongodb');
const { peerProxy } = require('./peerProxy.js');

const authCookieName ='token';

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);




apiRouter.post('/auth/create', async (req, res) => {
    if(await findUser('username', req.body.username)){
        res.status(409).send({msg : "Existing User"});
    } else{
        const user =  await createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({username : user.username});
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if(user){
        if (await bcrypt.compare(req.body.password, user.password)){
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({username : user.username});
            return;
        }
    }
    res.status(401).send({msg : "Unauthorized"});
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('username', req.cookies[authCookieName]);
    if(user){
        await DB.updateUserRemoveAuth(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
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
    if(field === 'token'){
        return DB.getUserByToken(value)
    }
    return DB.getUser(value);
}

async function createUser(username, password){
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        highScore: 0,
    };
    await DB.addUser(user);
    return user;
}

function setAuthCookie(res, authToken){
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60  * 24 * 365,
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

//Scores
apiRouter.get('/scores', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const scoresJSON = await DB.getScores();
    if(scoresJSON.graphY.length == 0){
        let newGraph = []
        for(let x = 0; x < 500; x += 10){
            newGraph.push(0);
        }
        await DB.updateOneScoreTag("graphY", newGraph);
    }
    res.json({
        scores: scoresJSON.scores,
        yValues: scoresJSON.graphY,
        highScore: user.highScore,
        average: scoresJSON.average / scoresJSON.averageCount,
    });
});

apiRouter.post('/score', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const scoresJSON = await DB.getScores();
    let highScore = user.highScore;
    if(Number(req.body.score) < Number(user.highScore) || Number(user.highScore) === 0) {
        highScore = req.body.score;
        user.highScore = highScore;
        await DB.updateUser(user);
    }
    let scores = updateScores(req.body, scoresJSON.scores);
    let graphY =  updateGraph(req.body.score, scoresJSON.graphY);
    let average = scoresJSON.average + Number(req.body.score);
    let averageCount = scoresJSON.averageCount + 1;
    await DB.updateScoreLists({
        name: "scores",
        scores: scores,
        graphY: graphY,
        average:  average,
        averageCount:  averageCount,
    });
    res.json({
        scores: scores,
        yValues: graphY,
        highScore: highScore,
        average: Number(average) / Number(averageCount),
    });
});

function updateGraph(newScore, graphY){
    if(graphY.length == 0){
        for(let x = 0; x < 500; x += 10){
            graphY.push(0);
        }
    }
    const position = Math.round(newScore / 10);
    if(position > 50) return graphY;
    const newY = [...graphY];
    newY[position] += 1;
    return newY;
}

function updateScores(newScore, scores){
    const newScores = [...scores];
    let found = false;
    for(const [i, prevScore] of newScores.entries()){
        if(Number(newScore.score) < Number(prevScore.score)){
            newScores.splice(i, 0, newScore);
            found = true;
            break;
        }
    }
    if(!found){
        newScores.push(newScore);
    } 
    if(newScores.length > 5){
        newScores.length = 5;
    }
    return newScores;
}

app.use((_req, res) => {
    res.sendFile('index.html', {root: "public"});
});

app.use((err, req, res, next) => {
    res.status(500).send({type : err.name, message : err.message});
});

const httpServer = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpServer);