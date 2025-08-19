import { getResponseFromObject, sendResponse } from "./responeGetter.js";
import fs from 'fs';
import path from 'path';

const StartFunc = async msg => {
    const messageBody = msg.body;
    
    try {
        // Read messages.json and pass the entire object to getResponseFromObject
        const messagesPath = path.join(process.cwd(), 'Data', 'messages.json');
        const generalResponseObject = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
        
        // Get response from the general response object
        const response = await getResponseFromObject(messageBody, msg, generalResponseObject);
        
        // Send the response
        await sendResponse(response, msg);
    } catch (error) {
        console.error('Error reading messages.json:', error);
        await msg.reply('Sorry, there was an error processing your request.');
    }
};

export { StartFunc };