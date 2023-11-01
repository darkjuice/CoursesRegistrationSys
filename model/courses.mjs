import {coursesSchema} from "./schema.mjs";
import {mongodb} from "../utils/db.mjs";

let coursesModel = mongodb.model(
    "courses",
    coursesSchema,
    "courses"
)
const getAllCourse = async () => {
    return await coursesModel.find()
}
const getCourseByCrn = async (crn) =>{
    return await coursesModel.find({"crn":crn})
}
export {getAllCourse,getCourseByCrn}
