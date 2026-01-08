namespace EarlGrey.Common.Weather {
    public class CurrentConditions {

        
        /// <summary>Temperature in Celsius</summary>
        public double Temperature { get; set; }

        /// <summary>FeelsLike (Either Wind Chill or Heat Index temperature in Celsius</summary>
        public double? FeelsLike { get; set; }

        /// <summary>Wind data</summary>
        public WindData Wind { get; set; }

        /// <summary>Barometric pressure in hPA</summary>
        public double Pressure { get; set;  }

        /// <summary>Humidity as a percent (0-100)</summary>
        public double Humidity { get; set; }

        /// <summary>Timestamp of this observation</summary>
        public DateTime Timestamp { get; set; }

        /// <summary>Short text description</summary>
        public string Description { get; set; }

        /// <summary>Icon to use (not the NWS one)</summary>
        public string Icon { get; set; }


    }
}
