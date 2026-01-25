using TimeZoneConverter;

namespace EarlGrey.API.Utils {
    public static class Utils {

        public static DateTime ConvertToUtc(DateTime dt, string IanaTimezone) { 
            var windowsId = TZConvert.IanaToWindows(IanaTimezone);
            var tz = TimeZoneInfo.FindSystemTimeZoneById(windowsId);
            return TimeZoneInfo.ConvertTimeToUtc(dt, tz);
        }

        public static DateTime AsUtc(DateTime dt) =>
    dt.Kind == DateTimeKind.Unspecified
        ? DateTime.SpecifyKind(dt, DateTimeKind.Utc)
        : dt.ToUniversalTime();
    }
}
