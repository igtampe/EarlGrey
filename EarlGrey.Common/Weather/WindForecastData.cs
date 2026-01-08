namespace EarlGrey.Common.Weather {
    public class WindForecastData {


        /// <summary>Wind speed minimum in KM/H</summary>
        public double? MinSpeed { get; set; }

        /// <summary>Wind speed maximum in KM/H</summary>
        public double? MaxSpeed { get; set; }

        /// <summary>Direction to where the wind is GOING in degrees</summary>
        public double? Direction { get; set; }

        /// <summary>Direction string (IE: NW, SW, N, Calm)</summary>
        public string DirectionString => WindDirection.DegreesToCompass(Direction);
    }
}
