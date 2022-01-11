// const res = require("express/lib/response");

const successResponse = (
  res,
  message = "",
  statusCode = 200,
  data = {},
  meta = {}
) => {
  return res.status(statusCode).json({
    message: message,
    statusCode: statusCode,
    data: data,
    meta: meta ?? meta,
  });
};

const errorResponse = (res, message = "", statusCode = 500, data = {}) => {
  return res.status(statusCode).json({
    message: message,
    statusCode: statusCode,
    data: data ?? data,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
