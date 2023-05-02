const winston = require("winston");
// const fs=require('fs');

const { createLogger, format, transports } = require("winston");

const { combine, timestamp, label, printf } = format;

// const logDir='/home/gopal/Desktop/Semester_2/SPE/MajorProject/Spe-Mtech-Blog-Application/logs';

// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${label} ${level}: ${message}`;
});



const logger = createLogger({
  format: combine(label({ label: "" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new winston.transports.File({
      filename: "/usr/src/app/logs/BlogLog.log",
      // filename: `${logDir}/Blog-log.log`,
      level: "info",
    }),
  ],
});

module.exports = logger;