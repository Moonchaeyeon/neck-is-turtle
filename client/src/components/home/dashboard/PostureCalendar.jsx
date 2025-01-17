import MyResponsiveTimeRange from "./MissionChart";

function PostureCalendar({ dayMissionList }) {

    return (
        <div className="posture-calendar chart-wrapper">
            <div className="chart-title">미션 달력</div>
            <div className="calendar-chart">
                <MyResponsiveTimeRange dayMissionList={dayMissionList}/>
            </div>
        </div>
    )
}
export default PostureCalendar;