import { getDegree, getDirectionVector, getMidPoint } from "../Vector";
import step1 from "../../assets/images/neck_stretching_1.jpeg";
import step2 from "../../assets/images/neck_stretching_2.png";
import step3 from "../../assets/images/neck_stretching_3.png";

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
        img: step3,
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
        }
    }
]

export const stretchingList = [
    { id: 'neck', name: '목 스트레칭', thumbnail: step3, steps: neckStretchingSteps },
    { id: 'shoulder', name: '어깨 스트레칭', thumbnail: step1, steps: shoulderStretchingSteps },
]