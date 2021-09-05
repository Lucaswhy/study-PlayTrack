import mongoose = require("mongoose");

interface IDatabaseOptions {
    useNewUrlParser: boolean,
    useCreateIndex: boolean,
    useUnifiedTopology: boolean,
    dbName: String
}

export default function startDatabase(){

mongoose.Promise = global.Promise; 
//const opts:IDatabaseOptions = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

    run().catch(e => console.log('Error in mongoose to open an Database. Log:' + e));

    async function run(): Promise<void> {
        await mongoose.connect('mongodb://localhost/Playtrack');
        console.log('Database on.');
    } 
}