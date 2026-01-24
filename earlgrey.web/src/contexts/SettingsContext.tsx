import { createContext } from "react";
import { useCookie } from "../hooks/useCookie";
import type { Units } from "../utils/unitUtils";

export interface SettingsContextType {
    settings: EarlGreySettings
    setSettings: (val: EarlGreySettings) => void
}

export type EarlGreyLayout = "HORIZONTAL" | "VERTICAL" | "SQUARE"

export interface EarlGreySettings {
    units?: Units
    layout?: EarlGreyLayout
}
export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = (props: { children: any }) => {

    const [settings, saveSettings] = useCookie("earlgrey_settings", {
        units: "imperial",
        layout: "HORIZONTAL"
    } as EarlGreySettings)


    const setSettings = (val: EarlGreySettings) => {
        saveSettings({ ...settings, ...val })
    }


    return <SettingsContext.Provider value={{ settings, setSettings } as SettingsContextType}>
        {props.children}
    </SettingsContext.Provider>

}