import { ReturnCopyFunc as ReturnCopyFuncFromChatLog } from "../../../../../CommonExpose/chatLog.js";

let StartFunc = ({ inSendFunc }) => {
    const localChatAsJson = ReturnCopyFuncFromChatLog();

    inSendFunc({ inMessage: { Type: 'ToFullChat', res: localChatAsJson }, inTypeJson: true });
};

export { StartFunc };