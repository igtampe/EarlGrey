import { useSettings } from "../hooks/useSettings";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import ActionsPanel from "./actionsPanel/ActionsPanel";
import Calendar from "./calendar/Calendar";
import Clock from "./clock/Clock";
import CurrentConditions from "./currentConditionsDisplay/CurrentConditions";
import ForecastDisplay from "./forecastDisplay/ForecastDisplay";

export default function Display() {

    const { settings } = useSettings();
    const { width } = useWindowDimensions();

    switch (settings.layout) {
        case "SQUARE":

            return <div style={{ width: "100%", height: "100vh", padding: "5vh 5vw", display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <div style={{ width: "100%", height: "45%", display: "flex" }}>
                    <div style={{ flex: 1, flexShrink: 0, borderRight: "1px solid white" }}>
                        <Clock height="25vh" width="25vh" suppressDate />
                    </div>
                    <div style={{ flex: 1, borderLeft: "1px solid white" }}>
                        <Calendar />
                    </div>


                </div>

                <hr style={{ width: "90%" }} />

                <div style={{ width: "100%", height: "45%", display: "flex" }}>
                    <div style={{ flex: 1, borderRight: "1px solid white", fontSize: ".8em" }}>
                        <CurrentConditions />
                    </div>
                    <div style={{ flex: 1, borderLeft: "1px solid white", fontSize: ".8em" }}>
                        <ForecastDisplay forecastIconStyle={{ height: "7vh" }} suppressThirdColumn={width < 1280} suppressSecondColumn={width < 650} />
                    </div>

                </div>

                <ActionsPanel />

            </div>
        case "VERTICAL":

            return <div style={{ width: "100%", height: "100vh", padding: "2vh 10vw", display: "flex", flexDirection: 'column' }}>
                <div style={{ height: "33.33333333333%", flexShrink: 0, borderBottom: "1px solid white" }}>
                    <Clock width="50vw" height="50vw" />
                </div>
                <div style={{ flex: 1, borderTop: "1px solid white", borderBottom: "1px solid white" }}>
                    <CurrentConditions />
                </div>
                <div style={{ height: "33.33333333333%", borderTop: "1px solid white" }}>
                    <ForecastDisplay forecastIconStyle={{ height: "5vh" }} suppressThirdColumn={width < 800} suppressSecondColumn={width < 650} />
                </div>
                <ActionsPanel />

            </div>

            break;

        case "HORIZONTAL":
        default:
            return <div style={{ width: "100%", height: "100vh", padding: "10vh 0%", display: "flex" }}>
                <div style={{ width: "33.33333333333%", flexShrink: 0, borderRight: "1px solid white" }}>
                    <Clock />
                </div>
                <div style={{ flex: 1, borderLeft: "1px solid white", borderRight: "1px solid white" }}>
                    <CurrentConditions />
                </div>
                <div style={{ width: "33.33333333333%", borderLeft: "1px solid white" }}>
                    <ForecastDisplay />
                </div>

                <ActionsPanel />

            </div>
    }


}