const urlModel = require("../models/url.models");
const { StatusCodes } = require("http-status-codes");

const redirectUrl = async (req, res) => {
  const { urlCode } = req.params;
  const url = await urlModel.findOne({ urlCode });

  if (url) {
    return res.setHeader("Content-Type", "text/html").redirect(url.longUrl);
  }

  return res.status(StatusCodes.NOT_FOUND).json({
    msg: "ShortURL not found",
  });
};

module.exports = {
  redirectUrl,
};

