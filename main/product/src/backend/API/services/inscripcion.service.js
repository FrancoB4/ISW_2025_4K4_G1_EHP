const users = [];

exports.getAll = () => users;

exports.create = (user) => {
  users.push(user);
  return user;
};