const sendToken = (user, successCode, res) => {
    const token = user.getJWToken();

    const options = {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res.status(successCode)
      .cookie("token", token, options)
      .json({
        success: false,  
        user,
        token,
      });
};

module.exports = sendToken;
