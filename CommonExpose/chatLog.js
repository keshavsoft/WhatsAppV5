const CommonChatLog = [];

const ReadFunc = () => {
    return CommonChatLog;
};

const InsertFunc = (inObjectToInsert) => {
    CommonChatLog.push(inObjectToInsert);
    console.log("aaaaaaaaa : ", inObjectToInsert);

    return true;
};

export { ReadFunc, InsertFunc };