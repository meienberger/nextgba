import { createLogger, transports } from "winston";

export const appLogger = createLogger({
  level: "debug",
  transports: [
    new transports.Console({
      level: "debug",
    }),
    new transports.File({
      filename: "app.log",
    }),
  ],
});
