import ActionsPanel from "./actionsPanel/ActionsPanel";
import Clock from "./clock/Clock";
import CurrentConditions from "./currentConditionsDisplay/CurrentConditions";
import ForecastDisplay from "./forecastDisplay/ForecastDisplay";

export default function Display() {
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