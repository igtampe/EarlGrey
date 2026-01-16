using Microsoft.Extensions.Caching.Memory;
using OpenMeteo.Common;
using System.Globalization;
using System.Text.Json;

namespace EarlGrey.API.Services {
    public class OpenMeteoService(double Lattitude, double Longitude) {

        private static readonly MemoryCache Cache = new(new MemoryCacheOptions());
        private const string CacheKey = "weather:current";
        private static readonly JsonSerializerOptions JsonSerializerOptions = new() {
            PropertyNameCaseInsensitive = true,
            ReadCommentHandling = JsonCommentHandling.Skip,
            AllowTrailingCommas = true
        };

        public async Task<OpenMeteoResponse> GetWeatherAsync() {
            if (Cache.TryGetValue(CacheKey, out OpenMeteoResponse? cached)) {
                if(cached != null) return cached;
            }

        
            var client = new HttpClient();
            var weatherString = await client.GetStringAsync(
                $"https://api.open-meteo.com/v1/forecast?" +
                $"latitude={Lattitude}&longitude={Longitude}" +
                $"&daily=" +
                    $"weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max," +
                    $"apparent_temperature_min,sunrise,sunset,wind_speed_10m_max,wind_direction_10m_dominant," +
                    $"precipitation_probability_max,rain_sum,showers_sum,snowfall_sum,wind_speed_10m_min,uv_index_max" +
                $"&current=" +
                    $"temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers," +
                    $"snowfall,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m" +
                $"&forecast_days=3"
            );

            var weather = JsonSerializer.Deserialize<OpenMeteoResponse>(weatherString, JsonSerializerOptions) 
                ?? throw new InvalidOperationException("Uh....");
            
            var observationTime = DateTimeOffset.Parse(
                weather.Current.Time + "",
                CultureInfo.InvariantCulture,
                DateTimeStyles.AssumeUniversal
            );

            var interval = TimeSpan.FromSeconds(weather.Current.Interval);
            var wiggleRoom = TimeSpan.FromSeconds(60);

            var absoluteExpiration =
                observationTime + interval + wiggleRoom;

            Cache.Set(
                CacheKey,
                weather,
                new MemoryCacheEntryOptions {
                    AbsoluteExpiration = absoluteExpiration
                }
            );

            return weather;
        }


    }
}
