import { useEffect } from "react";
import { useState } from "react";
import PoseTimeRatioChart from "../../components/home/dashboard/PoseTimeRatioChart";
import Mission from "../../components/home/mission";
import MobileTemplate from "../../components/mobile";
import { secToStringKor } from "../../utils/function/Time";
import './index.scss';
import ReportMission from "./ReportMission";

function Report() {
    const [straightRatio, setStraightRatio] = useState(20);
    const [totalTime, setTotalTime] = useState(11 * 60);

    const [reportData, setReportData] = useState({
        turtleTime: 300,
        straightTime: 200,
        userName: '방울토망토',
        date: '2022-03-07',
        missionList: [1, 2, 3, 4]
    });

    useEffect(()=>{
        if (reportData) {
            // setStraightRatio(reportData.turtleTime / (reportData.turtleTime + reportData.straightTime) * 100);
            // setTimeScore(reportData.turtleTime > 10 * 3600 ? 'A' : 'B')
        }
    }, [reportData])

    return (
        <MobileTemplate>
            <div className="report-page">
                <div className="report-header">
                    <div/><div/><div/><div/>
                    <div/><div/><div/><div/>
                </div>
                <div className="report-date">{reportData?.date}</div>
                <h1 className="report-title">
                    {reportData?.userName} 님의 자세 진단서
                </h1>
                
                <div className="report-chart-container">
                    <div className="chart-wrapper">
                        <PoseTimeRatioChart 
                            turtleTime={reportData?.turtleTime}
                            straightTime={reportData?.straightTime}
                        />
                    </div>
                    <div className="report-mission-container">
                        <div className="report-chart-title">자세 측정 시간</div>
                        <div className="report-total-time">{ secToStringKor(totalTime) }</div>
                        <ReportMission 
                            completedMissionIdList={reportData?.missionList}
                        />
                    </div>
                </div>

                <div className="report-content-text">
                    {
                        straightRatio > 50 
                        ? 
                        // 바른 자세를 더 오래 유지한 경우
                        <>
                            <div>
                                {reportData?.userName}군, 반갑네. 오늘도 바른 자세로 하루를 살아냈구만!
                            </div>
                            <div>
                                <b>바른자세 비율이 {straightRatio}%</b>나 되다니.. 정말 놀랍군. 대단해.
                            </div>
                            <div>
                                이대로면 금방 바른자세 왕이 될 수 있겠어 😄
                            </div>
                            {
                                !!(totalTime >= 30 * 60)
                                ? 
                                // 측정 시간이 10분 이상일 경우
                                <>
                                    <div>
                                        심지어 거북목 측정을 {secToStringKor(totalTime)} 동안 했구만! 그렇다면
                                    </div>
                                    <div>
                                        전체 {secToStringKor(totalTime)} 중에 {secToStringKor(reportData?.turtleTime)} 동안 바른 자세를 유지한건데,
                                    </div>
                                    <div>
                                        이야. 엄청난 수치구먼! 비율이 높다고 해도,
                                    </div>
                                    <div>
                                        너무 적은시간 측정하면 잘못된 결과일 때가 많은데..
                                    </div>
                                    <div>
                                        측정시간도 길고 바른자세 비율도 높고 더할나위 없구먼. 잘했어 👍
                                    </div>
                                </>
                                : 
                                // 측정 시간이 10분 미만일 경우
                                <>
                                    <div>
                                        오호,, 그런데 <b>측정시간이 {secToStringKor(totalTime)}</b>인 건 조금 아쉽구먼 🐢
                                    </div>
                                    <div>바른 자세 습관을 들이기 위해서는 얼마나 잘하는지 보다,</div>
                                    <div>
                                        <b>얼마나 꾸준히 하는지</b>가 더 중요하다네.
                                    </div>
                                    <div>그렇기에 어떤 자세던 꾸준히 오랫동안 측정하는게 더 중요하지 😀</div>
                                    <div>내일은 좀 더 오랜시간 측정해보도록 해보자고! 🏃‍♀️</div>
                                </>
                            }
                        </>
                        : 
                        // 바르지 않은 자세를 더 오래 유지한 경우
                        <>
                            <div>
                                {reportData?.userName}군, 반갑네. 자네를 위한 
                            </div>
                            <div>
                                자세 분석 일일 리포트를 준비했으니, 천천히 읽어보시게나 🐢
                            </div>
                            <div>
                                허허,, 그런데 오늘은 아쉽게도 <b>바른자세 비율이 {straightRatio}%</b>로 꽤나 낮구먼 🥲
                            </div>
                            <div>
                                힘들어도 우리 조금만 더 노력해보세!
                            </div>
                            {
                                !!(totalTime >= 30 * 60)
                                ?
                                // 측정 시간이 10분 이상일 경우
                                <>
                                    <div>
                                        그래도 <b>거북목 측정은 무려 {secToStringKor(totalTime)}</b> 동안 했군! 정말 칭찬하네 🙂
                                    </div>
                                    <div>{reportData?.userName}군은 바른자세 비율은 낮을지 몰라도,</div>
                                    <div>오랜 시간동안 자세를 측정하고 개선하고자 하는 <b>끈기</b>가 있구먼 😸</div>
                                    <div>이런 태도면 금방 바른 자세 습관을 들일 수 있을 거야. 아주 잘했어! 🐢</div>
                                </>
                                :
                                // 측정 시간이 10분 미만일 경우
                                <>
                                    <div>
                                        헛,, 그런데 <b>거북목 측정 시간도 {secToStringKor(totalTime)}</b>으로 낮은 편이구먼 🥹 
                                    </div>
                                    <div>
                                        {secToStringKor(totalTime)} 동안 {secToStringKor(reportData?.turtleTime)} 만큼 바른 자세를 유지했으니,
                                    </div>
                                    <div>아무래도 조금 더 분발하면 좋겠구먼 🫣</div>
                                    <div>그래도 포기하지 않고 적은 시간일지라도 측정을 했으니,</div>
                                    <div>이렇게 <b>꾸준히 노력하기만 한다면 반드시 개선</b> 될거야!</div>
                                    <div>내가 거북이 수염을 걸고 보증하네 🐢</div>
                                </>
                            }
                        </>
                    }
                    {
                        reportData?.missionList.length > 0
                        ? <>                                    
                            <div>
                                다음은 <b>미션</b>을 한번 봐볼까,,
                            </div>
                            <div>
                                4개의 미션중 <b>{reportData?.missionList.length}개의 미션을 달성</b>했군!
                            </div>
                            {
                                !!(reportData?.missionList.length >= 3)
                                ? <>

                                    <div>
                                        잘했어! 혹시 자세가 금방 개선이 되지 않아서 답답하다면,
                                    </div>
                                    <div>거북목 비율이 아닌 미션 달성에 목표를 두고 노력해 보는 것도 좋은 방법이네.</div>
                                    <div>매일 조금씩 미션을 달성하다보면, 어느덧 바른자세 비율도 높아질거야 🙂</div>
                                </>
                                : <>
                                    <div>조금은 아쉬운 성과구먼,, 다음에는 조금더 분발해보자구 🥹😌</div>
                                    <div>그래도 {reportData?.missionList.length}개의 미션일지라도, 하나도 달성하지 않은 것 보다는</div>
                                    <div>훨씬 칭찬할만 하지 🙃 잘했어! 내일은 조금 더 해보자구!</div>
                                </>
                            }
                        </>
                        : <>
                            <div>다음은 <b>미션</b>을 한번 봐볼까,,</div>
                            <div>헉,, 4개의 미션 중 <b>하나도 달성하지 않았구먼</b> 🥹</div>
                            <div>이대로는 안되겠어,, 언제나 모든 미션을 달성할 수는 없겠지만,</div>
                            <div><b>하나라도 미션을 달성하는건 꾸준한 습관 형성에 정말 중요</b>하다네 😂</div>
                            <div>내일은 꼭 미션을 달성해보자고 !</div>
                        </>
                    }
                </div>
            </div>
        </MobileTemplate>
    )
}
export default Report;