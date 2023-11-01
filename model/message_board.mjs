import { mongodb } from "../utils/db.mjs";
import {message_board_Schema} from "./schema.mjs";

let message_board_model = mongodb.model(
    "message_board",
    message_board_Schema,
    "message_board"
)

const PublishInformation =  async (stuid, message,name) => {
    return await message_board_model.insertMany([
        {
            studentid:stuid,
            message:message,
            name:name
        }
    ])
}
const getAllMessage = async ()=>{
    return await message_board_model.find()
}
export {getAllMessage,PublishInformation}
