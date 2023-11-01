import { mongodb } from "../utils/db.mjs";
import {captchaSchema} from "./schema.mjs";
import {sendCaptchaEmail} from "../utils/emailutil.mjs";

let captchaModel = mongodb.model(
    "captcha",
    captchaSchema,
    "captcha"
)

/**
 * get a random captcha with 4 digits
 * @author bonan yin
 * @param count 4
 * @return randomly generated captcha
 */
function createCaptcha(count){
    let res = '';
    for (let i = 0; i < count; i++) {
        res += Math.ceil(Math.random() * 10) - 1;
    }
    return res
}

/**
 * store captcha in database and return it
 * @author bonan yin
 * @param stuId user.mjs id
 * @return captcha
 */
const saveCaptcha = async (stuId,name,email) => {
    let now = new Date();//get the current time
    let expiresAt = new Date(now.getTime() + 1 * 60000);// 1 minute later delay
    let captcha = createCaptcha(4);
    await captchaModel.deleteMany({stuId:stuId}).then(
        res=>{
        }
    ).catch(
        err=>{
            console.log(err)
        }
    )
    let temp = {
        stuid:stuId,
        captcha:captcha,
        expiresAt: expiresAt
    }
    await captchaModel.insertMany([temp]);
    await sendCaptchaEmail("Your verification code is :"+captcha ,name,email,"reset password")
    return captcha
}


/**
 * confirm captcha is correct or not
 * @author bonan yin
 * @param stuId     user.mjs id
 * @param captcha  captcha
 * @return  true or false
 */
//   identify  the captcha and if it is not stored, then return false
const confirmCaptcha = async (stuId,captcha) =>{
    return await captchaModel.find({stuId:stuId+"",captcha:captcha+""}).then(
        res=>{
            if (res){
                return res.captcha === captcha;
            }else {
                return false
            }
        }
    ).catch(err=>{
        console.log(err+"err")
        return false
    })
}
export {saveCaptcha,confirmCaptcha}
