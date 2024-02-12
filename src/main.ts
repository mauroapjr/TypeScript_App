import  express  from "express";
import { connect } from "../db";

const app = express();

const startServer = async () => {
  await connect("mongodb://localhost:27017/api", "app");
  
  app.listen(3012, () => {
  console.log ("API started");
});
};

startServer();