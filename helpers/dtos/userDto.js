const userDto = (user) => {
  return {
    email: user.email,
    _id: user._id,
    isActivated: user.isActivated,
    name: user.name,
    balance: user.balance,
    createdAt: user.createdAt,
  };
};

module.exports = userDto;
