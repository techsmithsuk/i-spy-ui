export default async function asyncJSONFetch(url: string) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}