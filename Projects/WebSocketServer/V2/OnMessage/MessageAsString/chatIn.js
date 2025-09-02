import { ReturnCopyFunc as ReturnCopyFuncFromChatLog } from "../../../../../CommonExpose/chatLog.js";

let StartFunc = ({ inSendFunc }) => {
    const localChatAsJson = ReturnCopyFuncFromChatLog();
    // console.log("localChatAsJson : ", localChatAsJson);

    inSendFunc({ inMessage: { Type: 'ToChatIn', res: localChatAsJson }, inTypeJson: true });
};

export { StartFunc };