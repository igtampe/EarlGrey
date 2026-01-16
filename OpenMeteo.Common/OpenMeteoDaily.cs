using System.Text.Json.Serialization;

namespace OpenMeteo.Common {
    public class OpenMeteoDaily {
        public List<DateOnly> Time { get; set; } = [];

        [JsonPropertyName("weather_code")]
        public List<int> WeatherCode { get; set; } = [];

        [JsonPropertyName("temperature_2m_max")]
        public List<double> TemperatureMax { get; set; } = [];

        [JsonPropertyName("temperature_2m_min")]
        public List<double> TemperatureMin { get; set; } = [];

        [JsonPropertyName("apparent_temperature_max")]
        public List<double> ApparentTemperatureMax { get; set; } = [];

        [JsonPropertyName("apparent_temperature_min")]
        public List<double> ApparentTemperatureMin { get; set; } = [];

        public List<DateTime> Sunrise { get; set; } = [];
        public List<DateTime> Sunset { get; set; } = [];

        [JsonPropertyName("wind_speed_10m_max")]
        public List<double> WindSpeedMax { get; set; } = [];

        [JsonPropertyName("wind_speed_10m_min")]
        public List<double> WindSpeedMin { get; set; } = [];

        [JsonPropertyName("wind_direction_10m_dominant")]
        public List<int> WindDirectionDominant { get; set; } = [];

        [JsonPropertyName("precipitation_probability_max")]
        public List<int> PrecipitationProbabilityMax { get; set; } = [];

        [JsonPropertyName("rain_sum")]
        public List<double> RainSum { get; set; } = [];
        [JsonPropertyName("showers_sum")]
        public List<double> ShowerSum { get; set; } = [];
        [JsonPropertyName("snowfall_sum")]
        public List<double> SnowfallSum { get; set; } = [];

        [JsonPropertyName("uv_index_max")]
        public List<double> UvIndex { get; set; } = [];
    }

}
