const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`
const client = new MongoClient(url);
const db = client.db('siteData');
const userCollection = db.collection('userCollection');
const scoresCollection = db.collection('scoresCollection');

(async function main() {
  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}.`);
    addScoreLists({name: "scores", scores: [], graphY: []});
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username){
    return userCollection.findOne({username : username});
}

function getUserByToken(token){
    return userCollection.findOne({token: token});
}

async function addUser(user){
    await userCollection.insertOne(user);
}

async function updateUser(user){
    await userCollection.updateOne({username: user.username}, { $set: user});
}

async function updateUserRemoveAuth(){
    await userCollection.updateOne({ username: user.username }, { $unset: {token : 1}});
}

function getScores(){
    return scoresCollection.findOne({name: "scores"});
}

async function addScoreLists(scores){
    if(await scoresCollection.findOne({name : "scores"})) return;
    await scoresCollection.insertOne(scores);
}

async function updateScoreLists(scores){
    await scoresCollection.updateOne({name: "scores"}, {$set: scores});
}

module.exports = {
    getUser,
    addUser,
    updateUser,
    getScores,
    updateScoreLists,
    updateUserRemoveAuth,
    getUserByToken
};