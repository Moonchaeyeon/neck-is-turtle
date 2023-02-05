import { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { stretchingList } from "../../utils/data/stretchingInfo";
import MissionApi from "../../apis/MissionApi";
import WebCam from "./WebCam";
import './index.scss';

function Stretching() {
    const navigation = useNavigate();
    const missionApi = new MissionApi();
    const stretchingId = useParams().stretchingId;
    const [stretchingSteps, setStretchingSteps] = useState([]);
    const [correctPose, setCorrectPose] = useState(false); // 올바른 스트레칭 자세인지 표시
    const [step, setStep] = useState(0); // 스트레칭 단계 표시
    const timer = useRef();
    const time = useRef(0);
    const [sec, setSec] = useState(0);
    const [alertText, setAlertText] = useState('');

    useEffect(() => {
        setStretchingSteps(stretchingList.find((el)=>el.id===stretchingId).steps);
    }, [stretchingId])

    const [completeList, setCompleteList] = useState(new Array(stretchingSteps.length));

    const completeStretching = (_step) => {
        let tempCompleteList = [...completeList];
        tempCompleteList[_step] = true;
        setCompleteList(tempCompleteList);
        setAlertText(null);

        if (_step < stretchingSteps.length - 1) {
            setStep(_step + 1);
        } else {
            missionApi.completeMission(4);
            navigation('/');
        }
    }

    const currAction = useMemo(()=>{
        return (result) => {stretchingSteps[step]?.action(result, setCorrectPose, setAlertText)};
    }, [step, stretchingSteps])
    const currText = useMemo(()=>{
        return stretchingSteps[step]?.text;
    }, [step, stretchingSteps])
    const currImg = useMemo(()=>{
        return stretchingSteps[step]?.img;
    }, [step, stretchingSteps])
    const currDutation = useMemo(()=>{
        return stretchingSteps[step]?.duration;
    }, [step, stretchingSteps])

    useEffect(()=>{
        timer.current = setInterval(()=>{
            if (correctPose) {
                if (time.current < currDutation) {
                    time.current += 1;
                    setSec(parseInt(time.current));
                } else {
                    completeStretching(step);
                    time.current = 0;
                    setSec(0);
                }
            } else {
                time.current = 0;
                setSec(0);
            }
        }, 1000);

        return ()=>{
            clearInterval(timer.current);
        }
    }, [correctPose, currDutation])

    return (
        <div className="stretching">
            <div className="stretching-steps-wrapper">
            {
                stretchingSteps.map((stretching, idx)=>(
                    <div 
                        className="stretching-step"
                        onClick={()=>{setStep(idx)}}
                        style={{backgroundImage: `url(${stretching.img})`}}
                        id={step===idx ? 'current-stretching' : null}
                    >
                        <div className="stretching-step-num">{ idx + 1 }</div>
                        {
                            !!(completeList[idx]) &&
                            <div className="stretching-step-complete">
                                <BsFillCheckCircleFill/>
                            </div>
                        }
                    </div>
                ))
            }
            </div>
            <div className="stretching-webcam-container">
                <div className="stretching-webcam-wrapper">
                    <div className="stretching-webcam">
                        <WebCam onResults={currAction}/>
                    </div>
                    <div className="curr-stretching-info-wrapper">
                        {
                            alertText &&
                            <div className="stretching-alert-text" id={correctPose ? 'correct' : 'incorrect'}>
                                { alertText }
                            </div>
                        }
                        <div className="curr-stretching-info">
                            <img src={ currImg }/>
                            { correctPose && <div className="second">{ sec }</div> }
                            <div className="curr-stretching-description">{ currText }</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Stretching;