const apiSuccessRes = (
  res,
  message,
  result,
  code,
  error,
  token,
  refreshToken,
  expireTime
) => {
  return res.status(code).json({
    IsSuccess: true,
    ResponseStatusCode: code,
    Message: message,
    Result: result,
    Error: error,
    Token: token,
    RefreshToken: refreshToken,
    ExpireTime: expireTime,
  });
};
const apiErrorRes = (res, message, code, error) => {
  return res.status(code).json({
    IsSuccess: false,
    ResponseStatusCode: code,
    Message: message,
    Error: error,
  });
};

module.exports = { apiSuccessRes, apiErrorRes };
