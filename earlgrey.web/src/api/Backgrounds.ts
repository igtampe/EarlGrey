import type { BackgroundCategories } from "../model/Background";
import type Background from "../model/Background";
import { Get } from "./Common";

const ENDPOINT = "/backgrounds/"

export const getBackgrounds = (category: BackgroundCategories) => (
    setLoading: (value: boolean) => void,
    setItem: (value?: Background[]) => void,
    onError: (value: any) => void,
) => Get(setLoading, setItem, onError, ENDPOINT + category + "/index.json")