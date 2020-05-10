const links = ({ id }, _, context) => context.prisma.user({ id }).links();

module.exports = {
  links,
};
