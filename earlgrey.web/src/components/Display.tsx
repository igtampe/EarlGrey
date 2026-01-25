import { useEffect, useState } from "react";
import { useSettings } from "../hooks/useSettings";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import ActionsPanel from "./actionsPanel/ActionsPanel";
import Calendar from "./calendar/Calendar";
import Clock from "./clock/Clock";
import CurrentConditions from "./currentConditionsDisplay/CurrentConditions";
import ForecastDisplay from "./forecastDisplay/ForecastDisplay";
import type Background from "../model/Background";
import useApi from "../hooks/useApi";
import { getBackgrounds } from "../api/Backgrounds";
import type { BackgroundCategories } from "../model/Background";
import useCurrentTime from "../hooks/useCurrentTime";
import useWeather from "../hooks/useWeather";
import { addHours } from "../utils/dateUtils";
import { getRandomInt } from "../utils/randomUtils";
import PhotoPanel from "./photoPanel/PhotoPanel";

export default function Display() {

    const now = useCurrentTime();
    const [minute, setMinute] = useState(now.getMinutes())

    const { settings } = useSettings();
    const { width, height } = useWindowDimensions();
    const { data: weather } = useWeather();

    useEffect(() => {
        if (
            minute !== now.getMinutes()
            && (now.getMinutes() % 15) === 0
        ) setMinute(now.getMinutes())
    }, [now])

    const [background, setBackground] = useState<Background>()
    const [dimmer, setDimmer] = useState(0)
    const [dimmerOverride, setDimmerOverride] = useState(false)

    //Get all the backgrounds
    const anyBGApi = useApi(getBackgrounds("any"), true)
    const dayBGApi = useApi(getBackgrounds("day"), true)
    const nightBGApi = useApi(getBackgrounds("night"), true)
    const sunBGApi = useApi(getBackgrounds("sun"), true)

    const backgrounds = {
        "any": anyBGApi.data ?? [],
        "day": dayBGApi.data ?? [],
        "sun": sunBGApi.data ?? [],
        "night": nightBGApi.data ?? []
    } as Record<BackgroundCategories, Background[]>


    const refreshImage = () => {

        //Every 15 minute interval we change the image

        const sunrise = new Date(weather?.forecast[0]?.sunrise)
        const sunset = new Date(weather?.forecast[0]?.sunset)

        const isDay = now > sunrise && now < sunset
        const sunriseRange = addHours(sunrise, 1)
        const sunsetRange = addHours(sunset, -1)

        // A healthy sleeping time
        const dimmerStartRange = addHours(sunrise, -8)

        //A less healthy sleeping time
        const dimmerStartHeavyRange = addHours(sunrise, -4)
        const dimmerEndRange = addHours(sunrise, -1)

        const isSunrise = now >= sunrise && now < sunriseRange
        const isSunset = now >= sunsetRange && now < sunset
        const isSun = isSunrise || isSunset

        setDimmer(isDay
            ? 0
            : now >= dimmerStartRange && now < dimmerStartHeavyRange
                ? .5
                : now >= dimmerStartHeavyRange && now < dimmerEndRange
                    ? .8
                    : .1
        )

        const isAny = getRandomInt(10) < 2 && backgrounds.any.length > 0 //20% chance of an any image as long as there's at least 1 any image

        const selectAnyImage = () => {
            if (backgrounds.any.length > 0) {
                setBackground({ ...backgrounds.any[getRandomInt(backgrounds.any.length)], category: "any" })
            }
        }

        if (isAny) {
            selectAnyImage();

        } else if (isSun) {

            //Select a sunrise/sunset image
            if (backgrounds.sun.length === 0) { selectAnyImage(); }
            else { setBackground({ ...backgrounds.sun[getRandomInt(backgrounds.sun.length)], category: 'sun' }) }

        } else if (isDay) {

            //Select a daytime image
            if (backgrounds.day.length === 0) { selectAnyImage(); }
            else { setBackground({ ...backgrounds.day[getRandomInt(backgrounds.day.length)], category: "day" }) }

        } else {

            //Select a nighttime image
            if (backgrounds.night.length === 0) { selectAnyImage(); }
            else { setBackground({ ...backgrounds.night[getRandomInt(backgrounds.night.length)], category: "night" }) }

        }

    }

    useEffect(refreshImage, [minute, anyBGApi.data])

    const backgroundPath = `url(${background ? `/backgrounds/${background.category}/${background.file}` : "/defaultbg.jpg"})`

    switch (settings.layout) {
        case "SQUARE":

            return <div style={{
                width: "100%", height: "100vh",
                padding: "5vh 5vw", display: "flex",
                flexDirection: 'column',
                backgroundImage: backgroundPath,
                backgroundPosition: background?.crop ?? "center",
                backgroundSize: "cover",
                alignItems: 'center', justifyContent: 'center'
            }}>

                {dimmer > 0 && !dimmerOverride && <div style={{ position: "absolute", top: '0', left: '0', width: "100%", height: "100vh", backgroundColor: "black", zIndex: "10", opacity: dimmer }} />}

                <div style={{ width: "100%", height: "45%", display: "flex", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div style={{ flex: 1, flexShrink: 0, borderRight: "1px solid white" }}>
                        <Clock clockStyle={{ height: "25vh", width: "25vh" }} suppressDate />
                    </div>
                    <div style={{ flex: 1, borderLeft: "1px solid white" }}>
                        <Calendar />
                    </div>


                </div>

                <div style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <hr style={{ width: "90%" }} />
                </div>

                <div style={{ width: "100%", height: "45%", display: "flex", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div style={{ flex: 1, borderRight: "1px solid white", fontSize: ".8em" }}>
                        <CurrentConditions iconStyle={{ width: "15vh", maxWidth: "100%" }} />
                    </div>
                    <div style={{ flex: 1, borderLeft: "1px solid white", fontSize: ".8em" }}>
                        <ForecastDisplay forecastIconStyle={{ height: "7vh" }} suppressThirdColumn={width < 1280} suppressSecondColumn={width < 650} />
                    </div>

                </div>

                <ActionsPanel dimmer={dimmer} dimmerOverride={dimmerOverride} setDimmerOverride={setDimmerOverride} />
                <PhotoPanel background={background} backgrounds={backgrounds} refreshImage={refreshImage} />

            </div>
        case "VERTICAL":

            return <div style={{
                width: "100%", height: "100vh",
                padding: "2vh 10vw", display: "flex",
                flexDirection: 'column',
                backgroundImage: backgroundPath,
                backgroundPosition: background?.crop ?? "center",
                backgroundSize: "cover"
            }}>

                {dimmer > 0 && !dimmerOverride && <div style={{ position: "absolute", top: '0', left: '0', width: "100%", height: "100vh", backgroundColor: "black", zIndex: "10", opacity: dimmer }} />}

                <div style={{ height: "33.33333333333%", flexShrink: 0, borderBottom: "1px solid white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Clock clockStyle={{ aspectRatio: "1", height: "50vw" }} />
                </div>
                <div style={{ flex: 1, borderTop: "1px solid white", borderBottom: "1px solid white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <CurrentConditions
                        iconStyle={{ width: width < 1080 ? "30vw" : "15vh", maxWidth: "100%" }}
                        fontSize={width < 1080 ? "1vw" : "1em"} suppressSecondColumn={width < 1080}
                        temperatureOrientation={width < 1080 && height / width > 2.5 ? "vertical" : "horizontal"}
                    />
                </div>
                <div style={{ height: "33.33333333333%", borderTop: "1px solid white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <ForecastDisplay forecastIconStyle={{ height: "5vh" }} suppressThirdColumn={width < 750} suppressSecondColumn={width < 650} fontSize="1vh" />
                </div>

                <ActionsPanel dimmer={dimmer} dimmerOverride={dimmerOverride} setDimmerOverride={setDimmerOverride} />
                <PhotoPanel background={background} backgrounds={backgrounds} refreshImage={refreshImage} />

            </div>

        case "HORIZONTAL":
        default:
            return <div style={{
                width: "100%", height: "100vh",
                padding: "10vh 0%", display: "flex",
                backgroundImage: backgroundPath,
                backgroundPosition: background?.crop ?? "center",
                backgroundSize: "cover"
            }}>

                {dimmer > 0 && !dimmerOverride && <div style={{ position: "absolute", top: '0', left: '0', width: "100%", height: "100vh", backgroundColor: "black", zIndex: "10", opacity: dimmer }} />}

                <div style={{ width: "33.33333333333%", flexShrink: 0, borderRight: "1px solid white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Clock clockStyle={{ width: "40vh", height: "40vh" }} />
                </div>
                <div style={{ flex: 1, borderLeft: "1px solid white", borderRight: "1px solid white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <CurrentConditions iconStyle={{ height: "30vh", maxWidth: "12vw" }} fontSize=".5vw" />
                </div>
                <div style={{
                    width: "33.33333333333%", borderLeft: "1px solid white", backgroundColor: "rgba(0,0,0,0.5)"
                }}>
                    <ForecastDisplay suppressThirdColumn={width < 1760} suppressSecondColumn={width < 1280} fontSize={"1em"} />
                </div>

                <ActionsPanel dimmer={dimmer} dimmerOverride={dimmerOverride} setDimmerOverride={setDimmerOverride} />
                <PhotoPanel background={background} backgrounds={backgrounds} refreshImage={refreshImage} />

            </div>
    }


}