"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteById = exports.update = exports.findById = exports.create = exports.all = void 0;
const db = __importStar(require("../db"));
const mongodb_1 = require("mongodb");
const all = () => {
    return db.get().collection('artists').find({}).toArray(); // of the 'Artist' object
};
exports.all = all;
const create = (artist) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection("artists").insertOne(artist); // it into 'artists'collection. it casts the inserted 'artist' to "Artist"
    return artist;
});
exports.create = create;
const findById = (id) => {
    return db.get().collection("artists").findOne({ _id: new mongodb_1.ObjectId(id) }); // collection. It converts the string '_id' to an 'ObjectId' and return the document as an 'Artist'or 'null'
};
exports.findById = findById;
const update = (id, newData) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection("artists").updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: newData }); // collection by its '_id' with neew data ('newData'). It assume the update is successfull and 
    return Object.assign(Object.assign({}, newData), { _id: id });
});
exports.update = update;
const deleteById = (id) => {
    return db.get().collection("artists").deleteOne({ _id: new mongodb_1.ObjectId(id) }); // by its '_id'. It returns a 'DeleteResult' with details about the operation. 
};
exports.deleteById = deleteById;
//# sourceMappingURL=artists.js.map