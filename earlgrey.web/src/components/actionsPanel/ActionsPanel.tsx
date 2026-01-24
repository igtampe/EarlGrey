import { Card, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import useWeather from "../../hooks/useWeather";
import { ViewColumn, Window } from "@mui/icons-material";

export default function ActionsPanel() {

    const [hovered, setHovered] = useState(false)
    const { setSettings, settings } = useSettings();
    const { refresh } = useWeather();

    const onLayoutChange = () => {
        switch (settings.layout) {
            case "SQUARE":
                setSettings({ ...settings, layout: "HORIZONTAL" })
                break;
            case "VERTICAL":
                setSettings({ ...settings, layout: "SQUARE" })
                break;
            case "HORIZONTAL":
            default:
                setSettings({ ...settings, layout: "VERTICAL" })
                break;
        }
    }


    return <Card
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{
            position: "absolute", bottom: "10px", right: "10px", padding: "5px", display: 'flex', gap: "10px",
            opacity: hovered ? "0.8" : "0.3"
        }}
    >

        <Tooltip title={"Change layout"}>
            <IconButton size="small" onClick={onLayoutChange}>
                {settings.layout === "SQUARE"
                    ? <Window fontSize="small" />
                    : <ViewColumn fontSize="small" style={
                        settings.layout === "VERTICAL"
                            ? { transform: "rotate(90deg)" }
                            : undefined
                    } />}
            </IconButton>
        </Tooltip>

        <Tooltip title={`Switch to ${settings?.units === "imperial" ? "metric" : "imperial"} units`}>
            <IconButton size="small" onClick={() => {
                setSettings({ ...settings, units: settings?.units === "imperial" ? "metric" : "imperial" })
            }}>
                <div style={{ fontSize: ".8em" }}>{settings?.units === "imperial" ? "F" : "C"}°</div>
            </IconButton>
        </Tooltip>

        <Tooltip title="Refresh data">
            <IconButton size="small" onClick={() => { refresh() }}>
                <RefreshIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    </Card>
}