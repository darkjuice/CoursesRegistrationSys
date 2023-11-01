import { mongodb } from "../utils/db.mjs";
import {profilesSchema} from "./schema.mjs";
import {confirmCaptcha} from "./captcha.mjs";

let profilesModel = mongodb.model(
    "profiles",
    profilesSchema,
    "profiles"
)
const getStuByUser = async (username,password)=>{
    return await profilesModel.findOne(
        {
            "username":username,
            "password":password
        }
    )
}


/**
 * get student's information by google username and password
 * @author bonan yin
 * @param username google username
 * @param password google password
 * @return information
 */
const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
const getStuByGoogle = async (username, password) =>{
    let isEmail= reg.test(username);
    if (!isEmail){
        return "email format error"
    }
    return await profilesModel.find({'googuser' : username,'googpass':password})
        .then((res)=>{
            return res
        }).catch(err=>{
            console.log(err)
            return false
        })
}

const register = async (user)=>{
    return await profilesModel.insertMany([
        user
    ])
}
const resetPassword = async (stuid,captcha,password)=>{
    await profilesModel.updateOne({
        "studentid":stuid,
    },{$set: {"password": password}})
    return true

    // if (await confirmCaptcha(stuid,captcha)){
    //     await profilesModel.update({
    //         "studentid":stuid,
    //     },{$set: {"password": password}})
    //     return true
    // }else {
    //     return "Verification code error"
    // }
}
export {getStuByUser,getStuByGoogle,register,resetPassword}
