export default function simulateFetch(mockedResponse) {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockedResponse),
    });
    Storage.prototype.setItem = jest.fn(); 
}