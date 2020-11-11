const logger = (req, res, next) => {
  console.log(
    `incoming request: ${req.protocol}:${req.get("host")}${
      req.url
    } ${new Date()}`
  );
  next();
};

module.exports = logger;
