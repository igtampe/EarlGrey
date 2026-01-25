using EarlGrey.Common.Weather;
using OpenMeteo.Common;

using static EarlGrey.API.Utils.Utils;

namespace EarlGrey.API.Utils {
    public static class OpenMeteoToEarlGrey {

        private class OpenMeteoWMOCodeMapping {

            public string DayIcon { get; set; } = "";
            public string NightIcon { get; set; } = "";
            public string Description { get; set; } = "";
        };

        private static readonly Dictionary<int, OpenMeteoWMOCodeMapping> CodeMappings = new() {
            {0,new(){Description="Clear", DayIcon="clear-day", NightIcon="clear-night" } },

            {1,new(){Description="Mainly clear",  DayIcon="clear-day", NightIcon="clear-night" } },
            {2,new(){Description = "Partly cloudy", DayIcon="partly-cloudy-day", NightIcon="partly-cloudy-night" } },
            {3,new(){Description = "Overcast", DayIcon = "overcast-day", NightIcon = "overcast-night"} },

            {45,new(){Description = "Fog", DayIcon = "fog-day", NightIcon = "fog-night"} },
            {48,new(){Description = "Rime fog", DayIcon="haze-day", NightIcon="haze-night"} },

            {51,new(){Description = "Light drizzle", DayIcon = "partly-cloudy-day-drizzle", NightIcon = "partly-cloudy-night-drizzle"} },
            {53,new(){Description = "Drizzle", DayIcon = "partly-cloudy-day-drizzle", NightIcon = "partly-cloudy-night-drizzle"} },
            {55,new(){Description = "Dense drizzle", DayIcon = "drizzle", NightIcon = "drizzle"} },

            {56,new(){Description = "Light freezing drizzle", DayIcon="partly-cloudy-day-sleet", NightIcon="partly-cloudy-night-sleet"} },
            {57,new(){Description = "Dense freezing drizzle", DayIcon="sleet", NightIcon="sleet"} },

            {61,new(){Description = "Light rain", DayIcon = "partly-cloudy-day-drizzle", NightIcon = "partly-cloudy-night-drizzle"} },
            {63,new(){Description = "Rain", DayIcon="partly-cloudy-day-rain", NightIcon="partly-cloudy-night-rain"} },
            {65,new(){Description = "Heavy rain",DayIcon="rain",NightIcon="rain"} },

            {66,new(){Description = "Light freezing rain", DayIcon="partly-cloudy-day-sleet", NightIcon="partly-cloudy-night-sleet"} },
            {67,new(){Description = "Heavy freezing rain", DayIcon="sleet", NightIcon="sleet"} },

            {71,new(){Description = "Light snow", DayIcon="partly-cloudy-day-snow",NightIcon="partly-cloudy-night-snow"} },
            {73,new(){Description = "Snow", DayIcon="partly-cloudy-day-snow",NightIcon="partly-cloudy-night-snow"} },
            {75,new(){Description = "Heavy snow", DayIcon="snow", NightIcon="snow"} },

            {77,new(){Description = "Snow grains", DayIcon="snow", NightIcon="snow"} },

            {80,new(){Description = "Light rain showers", DayIcon = "partly-cloudy-day-drizzle", NightIcon = "partly-cloudy-night-drizzle"} },
            {81,new(){Description = "Rain showers", DayIcon="partly-cloudy-day-rain", NightIcon="partly-cloudy-night-rain"} },
            {82,new(){Description = "Heavy rain showers",DayIcon="rain",NightIcon="rain" } },

            {85,new(){Description = "Light snow showers", DayIcon = "partly-cloudy-day-snow", NightIcon = "partly-cloudy-night-snow"} },
            {86,new(){Description = "Heavy snow showers", DayIcon="snow", NightIcon="snow"} },

            {95,new(){Description = "Thunderstorms", DayIcon = "thunderstorms-day", NightIcon = "thunderstorms-night"} },

            {96,new(){Description = "Thunderstorm with slgiht hail", DayIcon="thunderstorms", NightIcon="thunderstorms"} },
            {99,new(){Description = "Thunderrstorm with moderate hail", DayIcon="thunderstorms", NightIcon="thunderstorms"  } },
        };

        private static OpenMeteoWMOCodeMapping CodeToMapping(int code, double rain, double snow) {
            var mapping = CodeMappings[code];
            if (code >= 95) {
                if (snow > 0 && snow > rain) {
                    mapping.DayIcon += "-snow";
                    mapping.NightIcon += "-snow";
                }
                else if (rain > 0) {
                    mapping.DayIcon += "-rain";
                    mapping.NightIcon += "-rain";
                }
            }
            return mapping;
        }

        public static WeatherResponse Convert(OpenMeteoResponse response) {

            var current = response.Current;
            var currentWmo = CodeToMapping(current.WeatherCode, current.Rain + current.Showers, current.Snowfall);

            var daily = response.Daily;
            List<OpenMeteoWMOCodeMapping> dailyMappings = [
                CodeToMapping(daily.WeatherCode[0],daily.RainSum[0] + daily.ShowerSum[0], daily.SnowfallSum[0]),
                CodeToMapping(daily.WeatherCode[1],daily.RainSum[1] + daily.ShowerSum[1], daily.SnowfallSum[1]),
                CodeToMapping(daily.WeatherCode[2],daily.RainSum[2] + daily.ShowerSum[2], daily.SnowfallSum[2])
                ];

            return new() {
                FetchedOn = DateTime.Now,
                LastUpdate = ConvertToUtc(current.Time,response.Timezone),
                CurrentConditions = new(){
                    FeelsLike=current.ApparentTemperature,
                    Humidity=current.RelativeHumidity2m,
                    Pressure=current.SurfacePressure,
                    Temperature=current.Temperature2m,
                    Timestamp=ConvertToUtc(current.Time,response.Timezone),
                    Wind=new(){
                        Direction=(current.WindDirection10m + 180) % 360,
                        GustSpeed= current.WindGusts10m,
                        Speed = current.WindSpeed10m
                    },
                    Description= currentWmo.Description,
                    Icon=current.IsDay > 0 ? currentWmo.DayIcon : currentWmo.NightIcon
                },
                Forecast = [.. new List<int>([0, 1, 2]).Select(index => new Forecast() {
                    Name= index== 0
                        ? current.IsDay == 0 && DateTime.Now > ConvertToUtc(daily.Sunset[0],response.Timezone)
                            ? "Tonight"
                            : "Today"
                        : index==1
                            ? "Tomorrow"
                            : daily.Time[index].DayOfWeek.ToString(),

                    Sunrise = ConvertToUtc(daily.Sunrise[index],response.Timezone),
                    Sunset = ConvertToUtc(daily.Sunset[index],response.Timezone),

                    ChanceOfRain=daily.PrecipitationProbabilityMax[index],
                    UvIndex = daily.UvIndex[index],

                    Description= dailyMappings[index].Description,
                    Icon= index==0 && current.IsDay==0
                        ? dailyMappings[index].NightIcon
                        : dailyMappings[index].DayIcon,

                    Temperature=new(){
                        High=daily.TemperatureMax[index],
                        Low=daily.TemperatureMin[index]
                    },

                    FeelsLikeTemperature=new(){
                        High=daily.ApparentTemperatureMax[index],
                        Low=daily.ApparentTemperatureMin[index]
                    },

                    Wind = new(){
                        Direction=(daily.WindDirectionDominant[index] + 180) %360,
                        MaxSpeed=daily.WindSpeedMax[index],
                        MinSpeed=daily.WindSpeedMin[index]
                    }

                })]

            };
        
        }

    }
}
