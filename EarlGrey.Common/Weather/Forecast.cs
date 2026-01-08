namespace EarlGrey.Common.Weather {
    public class Forecast {

        /// <summary>Today, Tomorrow, (Day of week)</summary>
        public string Name { get; set; }

        public ForecastTemperature Temperature { get; set; }
        public ForecastTemperature FeelsLikeTemperature { get; set; }
        public WindForecastData Wind { get; set; }
        public double ChanceOfRain { get; set; }
        public DateTime Sunrise { get; set; }
        public DateTime Sunset { get; set; }

        /// <summary>Short text description</summary>
        public string Description { get; set; }

        /// <summary>Icon to use (not the NWS one)</summary>
        public string Icon { get; set; }
    }
}
