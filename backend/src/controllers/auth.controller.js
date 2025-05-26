const authService = require('../services/auth.service');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await authService.signup(email, password);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await authService.login(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 