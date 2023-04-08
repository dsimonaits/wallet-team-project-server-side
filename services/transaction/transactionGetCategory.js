const { CategorySchema } = require("../../models/transaction");

const transactionGetCategory = async () => {
  const category = await CategorySchema.exists();
  if (!category) {
    const newCategory = new CategorySchema();
    return await newCategory.save();
  }
  return await CategorySchema.findById({ _id: category._id });
};

module.exports = transactionGetCategory;
