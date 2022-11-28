import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import UserApi from "../apis/UserApi";
import WebCam from "react-webcam";
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { BsFillCheckCircleFill, BsFillExclamationTriangleFill } from 'react-icons/bs';
import { AiTwotoneSetting } from 'react-icons/ai';
import './MeasurePose.scss';
import PoseStatusHandler from "./PoseStatusHandler";
import { getDegree } from "../utils/Vector";

let camera;

let saveData = [];

function MeasureAngle({  }) {
    const userApi = new UserApi();
    const webcamRef = useRef();
    const straightRatio = useSelector(state=>state.userData.straightRatio);
    // const straightAngle = useSelector(state=>state.userData.straightAngle);
    const [straightAngle, setStraightAngle] = useState(20);
    const [faceDetected, setFaceDetected] = useState(false);
    const [faceW, setFaceW] = useState(0);
    const [shoulderW, setShoulderW] = useState(0);
    const [angle, setAngle] = useState(20);
    const [status, setStatus] = useState('NOT_DETECTED'); // NOT_DETECTED, TURTLE, STRAIGHT
    const [maxStraightRange, setMaxStraightRange] = useState(15);

    const [saveData, setSaveData] = useState([]);
    
    const getDistance = (p1, p2) => {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);
    }

    const getMidPoint = (p1, p2) => {
      return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, z: (p1.z + p2.z) / 2 };
    }

    const getDirectionVector = (p1, p2) => {
      return { x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z };
    }

    // useEffect(()=>{
    //   console.log(saveData);
    // }, [saveData])

    const onResults = (results) => {
      if (results.poseLandmarks?.length && results.poseLandmarks[7]) {
        setFaceDetected(true);
        const faceWidth = getDistance(results.poseLandmarks[7], results.poseLandmarks[8]);
        const shoulderWidth = getDistance(results.poseLandmarks[11], results.poseLandmarks[12]);
        setFaceW(Math.round(faceWidth * 100));
        setShoulderW(Math.round(shoulderWidth * 100));
        // console.log(shoulderWidth);

        // let p = results.poseLandmarks[7];
        // console.log(Math.round(p.x*100), Math.round(p.y*100), Math.round(p.z*100));

        // const faceMidPoint = getMidPoint(results.poseLandmarks[7], results.poseLandmarks[8]);
        const shoulderMidPoint = getMidPoint(results.poseLandmarks[11], results.poseLandmarks[12]);

        const leftDirectionVector = getDirectionVector(results.poseLandmarks[7], shoulderMidPoint);
        const rightDirectionVector = getDirectionVector(results.poseLandmarks[8], shoulderMidPoint);
        const _angle = getDegree(leftDirectionVector, rightDirectionVector);
        setAngle(_angle);
        // console.log(angle);
        // console.log(90.15 - 2.84*angle+0.03*(angle**2));

        saveData.push({
          "어깨 너비": shoulderWidth,
          "귀사각": _angle,
        });
      } else {
        setFaceDetected(false);
        status !== 'NOT_DETECTED' && setStatus('NOT_DETECTED');
        console.log('얼굴 감지되지 않음');
      }
    }

    useEffect(() => {
        const pose = new Pose({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
          },
        });
        
        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
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
    }, [webcamRef, webcamRef.current]);

    useEffect(()=>{
      if (!!((faceW / shoulderW) - straightRatio > maxStraightRange)) { status !== 'TURTLE' && setStatus('TURTLE'); }
      else  { status !== 'STRAIGHT' && setStatus('STRAIGHT'); }
    }, [faceW, shoulderW])

    // useEffect(()=>{
    //   if (neckDegree > 28) { status !== 'TURTLE' && setStatus('TURTLE'); }
    //   else  { status !== 'STRAIGHT' && setStatus('STRAIGHT'); }
    // }, [neckDegree])

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
            <AiTwotoneSetting onClick={()=>{setStraightAngle(angle); console.log(saveData)}}/>
            <div className="set-straight-standard-description">
              자세가 제대로 측정되지 않는다면<br/>
              버튼을 눌러 바른 자세 기준을 재설정해주세요!
            </div>
          </button>
          {
            faceDetected
            ? <>

          {
            !!(angle - straightAngle > maxStraightRange)
            ? <div className="pose-status" id="turtle">
              <BsFillExclamationTriangleFill />
              <span>바르지 않은 자세입니다</span>
            </div>
            : <div className="pose-status" id="straight">
              <BsFillCheckCircleFill />
              <span>올바른 자세입니다</span>
            </div>
          }
          {/* {
            !!(neckDegree > 28)
            ? <div className="pose-status" id="turtle">
              <BsFillExclamationTriangleFill />
              <span>바르지 않은 자세입니다</span>
            </div>
            : <div className="pose-status" id="straight">
              <BsFillCheckCircleFill />
              <span>올바른 자세입니다</span>
            </div>
          } */}
            </>
            : <div className="post-not-detected">
              <BsFillExclamationTriangleFill />
              <div className="warning-title">자세가 감지되지 않습니다</div>
              <div>화면에 얼굴이 잘 나오는 지 확인해주세요</div>
            </div>
          }

          <div className="curr-status">
            <div>현재 귀 사이 각도 : { Math.round(angle) }</div>
            <div>바른 자세 기준 각도 : { Math.round(straightAngle) }</div>
            <div>차이값 : { Math.round(angle - straightAngle) }</div>
            <div>임계치 : { Math.round(maxStraightRange) }</div>
            <input 
              type="range"
              min="0"
              max="30"
              value={maxStraightRange}
              onChange={(e)=>{setMaxStraightRange(e.target.value)}}
            />
          </div>

        </div>
      </div>
    )
}
export default MeasureAngle;