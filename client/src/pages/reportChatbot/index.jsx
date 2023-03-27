import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ReportApi } from "../../apis/ReportApi";
import Report from "../../components/report";

function ReportChatbot () {
    const reportApi = new ReportApi();
    const [searchParams, setSearchParams] = useSearchParams();

    const [reportData, setReportData] = useState({
        turtleTime: 300,
        straightTime: 200,
        userName: '방울토망토',
        date: '2022-03-07',
        mission: [1, 2, 3, 4]
    });

    useEffect(()=>{
        const decryptReportData = async () => {
            const encrypted = searchParams.get('info');
            const decrypted = await reportApi.decryptReportData(encrypted);
            setReportData(decrypted);
        }
        decryptReportData();
    }, [searchParams])

    return (
        <Report reportData={reportData}/>
    )
}
export default ReportChatbot;