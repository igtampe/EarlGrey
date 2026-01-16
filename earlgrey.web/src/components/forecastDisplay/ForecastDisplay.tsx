import useWeather from "../../hooks/useWeather"
import type Forecast from "../../model/weather/Forecast";
import { useSettings } from "../../hooks/useSettings";
import { displaySpeed, displayTemperature } from "../../utils/unitUtils";
import AirIcon from '@mui/icons-material/Air';
import SunnyIcon from '@mui/icons-material/Sunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';


export default function ForecastDisplay() {

    const { data: weather } = useWeather();

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "100%", gap: "10px" }}>
        {weather?.forecast?.map(a => <ForecastRow forecast={a} />)}
    </div>

}

function ForecastRow({ forecast }: { forecast: Forecast }) {

    const { settings } = useSettings();

    return <div style={{ backgroundColor: "#333", borderRadius: "5px", width: "80%" }}>
        <div style={{ paddingTop: '10px', paddingLeft: "10px" }}>
            <b>{forecast.name}</b>: {forecast.description}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
            <img src={`/all/${forecast.icon}.svg`} style={{ width: "15%", }} />
            <div>
                <div style={{ fontSize: "1.2em" }}>
                    {
                        displayTemperature(forecast?.temperature?.high, settings?.units)
                    } / {
                        displayTemperature(forecast?.temperature?.low, settings?.units)
                    }
                </div>
                <div style={{ fontSize: ".8em" }}>
                    {
                        displayTemperature(forecast?.feelsLikeTemperature?.high, settings?.units)
                    } / {
                        displayTemperature(forecast?.feelsLikeTemperature?.low, settings?.units)
                    }
                </div>
            </div>
            <div style={{ height: "50px", backgroundColor: "white", width: "2px" }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginRight: "10px" }}>
                    <AirIcon />
                    <div style={{ fontSize: ".7em" }}>{forecast?.wind?.directionString}</div>
                </div>
                <div>
                    <div style={{ fontSize: "1.2em" }}>
                        {displaySpeed(forecast?.wind?.minSpeed, settings?.units)}
                    </div>
                    <div style={{ fontSize: ".8em" }}>
                        Up to {displaySpeed(forecast?.wind?.maxSpeed, settings?.units)}
                    </div>
                </div>
            </div>
            <div style={{ height: "50px", backgroundColor: "white", width: "2px" }} />
            <div style={{ fontSize: ".8em", display: 'flex', flexDirection: 'column', gap: "5px" }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                    <WaterDropIcon fontSize="small" />
                    <div>{forecast?.chanceOfRain}%</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                    <SunnyIcon fontSize="small" />
                    <div>{forecast?.uvIndex} UV</div>
                </div>
            </div>
            <div style={{ flex: '1' }} />
        </div>
    </div>

}

