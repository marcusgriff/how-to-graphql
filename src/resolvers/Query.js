const feed = (_, __, context, ___) => context.prisma.links();

module.exports = { feed };
