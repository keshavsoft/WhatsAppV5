import { ReadFunc as ReadFuncFromChatLog } from "../../../../../CommonExpose/chatLog.js";

let StartFunc = ({ inClients, inSendFunc }) => {
    let LocalArray = []
     const localChatAsJson = ReadFuncFromChatLog();
     console.log("localChatAsJson : ", localChatAsJson);

    inSendFunc({ inMessage: { Type: 'ToFullChat', res: localChatAsJson }, inTypeJson: true });
}
export { StartFunc };