
const gFetch = async (uri: string, optionsOverride: Record<string, unknown> = {}) => {
    const options: Record<string, unknown> = {
        // credentials: 'include',
        // //redirect: 'manual',
        // mode: 'no-cors',
        ...optionsOverride,
    };

    const response = await fetch(uri, options);

    if (response.ok) {
        return response;
    }

    const text = await response.text();
    // if (error) {
    //     return Promise.reject(
    //         new Error(`Received ${response.status}. Response: ${text}`)
    //     );
    // }

    return Promise.reject(text || 'Unknown Error');
};

const toQueryParams = (queryParams: Record<string, unknown>) =>
    Object.keys(queryParams)
        .filter((key) => queryParams[key] !== null || queryParams[key] !== undefined)
        .map((key) => `${key}=${queryParams[key]}`)
        .join('&');

export const fetchJson = async <T = unknown>(
    uri: string,
    queryParams: Record<string, unknown> | undefined = undefined
): Promise<T> => {
    let requestUri= uri;
    if (queryParams) {
        requestUri += `?${toQueryParams(queryParams)}`;
    }

    const response = await gFetch(`${requestUri}`, {
        // headers: {
        //     'Content-Type': 'application/json'
        // },
    });
    return response.json();
};