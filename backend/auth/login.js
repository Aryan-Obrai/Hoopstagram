function login(req, res) {
  try {
    console.log("LOGIN");
    console.log(req.body);
    res.status(201).json({
      success: true,
      redirectURL: "/feed",
      user: { username: "User 1" },
    });
  } catch (error) {
    console.error("LOGIN ERROR");
  }
}

module.exports = { login };
