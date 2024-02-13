import * as Artists from "../models/artists";
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from "express";

export const all = async ( _: ExpressRequest, res: ExpressResponse, next: NextFunction ) => {
  try {
    const docs = await Artists.all();
    res.send(docs);
  } catch (err) {
    next();
  }
};

export const create = async ( req: ExpressRequest, res: ExpressResponse, next: NextFunction ) => {
  try {
    const doc = await Artists.create({ name: req.body.name });
    res.send(doc);
  } catch (err) {
    next();
  }
};