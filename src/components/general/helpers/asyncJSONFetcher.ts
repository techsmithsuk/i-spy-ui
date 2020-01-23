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

export async function asyncAdminJSONFetch(url: string,token :string) {
    const response = await fetch(url,{
        method:'GET',
        headers: {
            "Content-Type": "application/json",
            "token":token
        },
    });
    console.log(await response)
    return await response.json();
}

export async function asyncJSONPostFetch(url: string,formData :FormData) {
    const response = await fetch(url,{
        method:'POST',
        body: data
    })
    console.log(response)
    return await response.json();
}