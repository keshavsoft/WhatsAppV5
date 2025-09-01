const CommonChatLog = [];

const ReadFunc = () => {
    return CommonChatLog;
};

const ReturnCopyFunc = () => {
    return [...CommonChatLog];
};

const InsertFunc = (inObjectToInsert) => {
    CommonChatLog.push(inObjectToInsert);

    return true;
};

export { ReadFunc, InsertFunc, ReturnCopyFunc };