import Display from "./components/Display";
import DimensionsProvider from "./contexts/DimensionsContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { TimeProvider } from "./contexts/TimeProvider";
import { WeatherProvider } from "./contexts/WeatherProvider";
import ThemeWrapper from "./ThemeWrapper";

export default function App() {

  return <ThemeWrapper>
    <SettingsProvider>
      <TimeProvider>
        <WeatherProvider>
          <DimensionsProvider>
            <Display />
          </DimensionsProvider>
        </WeatherProvider>
      </TimeProvider>
    </SettingsProvider>
  </ThemeWrapper>

}
