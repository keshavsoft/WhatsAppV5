let StartFunc = (inValue) => {
  // console.log("inValue : ", inValue);
  jFLocalToInputUserNameId(inValue);
};

let jFLocalToInputUserNameId = (inValue) => {
  let jVarLocalHtmlId = "UserNameId";
  let jVarLocalUserNameId = document.getElementById(jVarLocalHtmlId);

  if ((jVarLocalUserNameId === null) === false) {
    jVarLocalUserNameId.innerHTML = inValue;
  }
};

export { StartFunc };
