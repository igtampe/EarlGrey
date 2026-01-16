using EarlGrey.API.Services;
using EarlGrey.API.Utils;
using Microsoft.AspNetCore.Mvc;

namespace EarlGrey.API.Controllers {
    [ApiController]
    [Route("api/weather")]
    public class WeatherController : ControllerBase {

        private OpenMeteoService openMeteoService;
        public WeatherController() {
            openMeteoService = new(
                double.Parse(new EnvironmentKey("EARLGREY_LAT").ToString()),
                double.Parse(new EnvironmentKey("EARLGREY_LON").ToString())
            );
        }

        [HttpGet]
        public async Task<IActionResult> Get() {
            return Ok(OpenMeteoToEarlGrey.Convert(await openMeteoService.GetWeatherAsync()));
        }
    }
}
