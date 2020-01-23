
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


export function mockFailedFetch() {
    const response = Promise.reject();
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => response);
} 

