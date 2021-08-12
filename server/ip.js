var fs = require("fs");
module.exports = {
  logger: function(req, res, next) {
    const user_ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null); // ::1
    if(user_ip.indexOf('::') == 0) {next(); return;};
    const req_page = req.originalUrl; // /
    const date = new Date(); //2019-10-10T18:35:21.967Z

    const log = `------------------------------------------------------------------------------------------------------\n[${date}]:  |  Ip=${user_ip}  |  Req_page=${req_page}\n------------------------------------------------------------------------------------------------------\n`;

    fs.appendFile("logs.txt", log, err => {
      if (err) throw err;
    });

    next();
  }
};