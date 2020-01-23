export interface SuspectProfile {
    id: number;
    title: string;
    imageUrl?:string;
    dateOfBirth?: string;
    sex?: string;
    race?: string;
    nationality?: string;
    hair?: string;
    eyes?: string;
    height?: string;
    weight?: string;
    caution?: string;
    details? : string;
    warningMessage? : string;
}

export async function fetchProfileData(id: string): Promise<SuspectProfile> {
    // TODO: Replace this with an actual API call.
    const url: string = `${process.env.REACT_APP_API_URL}/suspects/${id}`
    const response = await fetch(url);
    return await response.json();
    // return {
    //     "id":1,
    //     "name":"Harry Potter",
    //     "imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb",
    //     "dates_of_birth_used" : "01/02/1994",
    //     "place_of_birth" : "Washington",
    //     "sex" : "Male", 
    //     "race" : "White",
    //     "nationality" : "American",
    //     "hair" : "Black",
    //     "eyes" : "Brown",
    //     "height" : "3'11''",
    //     "weight" : "5 lbs" 
    // }
}