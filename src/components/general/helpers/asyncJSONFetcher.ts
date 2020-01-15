export default async function asyncJSONFetch(url: string) {
    const response = await fetch(url);
    return await response.json();
}