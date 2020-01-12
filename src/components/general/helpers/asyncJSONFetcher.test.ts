import asyncJSONfetch from './asyncJSONFetcher';

test('the data is baddie', async () => {
    const url = "https://techswitch-i-spy-api-staging.herokuapp.com/suspect";

    const data = await asyncJSONfetch(url);
    expect(data).toBe({name: 'BaddieMcBad'});
  });