let StartFunc = (event) => {
    event.currentTarget.send("returnOnlineClients");
};

export { StartFunc };