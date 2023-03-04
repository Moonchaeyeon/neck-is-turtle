import { getDegree, getDirectionVector, getDistance, getMidPoint } from "../function/Vector";
import step1 from "../../assets/images/neck_stretching_1.jpeg";
import step2 from "../../assets/images/neck_stretching_2.png";
import step3 from "../../assets/images/neck_stretching_3.png";
import shoulder01 from "../../assets/images/stretching/shoulder01.png";
import shoulder02 from "../../assets/images/stretching/shoulder02.png";
import shoulder03 from "../../assets/images/stretching/shoulder03.png";
import shoulder04 from "../../assets/images/stretching/shoulder04.png";
import { right_elbow, left_elbow, right_wrist, left_wrist } from "./mediapipeDots";

export const neckStretchingSteps = [
    {
        img: step1, 
        action: 
        function(results, setCorrectPose, setAlertText) {   
            if (results.poseLandmarks?.length) {
                const shoulderMid = getMidPoint(results.poseLandmarks[11], results.poseLandmarks[12]);
                const neckDirectionVector = getDirectionVector(shoulderMid, results.poseLandmarks[0]);
                const neckRotateDegree = getDegree(neckDirectionVector, { x: 0, y: 1, z: 0 });

                // 목이 10도 이상 오른쪽으로 기울어져 있다면
                if (neckRotateDegree > 10 && neckDirectionVector.x > 0) {
                    setCorrectPose(true);
                    setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                } else {
                    setCorrectPose(false);
                    if (neckDirectionVector.x <= 0) { setAlertText('머리를 오른쪽으로 기울여주세요'); }
                    else if (neckRotateDegree <= 10) { setAlertText('머리를 좀 더 당겨주세요'); }
                }
            }
        }, 
        text: '머리에 손을 얹은 후 오른쪽으로 천천히 당겨주세요',
        duration: 5,
    },
    {
        img: step2, 
        action: 
        function(results, setCorrectPose, setAlertText) {      
            if (results.poseLandmarks?.length) {
                const shoulderMid = getMidPoint(results.poseLandmarks[11], results.poseLandmarks[12]);
                const neckDirectionVector = getDirectionVector(shoulderMid, results.poseLandmarks[0]);
                const neckRotateDegree = getDegree(neckDirectionVector, { x: 0, y: 1, z: 0 });

                // 목이 10도 이상 왼쪽으로 기울어져 있다면
                if (neckRotateDegree > 10 && neckDirectionVector.x < 0) {
                    setCorrectPose(true);
                    setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                } else {
                    setCorrectPose(false);
                    if (neckDirectionVector.x >= 0) { setAlertText('머리를 왼쪽으로 기울여주세요'); }
                    else if (neckRotateDegree <= 10) { setAlertText('머리를 좀 더 당겨주세요'); }
                }
            }
        }, 
        text: '머리에 손을 얹은 후 왼쪽으로 천천히 당겨주세요', 
        duration: 5,
    },
    {
        img: step3, 
        action: 
        function(results, setCorrectPose, setAlertText) {      
            if (results.poseLandmarks?.length) {
                const raiseRightArm = results.poseLandmarks[12].y > results.poseLandmarks[14].y;
                const raiseLeftArm = results.poseLandmarks[11].y > results.poseLandmarks[13].y;

                // 양 팔을 모두 들었다면
                if (raiseLeftArm && raiseRightArm) {
                    setCorrectPose(true);
                    setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                } else {
                    setCorrectPose(false);
                    setAlertText('깍지 낀 손을 높게 들어주세요');
                }
            }
        }, 
        text: '손에 깍지를 끼고 기지개를 펴듯 올려볼게요', 
        duration: 5,
    },
]

