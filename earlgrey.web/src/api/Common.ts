//export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5033"
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:9090"
export const API_PREFIX = `${BACKEND_URL}/api/`

const ApiResponse = (
    data: any,
    ok: boolean,
    status: number
) => ({
    data, ok, status
} as ApiResponseType)

interface ApiResponseType {
    data: any,
    ok: boolean,
    status: number
}

const CONTENT_TYPE_HEADER = "Content-Type"

const MIME_TYPES = {
    JSON: "application/json",
    TEXT: "text/plain",
    OCTET_STREAM: "application/octet-stream"
}

export function ExternalGet<T>(setLoading: (value: boolean) => void, setItem: (value?: T) => void, onError: (value?: any) => void, url: string) {
    externalFetch(setLoading, setItem, onError, url, "GET");
}

export function Get<T>(setLoading: (value: boolean) => void, setItem: (value?: T) => void, onError: (value?: any) => void, url: string) {
    internalFetch(setLoading, setItem, onError, url, "GET");
}

export function Post<T>(setLoading: (value: boolean) => void, setItem: (value?: T) => void, onError: (value?: any) => void, url: string, body?: any) {
    internalFetch(setLoading, setItem, onError, url, "POST", body);
}

export function Put<T>(setLoading: (value: boolean) => void, setItem: (value?: T) => void, onError: (value?: any) => void, url: string, body?: any) {
    internalFetch(setLoading, setItem, onError, url, "PUT", body);
}

export function Delete<T>(setLoading: (value: boolean) => void, setItem: (value?: T) => void, onError: (value?: any) => void, url: string, body?: any) {
    internalFetch(setLoading, setItem, onError, url, "DELETE", body);
}


function externalFetch<T>(setLoading: (value: boolean) => void, setItem: (value?: T) => void, onError: (value?: any) => void, url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) {
    setLoading(true)

    const init = { method: method } as RequestInit;

    if (body) {
        init.body = typeof (body) === 'string' ? body : JSON.stringify(body)
        init.headers = { [CONTENT_TYPE_HEADER]: MIME_TYPES.JSON };
    }

    fetch(url, init)
        .then(handleResponse)
        .then((data: ApiResponseType) => handleData(data, onError, setLoading, setItem))
        .catch((e: Error) => handleError(ApiResponse(undefined, false, 999), onError, e, setLoading));
}

function internalFetch<T>(setLoading: (value: boolean) => void, setItem: (value?: T) => void, onError: (value?: any) => void, url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) {
    setLoading(true)

    const init = {
        method: method,
        //credentials: 'include'
    } as RequestInit;

    if (body) {
        init.body = typeof (body) === 'string' ? body : JSON.stringify(body)
        init.headers = { [CONTENT_TYPE_HEADER]: MIME_TYPES.JSON };
    }

    fetch(url, init)
        .then(handleResponse)
        .then((data: ApiResponseType) => handleData(data, onError, setLoading, setItem))
        .catch((e: Error) => handleError(ApiResponse(undefined, false, 999), onError, e, setLoading));
}

function handleData<T>(response: ApiResponseType, onError: (value?: any) => void, setLoading: (value: boolean) => void, setItem: (value: T) => void) {
    if (!response.ok) {
        handleError(response, onError, response.data ?? new Error(`Api Responded with ${response.status}`), setLoading)
    } else {
        setItem(response.data as T);
    }
    setLoading(false)
}

function handleError(response: ApiResponseType, onError: (value?: any) => void, error: any, setLoading: (val: boolean) => void) {
    onError({ ...error, status: response.status })
    console.error(error)
    setLoading(false)
}

async function handleResponse<T>(response: Response): Promise<ApiResponseType> {
    const contentType = response.headers.get(CONTENT_TYPE_HEADER)

    if (contentType === MIME_TYPES.OCTET_STREAM) {
        return ApiResponse(await response.blob(), response.ok, response.status)
    }

    const text = await response.text();
    try {
        return ApiResponse(JSON.parse(text) as T, response.ok, response.status)
    } catch {
        return ApiResponse(text, response.ok, response.status)
    }

}