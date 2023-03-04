import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { secToString } from '../../../utils/function/Time';
import MissionApi from "../../../apis/MissionApi";
import Mission from '../mission';
import PoseTimeRatioChart from './PoseTimeRatioChart';

export function TodayChart() {
  const missionApi = new MissionApi();
  const auth = useSelector(state=>state.userData.auth);
  const straightTime = useSelector(state=>state.pose.straightTime);
  const turtleTime = useSelector(state=>state.pose.turtleTime);
  const completedMissionList = useSelector(state=>state.mission.completedMissionList);

  // mission 1. 출석체크 미션 로직
  useEffect(()=>{
    if (auth) {
        if (!completedMissionList.includes(1)) {
            missionApi.completeMission(1);
        }
    }
  }, [auth, completedMissionList])

  return (
    <div className="today-chart chart-wrapper">
        <div className="chart-title">Today</div>
        <div className="today-status-wrapper">
            <div className="today-status-chart">
                <PoseTimeRatioChart
                    straightTime={straightTime}
                    turtleTime={turtleTime}
                />
            </div>
            <div className="today-time-mission-wrapper">
              <div className="today-straight-time">
                <div className="straight-title">바른 자세 시간</div>
                <div className="straight-time">{ secToString(straightTime) }</div>
              </div>
              <Mission
                completedMissionIdList={completedMissionList}
              />
            </div>
        </div>

    </div>
  )
}
