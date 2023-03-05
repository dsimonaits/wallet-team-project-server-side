const responseOk = (status, code, message, data, ...rest) => {
  return {
    status,
    code,
    ResponseBody: { message, data, ...rest },
  };
};

module.exports = responseOk;
