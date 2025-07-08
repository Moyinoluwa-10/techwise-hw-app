const urlModel = require("../models/url.models");
const validUrl = require("valid-url");
const shortid = require("shortid");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { BASE_URL } = require("../config/config");

const createUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = BASE_URL;

  if (!validUrl.isUri(baseUrl)) throw new BadRequestError("Invalid base URL");

  if (!validUrl.isWebUri(longUrl))
    throw new BadRequestError("Invalid long URL");

  const urlCode = shortid.generate();

  let url = await urlModel.findOne({
    longUrl,
  });

  if (url) return res.json({ msg: "ShortURL already created", url });
  const shortUrl = baseUrl + "/" + urlCode;

  url = new urlModel({
    urlCode,
    longUrl,
    shortUrl,
  });
  await url.save();

  return res.status(StatusCodes.CREATED).json({
    msg: "ShortURL created successfully",
    url,
  });
};

const getAllUrls = async (req, res) => {
  const urls = await urlModel.find().sort("-createdAt");
  return res.status(StatusCodes.OK).json({
    msg: "All shortURLs fetched successfully",
    urls,
    count: urls.length,
  });
};

const deleteUrl = async (req, res) => {
  const { id } = req.params;
  const url = await urlModel.findOne({ _id: id });
  if (!url) throw new BadRequestError("ShortURL not found");
  await url.remove();
  return res.status(StatusCodes.OK).json({
    msg: "ShortURL deleted successfully",
  });
};

module.exports = {
  createUrl,
  getAllUrls,
  deleteUrl,
};

