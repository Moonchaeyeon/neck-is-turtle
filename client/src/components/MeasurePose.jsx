import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import UserApi from "../apis/UserApi";
import WebCam from "react-webcam";
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { BsFillCheckCircleFill, BsFillExclamationTriangleFill } from 'react-icons/bs';
import { AiTwotoneSetting } from 'react-icons/ai';
import PoseStatusHandler from "./PoseStatusHandler";
import './MeasurePose.scss';

let camera;

function MeasurePose() {
    const userApi = new UserApi();
    const webcamRef = useRef();
    const straightRatio = useSelector(state=>state.userData.straightRatio);
    const [faceDetected, setFaceDetected] = useState(false);
    const [faceW, setFaceW] = useState(0);
    const [shoulderW, setShoulderW] = useState(0);
    const [status, setStatus] = useState('NOT_DETECTED'); // NOT_DETECTED, TURTLE, STRAIGHT
    const [maxStraightRange, setMaxStraightRange] = useState(0.04);
    
    const getDistance = (p1, p2) => {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);
    }

    const onResults = (results) => {
      if (results.poseLandmarks?.length && results.poseLandmarks[7]) {
        setFaceDetected(true);
        const faceWidth = getDistance(results.poseLandmarks[7], results.poseLandmarks[8]);
        const shoulderWidth = getDistance(results.poseLandmarks[11], results.poseLandmarks[12]);
        setFaceW(Math.round(faceWidth * 100));
        setShoulderW(Math.round(shoulderWidth * 100));
      } else {
        setFaceDetected(false);
        status !== 'NOT_DETECTED' && setStatus('NOT_DETECTED');
        console.log('얼굴 감지되지 않음');
      }
    }

    useEffect(() => {
      const setupCamera = async () => {
        const pose = new Pose({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`;
          },
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });
        
        pose.onResults(onResults);
        
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null
        ) {
          camera = new Camera(webcamRef.current.video, {
            onFrame: async () => {
              await pose.send({ image: webcamRef.current.video });
            },
            width: 1280,
            height: 720,
          });
          camera.start();
        }
      }
      setupCamera();

    }, [webcamRef, webcamRef.current]);

    useEffect(()=>{
      if (!!((faceW / shoulderW) - straightRatio > maxStraightRange)) { status !== 'TURTLE' && setStatus('TURTLE'); }
      else  { status !== 'STRAIGHT' && setStatus('STRAIGHT'); }
    }, [faceW, shoulderW])

    return (
      <div className="webcam-container"
      >
        <PoseStatusHandler status={status}/>
        <div className="webcam-status-wrapper"
          id={status}
        >
          <WebCam 
            autio={"false"}
            ref={webcamRef}
            mirrored={true}
          />
          <button className="set-straight-standard">
            <AiTwotoneSetting onClick={()=>{userApi.setStraightRatio(faceW/shoulderW)}}/>
            <div className="set-straight-standard-description">
              자세가 제대로 측정되지 않는다면<br/>
              버튼을 눌러 바른 자세 기준을 재설정해주세요!
            </div>
          </button>
          {
            faceDetected
            ? <>

          {
            !!((faceW / shoulderW) - straightRatio > maxStraightRange)
            ? <div className="pose-status" id="turtle">
              <BsFillExclamationTriangleFill />
              <span>바르지 않은 자세입니다</span>
            </div>
            : <div className="pose-status" id="straight">
              <BsFillCheckCircleFill />
              <span>올바른 자세입니다</span>
            </div>
          }
            </>
            : <div className="post-not-detected">
              <BsFillExclamationTriangleFill />
              <div className="warning-title">자세가 감지되지 않습니다</div>
              <div>화면에 얼굴이 잘 나오는 지 확인해주세요</div>
            </div>
          }
        </div>
      </div>
    )
}
export default MeasurePose;