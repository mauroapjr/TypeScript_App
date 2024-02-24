import { Artist, ArtistWithoutId } from "../types/artist";
import * as db from "../db";
import { DeleteResult, ObjectId } from "mongodb";


export const all = (): Promise<Artist[]> => { // Declares and export an asynchonous function named "all" that retrieves all documents from the 'artists' collection and return them as an array  
  return db.get() .collection('artists').find<Artist>({}).toArray();  // of the 'Artist' object
};

export const create = async (artist: ArtistWithoutId): Promise<Artist> => { // Declares and export an asynchronous function named 'create' that takes 'artist' object ('ArtistWithoutId') and insert
  await db.get().collection("artists").insertOne(artist);  // it into 'artists'collection. it casts the inserted 'artist' to "Artist"
  return artist as Artist;
};

export const findById = (id: string): Promise<Artist | null > => { // Declares and export an asynchronous function named 'findById' that retrieves a single document as it 'id' from the 'artists' 
  return db.get().collection("artists").findOne<Artist>({_id: new ObjectId(id)}) // collection. It converts the string '_id' to an 'ObjectId' and return the document as an 'Artist'or 'null'
};

export const update = async ( id: string, newData: ArtistWithoutId ): Promise<Artist> => {  // Declares and export an asynchronous function named 'update' that updates a document in the 'artists' 
  await db.get().collection("artists").updateOne({ _id: new ObjectId(id) }, { $set: newData}); // collection by its '_id' with neew data ('newData'). It assume the update is successfull and 
  return {                                                                                  // reconstructs the "Artist" object to return including the original _id  
    ...newData, _id: id,
  };
};

export const deleteById = (id: string): Promise<DeleteResult> => {  // Declare and export an asynchronous function named "deleteById" that deletes a single document from the 'artists'collection
  return db.get().collection("artists").deleteOne({ _id: new ObjectId(id) });  // by its '_id'. It returns a 'DeleteResult' with details about the operation. 
};