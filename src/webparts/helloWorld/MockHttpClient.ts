import { ISPList } from './HelloWorldWebPart'

const mockItems: ISPList[] = [
    { Title: 'Mock List', Id: '1' },
    { Title: 'Mock List 2', Id: '2' },
    { Title: 'Mock List 3', Id: '3' },
];

const MockHttpClient =
    new Promise<ISPList[]>((resolve) => resolve(mockItems));

export default MockHttpClient;