exports.listUsers = (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  res.json(users);
};
exports.userDetails = (req, res) => {
  const user = { id: 1, name: 'Alice' };
  res.json(user);
};