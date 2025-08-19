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
            // User found in database - get their specific response object from mobiles.json
            console.log("Processing message for registered user:", LocalFromNumber);
            const userResponseObject = LocalNumbersData.data[LocalFromNumber];
            const response = await getResponseFromObject(msg.body, msg, userResponseObject);
            await sendResponse(response, msg);
        } else {
            // User NOT found in database - get general response object from messages.json
            console.log("Processing message for new user:", LocalFromNumber);
            try {
                const messagesPath = path.join(process.cwd(), 'Data', 'messages.json');
                const generalResponseObject = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
                const response = await getResponseFromObject(msg.body, msg, generalResponseObject);
                await sendResponse(response, msg);
            } catch (error) {
                console.error('Error reading messages.json:', error);
                await msg.reply('Sorry, there was an error processing your request.');
            }
        }
    }
};

export { StartFunc };