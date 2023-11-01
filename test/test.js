import { expect } from "chai";
import { describe } from "mocha";
import {confirmCaptcha, saveCaptcha} from "../model/captcha.mjs";
import {getScheduleByStuId} from "../model/student.mjs";
import {getStuByGoogle} from "../model/user_profile.js";
import {connectToDB} from "../utils/db.js";

describe("test by Bonan Yin",async function(){
    // if true, then test passes
    before(async function () {
        await connectToDB();

    });
    it('save and confirm captcha', async function () {
        let captcha = await saveCaptcha(1)
        expect(await confirmCaptcha(1,captcha)).ok
    });

    //  if find it, then test passes
    it('test getScheduleByStuId', async function () {
        let Schedules = await getScheduleByStuId("0")
        expect(Schedules).ok
    });
    //  if find it, then test passes
    it('getStuByGoogle',async function () {
        let stu = await getStuByGoogle("testjohndoe343@gmail.com","YiCuza2023")
        expect(stu).ok
    });
    //  test email format,if return false, then test passes
    it('test email format', async function () {
        let stu = await getStuByGoogle("testjgmail.com","YiCuza2023")
        expect(stu).equals("email format error")
    });

})
