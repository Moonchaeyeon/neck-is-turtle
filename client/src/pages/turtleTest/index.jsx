import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Intro from './Intro';
import Question from './Question';
import turtleTestQuestion from './turtleTestQuestion.json';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './index.scss';


function TurtleTest() {
    const navigation = useNavigate();
    const [testStart, setTestStart] = useState(false);
    const [currCategoryIdx, setCurrCategoryIdx] = useState(0);
    const [currQuestionIdx, setCurrQuestionIdx] = useState(0);
    const [currQuestionNum, setCurrQuestionNum] = useState(1);
    const [totalQuestionNum, setTotalQuestionNum] = useState(0);
    const [currQuestionInfo, setCurrQuestionInfo] = useState();
    const [totalScore, setTotalScore] = useState(0);

    // category 별 점수
    const [painScore, setPainScore] = useState(0);
    const [habitScore, setHabitScore] = useState(0);
    const [poseScore, setPoseScore] = useState(0);

    useEffect(()=>{
        let total = 0;
        turtleTestQuestion.forEach((category)=>{
            total += category.questionList.length;
        })
        setTotalQuestionNum(total);
    }, [])

    useEffect(()=>{
        setCurrQuestionInfo(turtleTestQuestion[currCategoryIdx].questionList[currQuestionIdx])
    }, [currCategoryIdx, currQuestionIdx])

    const selectAnswer = (score) => {
        // add score
        let pain = painScore;
        let habit = habitScore;
        let pose = poseScore;


        setTotalScore(totalScore + score);
        const categoryMaxScore = turtleTestQuestion[currCategoryIdx].maxScore;
        switch (currCategoryIdx) {
            case 0:
                pain = painScore + score / categoryMaxScore * 100;
                setPainScore(pain);
                break;
            case 1:
                habit = habitScore + score / categoryMaxScore * 100;
                setHabitScore(habit);
                break;
            case 2:
                pose = poseScore + score / categoryMaxScore * 100;
                setPoseScore(pose);
                break;
            default:
                break;
        }

        // go to next question
        if (currQuestionIdx < turtleTestQuestion[currCategoryIdx].questionList.length - 1) {
            setCurrQuestionIdx(currQuestionIdx + 1);
            setCurrQuestionNum(currQuestionNum + 1);
        } else {
            if (currCategoryIdx < turtleTestQuestion.length - 1) {
                setCurrCategoryIdx(currCategoryIdx + 1);
                setCurrQuestionIdx(0);
                setCurrQuestionNum(currQuestionNum + 1);
            } else {
                // 마지막 문제까지 완료했을 때 결과 페이지로 이동
                navigation(`result?total=${Math.round(totalScore)}&pain=${Math.round(pain)}&habit=${Math.round(habit)}&pose=${Math.round(pose)}`)
            }
        }
    }

    return (
        <div className="turtleneck-test-page">
            <div className="turtleneck-test-page-header">
                <Logo className="logo"/>
            </div>
            {
                testStart
                ? <Question 
                    question={currQuestionInfo?.question}
                    answerList={currQuestionInfo?.answers}
                    selectAnswer={selectAnswer}
                    currQuestionNum={currQuestionNum}
                    totalQuestionNum={totalQuestionNum}
                />
                : <Intro
                    start={()=>{setTestStart(true)}}
                />
            }
        </div>
    )
}
export default TurtleTest;