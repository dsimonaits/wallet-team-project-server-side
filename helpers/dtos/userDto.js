const userDto = (user) => {
  return {
    email: user.email,
    _id: user._id,
    isActivated: user.isActivated,
    name: user.name,
  };
};

module.exports = userDto;
