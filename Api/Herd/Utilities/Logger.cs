
using System;
using Serilog;

namespace Herd.Utilities
{
    static class Logger
    {
        private static ILogger logger;

        static Logger()
        {
            logger = new LoggerConfiguration()
                .WriteTo.RollingFile("log-{Date}.txt")
                .CreateLogger();
        }

        public static void LogInformation(string data)
        {
            logger.Information(data);
        }

        public static void LogInformation(Exception exception)
        {
            logger.Information("Exception: {Message}, StackTrace: {StackTrace}", exception);
        }

        public static void LogWarning(string data)
        {
            logger.Warning(data);
        }

        public static void LogWarning(Exception exception)
        {
            logger.Warning("Exception: {Message}, StackTrace: {StackTrace}", exception);
        }

        public static void LogError(string data)
        {
            logger.Error(data);
        }

        public static void LogError(Exception exception)
        {
            logger.Error("Exception: {Message}, StackTrace: {StackTrace}", exception);
        }

        public static void LogError(string message, Exception exception)
        {
            logger.Error(message + ". Exception: {Message}, StackTrace: {StackTrace}", exception);
        }
    }
}
