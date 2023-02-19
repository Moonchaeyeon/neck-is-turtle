import { useSelector } from 'react-redux';
import { secToString } from '../../../utils/Time';
import Mission from '../mission';
import PoseTimeRatioChart from './PoseTimeRatioChart';

export function TodayChart() {
  const straightTime = useSelector(state=>state.pose.straightTime);
  const turtleTime = useSelector(state=>state.pose.turtleTime);

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
              <Mission/>
            </div>
        </div>

    </div>
  )
}
