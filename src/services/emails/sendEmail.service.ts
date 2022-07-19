import { IEmailRequest } from "../../interfaces/emails";
import { sendEmail } from "../../utils/sendEmail.util";


export const sendEmailService = async ({subject, text, to}:IEmailRequest):Promise<void>=>{
    const htmlText = `<h1>${subject}</h1><h3>${text}</h3>`
    
    await sendEmail({subject, text:htmlText, to})

}