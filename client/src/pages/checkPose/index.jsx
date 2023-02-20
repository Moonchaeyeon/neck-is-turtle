import { useState, useEffect } from "react";
import { Pose } from '@mediapipe/pose';
import MobileTemplate from "../../components/mobile";
import './index.scss';
import { useRef } from "react";
import { left_ear, right_ear, left_shoulder, nose, right_shoulder } from "../../utils/data/mediapipeDots";
import { getDegree, getMidPoint, getDirectionVector } from "../../utils/Vector";
import { BsCameraFill } from "react-icons/bs";
import { ReactComponent as KakaoIcon } from '../../assets/svg/kakao.svg';

function CheckPose() {
    const [image, setImage] = useState(null);
    const [faceDetected, setFaceDetected] = useState(false);
    const [neckDegree, setNeckDegree] = useState(0);
    const [neckWeight, setNeckWeight] = useState(0);
    const imgRef = useRef();

    const kakaotalkShare = async () => {
        const kakaoShareInfo = {
            objectType: 'feed',
            content: {
                title: `거북목 측정하기`,
                description: `측면 사진으로 거북목을 측정해보게나!`,
                imageUrl: ``,
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            social: {
            },
            buttons: [
                {
                    title: `거북목 측정하러 가기! 🐢`,
                    link: {
                        mobileWebUrl: `https://neckisturtle.com/check-pose`,
                        webUrl: `https://neckisturtle.com/check-pose`,
                    },
                }
            ],
        };

        window.Kakao.Share.sendDefault(kakaoShareInfo);
    }

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
            setNeckWeight(neckDegree < 0 ? 4 : Math.round(4 + (neckDegree / 15) * 6));
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
                <div className="check-pose-title">거북목 측정</div>
                <div className="check-pose-descripton">측면 사진으로 자네의 자세를 측정해보게나</div>
                <input 
                    type="file"
                    accept="image/*"
                    id="pose-image-input"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            setImage(e.target.result);
                        }
                        reader.readAsDataURL(file);
                    }}
                />
                {
                    image
                    ? <>
                    <img className="pose-image" ref={imgRef} src={image}/>
                    <label
                        className="pose-image-input-label"
                        htmlFor="pose-image-input"
                    >
                        <BsCameraFill /> 다른 사진으로 테스트 해보기
                    </label>
                    <div className="report-content-text">
                        {
                            faceDetected
                            ? <div>
                                <div>자네의 목 각도는 <b>{Math.round(neckDegree)}°</b> 이라네.</div>
                                <div>지금 <b>목에 { Math.round(neckWeight) }kg의 하중</b>이 가해지고 있는 셈이지.</div>
                                {
                                    neckDegree > 30
                                    ? <>
                                        <div>자네는 상당한 <b>거북목</b>이군, 🐢</div>
                                        <div>좀 더 바른 습관을 가질 필요가 있겠어.</div>
                                    </>
                                    : <>
                                        <div>자네의 자세는 아직 <b>바른 편이라고 할 수 있겠군</b> 😎</div>
                                    </>
                                }
                                <div>기본으로 목에 가해지는 하중이 4kg이니,</div>
                                <div>자네의 목에는 <b>{ Math.round(neckWeight) - 4 }kg</b>의 힘이 추가적으로 가해지고 있군.</div>
                                {
                                    Math.round(neckWeight) - 4 > 0
                                    ? <>
                                        <div>금방 거북이가 되고 싶지 않으면 조심하는 게 좋을테야.</div>
                                        <div>우리 서비스를 통해 <b>바른 자세 습관</b>을 가져보는 게 어떻겠나?</div>
                                    </>
                                    : <>
                                        <div>자네는 바른 자세를 유지하고 있지만, 결코 방심하면 안된다네.</div>
                                        <div>우리 서비스를 통해 <b>지속적으로 바른 자세</b>를 유지해보는 게 어떻겠나?</div>
                                    </>
                                }
                            </div>
                            : <div>
                                <div>얼굴이 감지되지 않았다네, 🥲</div>
                                <div>다른 사진으로 <b>다시 시도</b>해주겠나?</div>
                            </div>
                        }
                    </div>
                    </>
                    : <>
                        <label
                            className="pose-image-input-label-inital"
                            htmlFor="pose-image-input"
                        >
                            <BsCameraFill className="camera-icon"/> 
                            <div>측면 사진 업로드 하기</div>
                        </label>
                        <div className="pose-image-input-notice">업로드한 사진은 서버에 저장하지 않으니, 안심해도 된다네.</div>
                    </>
                }
                <div className="share-button-wrapper">
                    <div 
                        className="share-button"
                        id="kakao" 
                        onClick={kakaotalkShare}
                    >
                        <KakaoIcon />
                    </div>
                </div>
            </div>
        </MobileTemplate>
    )
}
export default CheckPose;