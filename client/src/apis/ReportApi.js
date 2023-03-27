import { get, post } from './AxiosCreate';

export class ReportApi {
    decryptReportData = async (encrypted) => {
        const res = await post('chatbot/decrypt', {
            encrypted: encrypted.split(" ").join("+")
        })
        return res.data;
    }

    getReportData = async (day) => {
        const res = await post(`report`, {
            day: day
        });
        console.log(res.data);
        return res.data;
    }
}