import bodyParser from "body-parser";
import express from "express";
import { router } from "./controller/index.mjs";
import ejs from "ejs"
import session from 'express-session';
const app = express()

app.use(bodyParser.json());
app.use(express.static('view'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    name: 'course-student',
    secret: 'course-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 3600000
    }
}));


app.use("/",router)
app.set("views","view")
app.set("view engine","html")
app.engine("html",ejs.renderFile)
app.listen(3000,(()=>{

}))
