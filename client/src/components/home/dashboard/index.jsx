import MeasurePose from '../../MeasurePose';
import PoseGraph from './PoseGraph';
import PostureCalendar from './PostureCalendar';
import { TodayChart } from './TodayChart';
import './index.scss';
import MeasureAngle from '../../MeasureAngle';

function Dashboard() {

    return (
        <div className="dashboard">
            <div className="today-webcam-wrapper">
                <TodayChart />
                <MeasurePose />
                {/* <MeasureAngle /> */}
            </div>
            <div className="posture-transition-wrapper">
                <PostureCalendar />
                <PoseGraph />
            </div>

        </div>
    )
}
export default Dashboard;