"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.connect = void 0;
const mongodb_1 = require("mongodb"); // imports Db and MongoClient from mongodb native driver
const state = { db: null }; // Declares a "state" object with "db" property which can either stands for "Db" or "null" and it is sets to "null". This object store a reference  
// to the database connection so that can be reused without reconnecting to the database multiple times. 
const connect = (url, dbname) => __awaiter(void 0, void 0, void 0, function* () {
    // "url" the connection string to the MongoDB server and "dbname" the name of the database to connect.
    // This function returns a Promise that resolves to "void" (does not returns a value upon successfull)
    try { // start a try block to attempt the database connection
        if (state.db) { // Check if "state.db" is already set (i.e., a databse connection already exists). If so, it exits the function (return) to prevent multiple connections to the database.
            return;
        }
        const client = new mongodb_1.MongoClient(url); // Creates a new instance of "MongoClient" using the provided connection "url"
        yield client.connect(); //Asynchronously connects to the MongoDB server using the "MongoClient" instance. It wait until the connection is stabilished before move to the next line
        state.db = client.db(dbname); // Once connected, this line sets "state.db" to the returned database by "client.db(dbname)". It makes the database connection available throughout the application
    }
    catch (err) { // catches any errors that occur during the connection process
        console.error(err); // print out the error
    }
});
exports.connect = connect;
const get = () => {
    if (!state.db) { // Check if "state.db" is "null". If so, throws an error indicating the connection is not initialized
        throw new Error("Connection is not initialized");
    }
    return state.db; // Returns the "Db" instance stored in "state.db", allowing other parts of the application interact with the database.
};
exports.get = get;
//# sourceMappingURL=db.js.map