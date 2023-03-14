const signIn = require("./signIn");
const register = require("./signUp");
const logout = require("./logout");
const current = require("./current");
const updateSubscriptionStatus = require("./updateSubscriptionStatus");
const updateAvatar = require("./updateAvatar");

module.exports = {
  signIn,
  register,
  logout,
  current,
  updateSubscriptionStatus,
  updateAvatar,
};
