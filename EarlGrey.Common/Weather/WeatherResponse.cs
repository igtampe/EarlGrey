namespace EarlGrey.Common.Weather {
    public class WeatherResponse {

        public CurrentConditions CurrentConditions { get; set; }
        public List<Forecast> Forecast { get; set; }

        /// <summary>Last time this information was updated</summary>
        public DateTime LastUpdate { get; set; }

        /// <summary>When this response was fetched on</summary>
        public DateTime FetchedOn { get; set; }

    }
}
