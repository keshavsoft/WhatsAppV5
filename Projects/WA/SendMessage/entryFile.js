import { JSONFilePreset } from 'lowdb/node'

import { StartFunc as StartFuncFromIfInMobiles } from "./ifInMobiles.js";
import { StartFunc as StartFuncFromIfNotInMobiles } from "./ifNotInMobiles.js";
import { StartFunc as StartFuncFromInsertToFile } from "../insertToFile.js";
import { CheckLastEntry, InsertFunc as InsertFuncFromForWA } from "../../../CommonExpose/forWA.js";
import { getResponseFromObject, sendResponse } from "./responeGetter.js";
import fs from 'fs';
import path from 'path';

const StartFunc = async msg => {
    const defaultData = [];
    const LocalFromNumber = msg.from;
    const timestamp = msg.timestamp;

    await StartFuncFromInsertToFile({
        inFrom: LocalFromNumber,
        inMessage: msg.body,
        inTimeStamp: timestamp
    });

    const LocalTimeLapseTF = CheckLastEntry();

    if (LocalTimeLapseTF) {
        InsertFuncFromForWA({ inValueToInsert: msg.body });

        const LocalNumbersData = await JSONFilePreset('Data/mobiles.json', defaultData);
        console.log("LocalFromNumber : ", LocalFromNumber);
        
        if (LocalFromNumber in LocalNumbersData.data) {
        // User found in database
            
            const userData = LocalNumbersData.data[LocalFromNumber];
            
            // Check if userData is an object with categories or just a simple string
            if (typeof userData === 'object' && userData !== null && 
                (userData.responses || userData.media || userData.customMessages || 
                 userData.interactive || userData.templates)) {
                
                // UserData has object structure with categories - use normal flow
                console.log("User data has object structure, processing with categories");
                const response = await getResponseFromObject(msg.body, msg, userData);
                await sendResponse(response, msg);
                
            } else if (typeof userData === 'string') {
                
                // UserData is just a simple string - send response directly
                console.log("User data is simple string, sending directly");
                await msg.reply(userData);
                
            } else {
                
                // UserData is neither object nor string - send default message
                console.log("User data format not recognized, sending default message");
                await msg.reply("Welcome! You are a registered user.");
            }
            
        } else {
            // User NOT found in database - get general response object from messages.json
            console.log("Processing message for new user:", LocalFromNumber);
            try {
                const messagesPath = path.join(process.cwd(), 'Data', 'messages.json');
                const generalResponseObject = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
                const response = await getResponseFromObject(msg.body, msg, generalResponseObject);
                await sendResponse(response, msg);
            } catch (error) {
                await msg.reply('Sorry, there was an error processing your request.');
            }
        }
    }
};

export { StartFunc };
