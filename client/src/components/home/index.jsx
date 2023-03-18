import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Dashboard from './dashboard/index';
import PoseApi from '../../apis/PoseApi';
import './index.scss';


function Home() {
    const poseApi = new PoseApi();
    const straightTime = useSelector(state=>state.pose.straightTime);
    const turtleTime = useSelector(state=>state.pose.turtleTime);

    const savePoseTime = async () => {
        await poseApi.savePoseTime(straightTime, turtleTime);
    }

    useEffect(()=>{
        // 1분 마다 측정값 저장
        const totalTime = straightTime + turtleTime;

        if (totalTime && totalTime % 10 === 0) {
            savePoseTime();
        }
    }, [straightTime, turtleTime])

    useEffect(()=>{
        // unload 되기 전 측정값 저장
        window.addEventListener('beforeunload', savePoseTime);
        return () => window.removeEventListener('beforeunload', savePoseTime);
    }, [straightTime, turtleTime])
  
    return (
        <div className="home">
            <Sidebar />
            <Dashboard />
        </div>
    )
}
export default Home;