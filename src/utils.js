const jwt = require("jsonwebtoken");

const APP_SECRET = "GraphQL-is-aw3some";

const getUserId = (context) => {
  const Authorisation = context.request.get("Authorization");
  if (Authorisation) {
    const token = Authorisation.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authorised");
};

module.exports = {
  APP_SECRET,
  getUserId,
};
