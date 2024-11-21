export const test = (req, res) => {
  res.json({ message: "hello from test" });
};

export const user = (req, res) => {
  res.json({ user: "test", pass: "password" });
};
