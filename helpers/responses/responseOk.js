const responseOk = (status, code, message, data, ...rest) => {
  return {
    message,
    data,
    code,
    status,
  };
};

module.exports = responseOk;
