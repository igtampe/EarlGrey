using System.Text.Json.Serialization;

namespace OpenMeteo.Common {
    public class OpenMeteoCurrent {
        public DateTime Time { get; set; }
        public int Interval { get; set; }

        [JsonPropertyName("temperature_2m")]
        public double Temperature2m { get; set; }

        [JsonPropertyName("relative_humidity_2m")]
        public int RelativeHumidity2m { get; set; }

        [JsonPropertyName("apparent_temperature")]
        public double ApparentTemperature { get; set; }

        [JsonPropertyName("is_day")]
        public int IsDay { get; set; }

        public double Precipitation { get; set; }
        public double Rain { get; set; }
        public double Showers { get; set; }
        public double Snowfall { get; set; }

        [JsonPropertyName("weather_code")]
        public int WeatherCode { get; set; }

        [JsonPropertyName("surface_pressure")]
        public double SurfacePressure { get; set; }

        [JsonPropertyName("wind_speed_10m")]
        public double WindSpeed10m { get; set; }

        [JsonPropertyName("wind_direction_10m")]
        public int WindDirection10m { get; set; }

        [JsonPropertyName("wind_gusts_10m")]
        public double WindGusts10m { get; set; }
    }

}
