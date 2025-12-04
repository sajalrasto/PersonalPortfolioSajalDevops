// Logger utility - Only logs in development mode
const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    // Always log errors, but could be sent to error tracking service in production
    if (isDevelopment) {
      console.error(...args);
    }
    // In production, you could send to error tracking service
    // Example: Sentry.captureException(args[0]);
  },
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
};
