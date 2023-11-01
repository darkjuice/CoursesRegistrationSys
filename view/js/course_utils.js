
const is_conflict = (course,otherCourse)=>{
    let courseDays = course.days.split(",")
    let otherCourseDays = otherCourse.days.split(",")
    for (let courseDay of courseDays) {
        for (let otherCourseDay of otherCourseDays) {
            if (courseDay === otherCourseDay){
                if (
                    parseInt(course.endtime <= otherCourse.starttime) ||
                    parseInt(otherCourse.endtime <= course.starttime )
                ){
                    return true

                }
                // if ( parseInt(otherCourse.starttime) >= parseInt(course.starttime) || parseInt(course.starttime) <= parseInt(otherCourse.endtime)
                //     || parseInt(otherCourse.starttime) >= parseInt(course.endtime) || parseInt(course.endtime) <= parseInt(otherCourse.endtime)) {
                // }
            }
        }
    }
    return false
}
course = {days:"M,W",starttime:"1000",endtime:"1200"}
other = {days:"M,W",starttime: "1100",endtime: "1300"}
d = "1000"

console.log(is_conflict(course,other))
