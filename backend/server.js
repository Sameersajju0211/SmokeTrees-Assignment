const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

let db=null;

const dbPath = path.join(__dirname,'smokeTrees.db');

const initializeDB = async()=>{
    try{
        db = await open({
            filename : dbPath,
            driver : sqlite3.Database
        })
        app.listen(5000,()=>console.log("Server is up and running on port 5000"));
    }
    catch(err){
        console.log(`Database Error Caught: ${err}`)
        process.exit(1);
    }
}

initializeDB();

app.use(cors());
app.use(express.json());

app.post("/register", async(request,response)=>{
    const {userId,name,address} = request.body;
    const getQuery = `SELECT COUNT(*) as count FROM User WHERE name = '${name}';`
    const isExists = await db.get(getQuery);
    //console.log(isExists);
    if(isExists.count===0){
    const insertQuery = `INSERT INTO User (id,name) VALUES ('${userId}','${name}')`
    const insertQuery2 = `INSERT INTO Address (userId,address) VALUES ('${userId}','${address}')`
    const dbRes = await db.run(insertQuery);
    await db.run(insertQuery2)
    
    response.status(200);
    response.send(dbRes);
    }else{
        const getId = `SELECT id FROM User WHERE name='${name}'`
        const dbResponse = await db.get(getId);
        const insertAddress = `INSERT INTO Address (userId,address) VALUES ('${dbResponse.id}','${address}')`
        const dbRes2 = await db.run(insertAddress);
        response.send(dbRes2);
        //console.log("Record already exists");
    }
})

app.get("/users",async (request,response)=>{
    const sqlcmd = `SELECT * FROM User INNER JOIN Address ON User.id = Address.userId`;
    const dbResponse = await db.all(sqlcmd);
    response.send(dbResponse);
  })