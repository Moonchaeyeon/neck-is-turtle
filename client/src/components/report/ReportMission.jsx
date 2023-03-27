import { missionList } from "../../utils/data/missionInfo";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import './ReportMission.scss';

function ReportMission({ completedMissionIdList }) {


    return (
        <div className="report-mission-container">
            <div className="report-mission-title">미션</div>
            <div className="report-mission-wrapper">
            {
                missionList.map((mission)=>(
                    <div className="report-mission-elem">
                        {
                            completedMissionIdList?.includes(mission.id)
                            ? <BsCheckCircleFill className="status-icon" id="complete"/>
                            : <BsCircle className="status-icon"/>
                        }
                        { mission.name }
                    </div>
                ))
            }
            </div>
        </div>
    )
}
export default ReportMission;