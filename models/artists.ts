import { Artist, ArtistWithoutId } from "../types/artist";
import * as db from "../db";


export const all = (): Promise<Artist[]> => {
  return db.get() .collection('artists').find<Artist>({}).toArray();
};

export const create = async (artist: ArtistWithoutId): Promise<Artist> => {
  await db.get().collection("artists").insertOne(artist);
  return artist as Artist;
};

