import { useContext } from "react";
import { TimeContext } from "../contexts/TimeContext";

export default function useCurrentTime(): Date {
    const ctx = useContext(TimeContext);
    if (!ctx) {
        throw new Error("useCurrentTime must be used within a TimeProvider");
    }
    return ctx;
}
