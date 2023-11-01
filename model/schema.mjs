import {mongodb} from "../utils/db.mjs";

const captchaSchema = new mongodb.Schema(
    {
        stuid:String,
        captcha:String,
        expiresAt:Date
    }
)

const course_student_db_schema = new mongodb.Schema(
    {
        studentid:String,
        crn:String,
        days:String,
        roombuild:String,
        roomnumber:String,
        subject:String,
        section:String,
        number:String,
        starttime:String,
        endtime:String
    }
)
const coursesSchema = new mongodb.Schema(
    {
        subject:String,
        number:String,
        name:String,
        section:String,
        crn:String,
        slot:String,
        days:String,
        starttime:String,
        endtime:String,
        roombuild:String,
        roomnumber:String,
        type:String,
        method:String,
        associatedleclab:String,
        phon:String,
        waitlist:String,
        precheck:String,
        reservelifted:String,
        attribute:String,
        credhr:String,
        billhr:String,
        prime_instr:String,
        secnd_instr:String,
        availto:String,
        reservefordegree:String,
        reserveformajor:String,
        reserveforminor:String,
        xlist:String
    }
)
const profilesSchema = new mongodb.Schema(
    {
        alarms:String,
        compcourses:String,
        courses:String,
        degreeplan:String,
        email:String,
        googpass:String,
        googuser:String,
        hasCalender:String,
        major:String,
        minor:String,
        name:String,
        password:String,
        studentid:String,
        username:String,
        year:Number
    }
)
const message_board_Schema = new mongodb.Schema(
    {
            studentid: String,
            message:String,
            name:String,
            createdAt: {
                    type: Date,
                    default: Date.now
            }
    }
)

export {coursesSchema,captchaSchema,course_student_db_schema,profilesSchema,message_board_Schema}
