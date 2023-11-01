import { SMTPClient } from 'emailjs';
const fromName= "reset password"
const client = new SMTPClient({
    // email adrress of the sender
    user: '605461622@qq.com',
    // an authorization code, not the password of sender's email account
    // password: 'vpziutxhpvmytroi',
    password: 'pwyvsoxkwybebffb',
    host: 'smtp.qq.com',
    ssl: true,
});

//
/**
 *
 * @author bonan yin
 * @param msg content
 * @param toName  receiver's name
 * @param toEmail  receiver's email address
 * @param subject
 */
const sendCaptchaEmail = (msg,toName,toEmail,subject)=>{
    client.send(
        {
            //content of the email
            text: msg + 'please enter the code in 1 minutes',

            from: fromName + ' <605461622@qq.com>',

            to: toName+'<'+toEmail+'>',

            subject: subject,
        },
        // print the error or success message
        (err, message) => {
            console.log(err || message);
        }
    );

}
export {sendCaptchaEmail};
