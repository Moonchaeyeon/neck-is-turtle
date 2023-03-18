import { get, post } from './AxiosCreate';

export class ReportApi {
    decryptReportData = async (encrypted) => {
        console.log(decodeURI(encrypted));
        console.log(encrypted.split(" ").join("+"));
        const res = await post('chatbot/decrypt', {
            encrypted: encrypted.split(" ").join("+")
        })
        return res.data;
    }
}