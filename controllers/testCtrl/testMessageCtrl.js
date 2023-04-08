const { responseOk } = require("../../helpers/responses");
const testMessage = require("../../services/testMessage/testMessage");

const testMessageCtrl = async (req, res, next) => {
  const { text } = req.body;
  const { id } = req.body;
  console.log(id);
  const newText = await testMessage(text);

  res.json(responseOk("Success", 201, "Text message created", newText));
};

module.exports = testMessageCtrl;
