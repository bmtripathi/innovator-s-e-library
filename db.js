// import {MongoClient} from 'mongodb';
// let dbConnection;
// module.exports={
//     connectToDb:(cb)=>{
//         MongoClient.connect('mongodb://localhost:27017/e-library')
//         .then((client)=>{
//             dbConnection=client.db()
//             return cb
//         })
//         .catch((err)=>{
//             console.log(err)
//             return cb(err)
//         })
    
//     },
//     getDb:()=>dbConnection
// }
import { MongoClient } from 'mongodb';

let dbConnection;

const connectToDb = (cb) => {
    MongoClient.connect('mongodb://localhost:27017/e-library')
        .then((client) => {
            dbConnection = client.db();
            cb(null);
        })
        .catch((err) => {
            console.error('Failed to connect to the database:', err);
            cb(err);
        });
};

const getDb = () => dbConnection;

export { connectToDb, getDb };
