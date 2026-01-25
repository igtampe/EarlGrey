namespace OpenMeteo.Common {
    public class OpenMeteoResponse {
        
        public string Timezone { get; set; } = "";

        public OpenMeteoCurrent Current { get; set; } = default!;
        public OpenMeteoDaily Daily { get; set; } = default!;
    }

}
