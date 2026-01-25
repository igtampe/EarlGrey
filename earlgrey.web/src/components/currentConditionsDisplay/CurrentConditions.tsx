import { ArrowUpward } from "@mui/icons-material";
import { useSettings } from "../../hooks/useSettings";
import useWeather from "../../hooks/useWeather";
import { displayPressure, displaySpeed, displayTemperature } from "../../utils/unitUtils";
import OpacityIcon from '@mui/icons-material/Opacity';
import Speed from '@mui/icons-material/Speed';

export default function CurrentConditions({ iconStyle, fontSize, suppressSecondColumn, temperatureOrientation }: {
    iconStyle?: React.CSSProperties
    fontSize?: string,
    suppressSecondColumn?: boolean
    temperatureOrientation?: "horizontal" | "vertical"
}) {

    const { data: weather } = useWeather();
    const currentConditions = weather?.currentConditions
    const { settings } = useSettings();

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "100%" }}>

        <div style={{ backgroundColor: "rgba(51,51,51,0.7)", borderRadius: "5px", width: "80%", paddingBottom: "20px" }}>
            <div style={{ paddingTop: '10px', paddingLeft: "10px" }}>
                <b>Now</b>: {currentConditions?.description}
            </div>

            <div style={{
                display: 'flex', gap: "10px",
                alignItems: 'center', justifyContent: 'center',
                fontSize: fontSize ?? "1vh", flexDirection: temperatureOrientation === "vertical" ? "column" : undefined
            }}>
                <div>
                    <img src={`all/${currentConditions?.icon ?? "not-available"}.svg`} style={iconStyle} />
                </div>
                <div style={temperatureOrientation === "vertical" ? { textAlign: 'center', marginBottom: "1vh" } : {}}>
                    <div style={{ fontSize: "5em", fontWeight: "bold" }}>{
                        displayTemperature(currentConditions?.temperature, settings?.units)
                    }</div>
                    <div style={{ fontSize: "2em" }}> Feels like {
                        displayTemperature(currentConditions?.feelsLike, settings?.units)
                    }</div>
                </div>
            </div>
            <hr style={{ width: "80%", marginBottom: "1vh", marginTop: "-0px" }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "25px", padding: "0px 10%", fontSize: fontSize ?? "1vh" }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: suppressSecondColumn ? "2em" : "1.5em" }}>
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

                {!suppressSecondColumn && <>
                    <hr style={{ height: "80px" }} />

                    <div style={{ fontSize: "1.5em", display: 'flex', flexDirection: 'column', gap: "5px" }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                            <OpacityIcon fontSize="small" />
                            <div>{currentConditions?.humidity}% Humidity</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                            <Speed fontSize="small" />
                            <div>{displayPressure(currentConditions?.pressure, settings?.units)}</div>
                        </div>
                    </div>
                </>}

            </div>
        </div>




    </div>

}