export const shoulderStretchingSteps = [
    {
        img: shoulder01, 
        action: 
        function(results, setCorrectPose, setAlertText) { 
            const poseLandmarks = results.poseLandmarks;     
            if (poseLandmarks?.length) {
                const leftElbow = poseLandmarks[left_elbow];
                const rightWrist = poseLandmarks[right_wrist];

                // 오른쪽 손목이 왼쪽 어깨와 맞닿았다면
                if (getDistance(leftElbow, rightWrist) < 1) {
                    setCorrectPose(true);
                    setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                } else {
                    setCorrectPose(false);
                    setAlertText('오른손을 왼쪽 어깨에 올려주세요');
                }
            }
        }, 
        text: '어깨 뒤쪽 근육을 시원하게 풀어줄거예요. 오른손을 왼쪽 어깨에 올리고, 왼손으로 오른쪽 팔꿈 치를 잡은뒤, 지그시 당겨주세요. 5초간 유지합니다.',
        duration: 5,
    },
    {
        img: shoulder02, 
        action: 
        function(results, setCorrectPose, setAlertText) { 
            const poseLandmarks = results.poseLandmarks;     
            if (poseLandmarks?.length) {
                const rightElbow = poseLandmarks[right_elbow];
                const leftWrist = poseLandmarks[left_wrist];

                // 왼쪽 손목이 오른쪽 어깨와 맞닿았다면
                if (getDistance(rightElbow, leftWrist) < 1) {
                    setCorrectPose(true);
                    setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                } else {
                    setCorrectPose(false);
                    setAlertText('왼손을 오른쪽 어깨에 올려주세요');
                }
            }
        }, 
        text: '다음은 왼손을 오른쪽 어깨에 올리고, 오른손으로 왼쪽 팔꿈치를 잡은뒤, 지그시 당겨주세요.', 
        duration: 5,
    },
    {
        img: shoulder03, 
        action: 
        function(results, setCorrectPose, setAlertText) { 
            const poseLandmarks = results.poseLandmarks;     
            if (poseLandmarks?.length) {
                const leftElbow = poseLandmarks[left_elbow];
                const rightWrist = poseLandmarks[right_wrist];

                // 오른쪽 손목이 왼쪽 어깨와 맞닿았다면
                if (getDistance(leftElbow, rightWrist) < 1) {
                    setCorrectPose(true);
                    setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                } else {
                    setCorrectPose(false);
                    setAlertText('오른 팔을 왼쪽으로 당겨주세요');
                }
            }
        }, 
        text: '오른쪽 팔을 펴고 왼쪽 팔을 이용하여 몸통 방향으로 끌어당깁니다. 이때 머리는 오른쪽 방향으 로 돌립니다. 이 자세를 5초간 유지합니다.', 
        duration: 5,
    },
    {
        img: shoulder04, 
        action: 
        function(results, setCorrectPose, setAlertText) { 
            const poseLandmarks = results.poseLandmarks;     
            if (poseLandmarks?.length) {
                const rightElbow = poseLandmarks[right_elbow];
                const leftWrist = poseLandmarks[left_wrist];

                // 왼쪽 손목이 오른쪽 어깨와 맞닿았다면
                if (getDistance(rightElbow, leftWrist) < 1) {
                    setCorrectPose(true);
                    setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                } else {
                    setCorrectPose(false);
                    setAlertText('왼팔을 오른쪽으로 당겨주세요');
                }
            }
        }, 
        text: '왼쪽 팔을 펴고 오른쪽 팔을 이용하여 몸통 방향으로 끌어당깁니다. 이때 머리는 왼쪽 방향으로 돌립니다. 이 자세를 5초간 유지합니다.', 
        duration: 5,
    },
]

export const stretchingList = [
    { id: 'neck', name: '목 스트레칭', description: '목 뻐근한 사람들 여기여기 모여라~', thumbnail: step3, steps: neckStretchingSteps },
    { id: 'shoulder', name: '어깨 스트레칭', description: '같이 어깨를 시원하게 풀어보자구요!', thumbnail: shoulder01, steps: shoulderStretchingSteps },
]