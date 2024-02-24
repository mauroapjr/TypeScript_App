import { Db, MongoClient } from "mongodb"; // imports Db and MongoClient from mongodb native driver

const state: {db: Db | null } = { db: null }; // Declares a "state" object with "db" property which can either stands for "Db" or "null" and it is sets to "null". This object store a reference  
// to the database connection so that can be reused without reconnecting to the database multiple times. 

export const connect = async ( url: string, dbname: string): Promise <void> => { // Defines an asyncronous function named "connect" that it is exported from the module. It takes 2 parameters
                                                                                 // "url" the connection string to the MongoDB server and "dbname" the name of the database to connect.
                                                                                 // This function returns a Promise that resolves to "void" (does not returns a value upon successfull)
  try { // start a try block to attempt the database connection
    if (state.db){ // Check if "state.db" is already set (i.e., a databse connection already exists). If so, it exits the function (return) to prevent multiple connections to the database.
      return
    }

    const client = new MongoClient(url); // Creates a new instance of "MongoClient" using the provided connection "url"
    await client.connect(); //Asynchronously connects to the MongoDB server using the "MongoClient" instance. It wait until the connection is stabilished before move to the next line

    state.db = client.db(dbname) // Once connected, this line sets "state.db" to the returned database by "client.db(dbname)". It makes the database connection available throughout the application
  }  catch (err) {  // catches any errors that occur during the connection process
    console.error (err); // print out the error
    }
  
}

export const get = (): Db => { // Defines and export a function named "get" that returns an instance of "Db". No parameters.
  if (!state.db) { // Check if "state.db" is "null". If so, throws an error indicating the connection is not initialized
    throw new Error ("Connection is not initialized");
  }
  return state.db; // Returns the "Db" instance stored in "state.db", allowing other parts of the application interact with the database.
};