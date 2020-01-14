
export function mockSuccessfulFetch(responseBody: any) {
    const response = Promise.resolve({
        json: () => Promise.resolve(responseBody)
    })
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => response);
}

export function mockFailedFetch() {
    const response = Promise.reject('error');
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => response);
} 