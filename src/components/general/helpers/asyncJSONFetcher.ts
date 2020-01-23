export interface CreateReportData {
    suspectId: string,
    date: string,
    location: string,
    description: string
}

export async function asyncJSONFetch(url: string) {
    const response = await fetch(url);
    return await response.json();
}

export async function asyncJSONPostFetch(url: string, data: FormData) {
    const response = await fetch(url, {
        method:'POST',
        body: data
    })
    return await response.json();
}