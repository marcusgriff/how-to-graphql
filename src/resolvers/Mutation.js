const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const signup = async (_, args, context) => {
  const hashedPassword = await bcrypt.hash(args.password, 10);

  const { password, ...user } = await context.prisma.createUser({
    ...args,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (_, args, context) => {
  const { password, user } = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(args.password, password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userID: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const post = (parent, { url, description }, context, info) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: userId } },
  });
};

module.exports = {
  signup,
  login,
  post,
};
