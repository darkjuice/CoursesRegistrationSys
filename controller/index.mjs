import {Router} from "express";
import {getStuByUser, register, resetPassword} from "../model/user.mjs";
import {getStuAgenda, getStuAllCourse, registerCourse} from "../model/course_student.mjs";
import {getAllCourse} from "../model/courses.mjs";
import {getAllMessage, PublishInformation} from "../model/message_board.mjs";
import {saveCaptcha} from "../model/captcha.mjs";

const router = Router()

router.get("/login",async (req,resp)=>{
    resp.render("login.html",{info:undefined})
})
router.get("/logout"   ,async (req,resp)=>{
    req.session.destroy()
    resp.redirect("/login")
})
router.get("/homepage",async (req,resp)=>{
    if (!req.session.isLoging){
        resp.redirect("/login")
    }
    let agendas = await getStuAgenda(req.session.studentid)
    console.log(agendas)
    resp.render("homepage.html",{username:req.session.username,agendas:agendas})
})
router.get("/",async (req,resp)=>{
    resp.redirect("/homepage")
})
router.post("/login",async (req,resp)=>{
    let userInfo = await getStuByUser(req.body.username,req.body.password)
    if (userInfo !== null){
        req.session.isLoging = true;
        req.session.studentid = userInfo.studentid
        req.session.username = userInfo.username
        req.session.email = userInfo.email
        resp.redirect("/homepage")
    }else {
        req.session.loggedIn = false;
        resp.render("login.html",{info:"The user or password is incorrect"})
    }
})

router.get("/course-registration",async (req, resp) => {
    if (req.session.isLoging === false) {
        resp.redirect("/login")
    }
    let stuCourse = await getStuAllCourse(req.session.studentid)
    let courses = await getAllCourse()
    resp.render("course-registration.html",{allCourse:courses,stuCourse:stuCourse})
})

router.post("/registerCourse",async (req,resp)=>{
    let crn = req.body.crn

    await registerCourse(req.session.studentid,crn)
    resp.redirect("/course-registration")
})

router.get("/messageBoard",async (req,resp)=>{
    let messages = await getAllMessage();
    resp.render("message_board.html",{messages:messages})
})

router.post("/publishInfo",async (req,resp)=>{
    await PublishInformation(req.session.studentid,req.body.message,req.session.username)
    resp.redirect("/messageBoard")
})

router.get("/register",(req,resp)=>{
    resp.render("register.html")
})
router.post("/register",async (req,resp)=>{
    let user = {
        name:req.body.name,
        username:req.body.username,
        studentid:req.body.studentid,
        email:req.body.email,
        password:req.body.password,
        major:req.body.major,
        minor:req.body.minor,
        year: parseInt(req.body.year),
        googuser:req.body.googleUsername,
        googpass:req.body.googlePassword
    }
    await register(user)
    resp.redirect("/login")
})

router.get("/resetPass",async (req,resp)=>{
    resp.render("resetPassword.html",{info:undefined})
})
router.get("/getCaptcha",async (req,resp)=>{
    await saveCaptcha(req.session.studentid,req.session.name,req.session.email)
    resp.render("resetPassword.html",{info:"The verification code has been sent to the email address"})
})
router.post("/resetPass",async (req,resp)=>{
    let res = await resetPassword(req.session.studentid,req.body.captcha,req.body.password)
    if (res !== true){
        resp.render("resetPassword.html",{info:res})
    }else {
        resp.render("login.html",{info:"Please log in again"})
    }
})
export {router}
