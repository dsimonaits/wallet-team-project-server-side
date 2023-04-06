const Test = require("../../models/testModel");

const testMessage = async (text) => {
  const newMessage = await Test.create({ text });
  return newMessage;
};

module.exports = testMessage;
