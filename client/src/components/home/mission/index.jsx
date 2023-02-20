import { useNavigate } from "react-router-dom";
import { missionList } from "../../../utils/data/missionInfo";
import MissionElem from "./MissionElem";
import './index.scss';

function Mission({ completedMissionIdList, showStretchingButton=true }) {
    const navigation = useNavigate();

    return (
        <div className="mission-container">
            <div className="mission-container-title">
                일일 미션
                {
                    showStretchingButton &&
                    <button 
                        className="go-to-stretching"
                        onClick={()=>{navigation('/stretching')}}
                    >
                        스트레칭 하러 가기
                    </button>
                }
            </div>

            <div className="mission-wrapper">
            {
                missionList.map((mission)=>(
                    <MissionElem mission={mission} completed={completedMissionIdList.includes(mission.id)}/>
                ))
            }
            </div>
        </div>
    )
}
export default Mission;