import { Artist } from "../types/artist";
import * as db from "../db";


export const all = (): Promise<Artist[]> => {
  return db.get() .collection('artists').find<Artist>({}).toArray();
};