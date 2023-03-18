import MeasurePose from '../../MeasurePose';
import PoseGraph from './PoseGraph';
import PostureCalendar from './PostureCalendar';
import { TodayChart } from './TodayChart';
import { useSetDashboardData } from '../../../hooks/useSetDashboardData';
import './index.scss';

function Dashboard() {
    const { dayMissionList } = useSetDashboardData();

    return (
        <div className="dashboard">
            <div className="today-webcam-wrapper">
                <TodayChart />
                <MeasurePose />
            </div>
            <div className="posture-transition-wrapper">
                <PostureCalendar dayMissionList={dayMissionList}/>
                <PoseGraph />
            </div>

        </div>
    )
}
export default Dashboard;