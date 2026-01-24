import { ArrowUpward } from "@mui/icons-material";
import { useSettings } from "../../hooks/useSettings";
import useWeather from "../../hooks/useWeather";
import { displayPressure, displaySpeed, displayTemperature } from "../../utils/unitUtils";
import OpacityIcon from '@mui/icons-material/Opacity';
import Speed from '@mui/icons-material/Speed';

export default function CurrentConditions() {

    const { data: weather } = useWeather();
    const currentConditions = weather?.currentConditions
    const { settings } = useSettings();

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "100%" }}>

        <div style={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
            <img src={`all/${currentConditions?.icon ?? "not-available"}.svg`} style={{ width: "50%" }} />
            <div>
                <div style={{ fontSize: "4em", fontWeight: "bold" }}>{
                    displayTemperature(currentConditions?.temperature, settings?.units)
                }</div>
                <div style={{ fontSize: "1.5em" }}> Feels like {
                    displayTemperature(currentConditions?.feelsLike, settings?.units)
                }</div>
            </div>
        </div>
        <hr style={{ width: "80%", marginBottom: "20px", marginTop: "-20px" }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: "25px" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginRight: "10px" }}>
                    <ArrowUpward style={{ transform: `rotate(${currentConditions?.wind?.direction}deg)`, scale: "1.2" }} />
                    <div style={{ fontSize: ".7em" }}>{currentConditions?.wind?.directionString}</div>
                </div>
                <div>
                    <div style={{ fontSize: "1.2em" }}>
                        {displaySpeed(currentConditions?.wind?.speed, settings?.units)}
                    </div>
                    <div style={{ fontSize: ".8em" }}>
                        Gusts of {displaySpeed(currentConditions?.wind?.gustSpeed, settings?.units)}
                    </div>
                </div>
            </div>

            <hr style={{ height: "80px" }} />

            <div style={{ fontSize: ".8em", display: 'flex', flexDirection: 'column', gap: "5px" }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                    <OpacityIcon fontSize="small" />
                    <div>{currentConditions?.humidity}% Humidity</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                    <Speed fontSize="small" />
                    <div>{displayPressure(currentConditions?.pressure, settings?.units)}</div>
                </div>
            </div>

        </div>


    </div>

}