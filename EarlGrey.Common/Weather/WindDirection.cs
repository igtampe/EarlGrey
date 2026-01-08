using System;
using System.Collections.Generic;
using System.Text;

namespace EarlGrey.Common.Weather {
    public static class WindDirection {
        private static readonly string[] Directions =
    [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ];

        /// <summary>
        /// Converts a wind direction in degrees to a compass string (e.g., "NW").
        /// </summary>
        /// <param name="degrees">Wind direction in degrees (0-360).</param>
        /// <returns>Compass direction string.</returns>
        public static string DegreesToCompass(double? degrees) {
            if (degrees == null)
                return "Calm";

            // Normalize to 0-360
            double deg = degrees.Value % 360;
            if (deg < 0) deg += 360;

            // Each sector is 360/16 = 22.5°
            int index = (int)((deg + 11.25) / 22.5) % 16;
            return Directions[index];
        }
    }
}
