const postedBy = ({ id }, _, context) => context.prisma.link({ id }).postedBy();

module.exports = {
  postedBy,
};
