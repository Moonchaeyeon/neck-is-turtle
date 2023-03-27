import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ReportApi } from "../../apis/ReportApi";
import Report from "../../components/report";

function ReportDay() {
    const { day } = useParams();
    const reportApi = new ReportApi();
    const [reportData, setReportData] = useState({});

    useEffect(()=>{
        const getReportData = async () => {
            const res = await reportApi.getReportData(day);
            let temp = {...res};
            temp.date = day;
            setReportData(res);
        }
        getReportData();
    }, [day])

    return (
        <Report reportData={reportData}/>
    )
}
export default ReportDay;