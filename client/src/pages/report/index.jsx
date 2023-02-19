import { useState } from "react";
import PoseTimeRatioChart from "../../components/home/dashboard/PoseTimeRatioChart";
import MobileTemplate from "../../components/mobile";
import './index.scss';

function Report() {
    const [reportData, setReportData] = useState({
        turtleTime: 3600,
        straightTime: 3600,
        userName: '방울토망토',
        date: '2022-03-07',
    });

    return (
        <MobileTemplate>
            <div className="report-page">
                <div className="report-header">
                    <div/><div/><div/><div/>
                    <div/><div/><div/><div/>
                </div>
                <h3>{reportData?.date}</h3>
                <h1 className="report-title">
                    {reportData?.userName} 님의 자세 진단표
                </h1>
                
                <div className="chart-wrapper">
                    <PoseTimeRatioChart 
                        turtleTime={reportData?.turtleTime}
                        straightTime={reportData?.straightTime}
                    />
                </div>

                <div className="report-content-text">
                    <div>
                    {reportData?.userName} 님은 하루 동안 
                    {
                        reportData?.turtleTime > reportData?.straightTime
                        ? <b> 거북이 자세 </b>
                        : <b> 바른 자세 </b>
                    }를 더 오래 유지했군.
                    </div>
                    {
                        reportData?.turtleTime > reportData?.straightTime
                        ? <div>
                            모니터를 보는 동안 자세를 바르게 유지하기 쉽지 않았을거야.
                        </div>
                        : <div>
                            모니터를 보는 동안 자세를 바르게 유지하기 쉽지 않았을텐데, 잘했군.
                        </div>
                    }
                </div>
            </div>
        </MobileTemplate>
    )
}
export default Report;