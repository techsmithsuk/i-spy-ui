
export function mockSuccessfulFetch(responseBody: any) {
    const response = Promise.resolve(
        {
            json: () => Promise.resolve(responseBody)
        }
    );

    const updateListResponse = Promise.resolve(
        {
            json: () => Promise.resolve({"Success":"No data has been added. Database Up to date."})
        }
    );
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((url :string) => {
        if(url.includes("fetch-fbi-data")){
            return updateListResponse;
        } else {
            return response;
        }
    })
}

export function mockPageChangeSuccessfulFetch() {
    let suspectList :any[] = new Array();
    let newSuspectList :any[] = new Array();
        

    suspectList.push({"id":1,"title":"Harry Potter","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

    let jsonResponse :any = ({"items":suspectList,
                                "totalNumberOfItems": 808,
                                "previousPage": null,
                                "nextPage": "/suspects?page=2&pageSize=10"})    
        
    newSuspectList.push({"id":2,"title":"James Cameron","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

    let newJsonResponse :any = ({"items":newSuspectList,
                                "totalNumberOfItems": 808,
                                "previousPage": "/suspects?page=1&pageSize=10",
                                "nextPage": null})

    const initialResponse = Promise.resolve({json: () => Promise.resolve(jsonResponse)});
    const newResponse = Promise.resolve({json: () => Promise.resolve(newJsonResponse)});

    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation((url :string) => {
        if(url.includes("page=2")){
            return newResponse;
        } else {
            return initialResponse;
        }
    })
}


export function mockFailedFetch() {
    const response = Promise.reject();
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => response);
} 

