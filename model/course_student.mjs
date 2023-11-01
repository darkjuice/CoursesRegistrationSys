import { mongodb } from "../utils/db.mjs";
import {course_student_db_schema} from "./schema.mjs";
import {getCourseByCrn} from "./courses.mjs";

let course_student_model = mongodb.model(
        "course_student_db",
        course_student_db_schema,
        "course_student_db"
)
const getStuAllCourse = async (stuId) => {
    return await course_student_model.find({studentid:stuId+""})
}
const getStuAgenda = async (stuId)=>{
    let courses = await getStuAllCourse(stuId);
    let agendaList = []
    let weekList = ['M', 'T', 'W', 'R', 'F', 'S', 'U']
    for (let course of courses) {
        let agenda = ["","","","","","",""]
        let days = course.days.split(",")
        for (let key of days) {
            agenda[weekList.indexOf(key)] = course.subject +"  "+ course.number +"  "+ course.section
        }
        agendaList.push(agenda)
    }
    return agendaList
}
const registerCourse = async (stuid,crn)=>{
    let course = await getCourseByCrn(crn+"")
    course = course[0]
    return await course_student_model.insertMany([{
        studentid:stuid,
        crn:crn,
        days:course.days,
        roombuild:course.roombuild,
        roomnumber:course.roomnumber,
        subject:course.subject,
        section:course.section,
        number:course.number,
        starttime:course.starttime,
        endtime:course.endtime
    }])
}
export {getStuAllCourse,getStuAgenda,registerCourse}
