namespace EarlGrey.Common.Weather {
    public class WindData {

        /// <summary>Wind speed in KM/H</summary>
        public double? Speed { get; set; }

        /// <summary>Gust speed in KM/H</summary>
        public double? GustSpeed { get; set; }

        /// <summary>Direction to where the wind is GOING in degrees</summary>
        public double? Direction { get; set; }

        /// <summary>Direction string (IE: NW, SW, N, Calm)</summary>
        public string DirectionString => WindDirection.DegreesToCompass(Direction);
    }
}
