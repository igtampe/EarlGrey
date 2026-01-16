namespace EarlGrey.API.Utils {
    public static class Utils {
        public static DateTime AsUtc(DateTime dt) =>
    dt.Kind == DateTimeKind.Unspecified
        ? DateTime.SpecifyKind(dt, DateTimeKind.Utc)
        : dt.ToUniversalTime();
    }
}
