import { useState, useEffect } from "react";
import { Pose } from '@mediapipe/pose';
import MobileTemplate from "../../components/mobile";
import './index.scss';
import { useRef } from "react";
import { left_ear, right_ear, left_shoulder, nose, right_shoulder } from "../../utils/data/mediapipeDots";
import { getDegree, getMidPoint, getDirectionVector } from "../../utils/Vector";

function CheckPose() {
    const [image, setImage] = useState(null);
    const [faceDetected, setFaceDetected] = useState(false);
    const [neckDegree, setNeckDegree] = useState(0);
    const imgRef = useRef();

    const onResults = (results) => {
        if (results.poseLandmarks?.length) {
            setFaceDetected(true);

            let leftEar = results.poseLandmarks[left_ear];
            let rightEar = results.poseLandmarks[right_ear];
            let leftShoulder = results.poseLandmarks[left_shoulder];
            let rightSoulder = results.poseLandmarks[right_shoulder];
            
            let ear = (leftEar.z > rightEar.z) ? leftEar : rightEar;
            let shoulderMid = getMidPoint(leftShoulder, rightSoulder);

            let degree = getDegree(getDirectionVector(shoulderMid, ear), {x: 0, y: 1});
            setNeckDegree(degree < 0 ? 0 : degree);
        } else {
            setFaceDetected(false);
        }
    }

    useEffect(()=>{
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
              typeof imgRef.current !== "undefined" &&
              imgRef.current !== null
            ) {
                console.log(imgRef.current);
                await pose.send({ image: imgRef.current });
            }
          }
          setupCamera();
    }, [imgRef, imgRef.current, image])

    return (
        <MobileTemplate>
            <div className="check-pose-page">
                <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            setImage(e.target.result);
                        }
                        reader.readAsDataURL(file);
                    }}
                />
                <img ref={imgRef} src={image}/>
                {
                    image &&
                    <div className="report-content-text">
                        {
                            faceDetected
                            ? <div>
                                <div>자네의 목 각도는 <b>{Math.round(neckDegree)}°</b> 이라네.</div>
                                <div>지금 <b>목에 { Math.round(4 + (neckDegree / 15) * 6) }kg의 하중</b>이 가해지고 있는 셈이지.</div>
                            </div>
                            : <div>
                                얼굴이 감지되지 않았다네, 다른 사진으로 다시 시도해주겠나?
                            </div>
                        }
                    </div>
                }
            </div>
        </MobileTemplate>
    )
}
export default CheckPose;