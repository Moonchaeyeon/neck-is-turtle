import { useEffect } from 'react';
import { useState } from 'react';
import Intro from './Intro';
import turtleTestQuestion from './turtleTestQuestion.json';
import './index.scss';

function TurtleTest() {
    const [testStart, setTestStart] = useState(false);
    const [currCategoryIdx, setCurrCategoryIdx] = useState(0);
    const [currQuestionIdx, setCurrQuestionIdx] = useState(0);
    const [currQuestionInfo, setCurrQuestionInfo] = useState();
    const [totalScore, setTotalScore] = useState(0);

    useEffect(()=>{
        setCurrQuestionInfo(turtleTestQuestion[currCategoryIdx].questionList[currQuestionIdx])
    }, [currCategoryIdx, currQuestionIdx])

    const selectAnswer = (score) => {
        const categoryMaxScore = turtleTestQuestion[currCategoryIdx].maxScore;
        setTotalScore(totalScore + score);

        // go to next question
        if (currQuestionIdx < turtleTestQuestion[currCategoryIdx].questionList.length - 1) {
            setCurrQuestionIdx(currQuestionIdx + 1);
        } else {
            if (currCategoryIdx < turtleTestQuestion.length - 1) {
                setCurrCategoryIdx(currCategoryIdx + 1);
                setCurrQuestionIdx(0);
            } else {
                // 마지막 문제까지 완료했을 때
                console.log("done!!")
            }
        }
    }

    return (
        <div className="turtleneck-test-page">
            <h1>거북목 테스트</h1>
            {
                testStart
                ? <div className="turtleneck-test-content-wrapper">
                    <div className="question-title">{currQuestionInfo?.question}</div>
                    <div className="answer-container">
                    {
                        currQuestionInfo?.answers?.map((answer, idx)=>(
                            <div 
                                className="answer-title"
                                key={idx}
                                onClick={()=>{selectAnswer(answer.score)}}
                            >
                                {answer.answer}
                            </div>
                        ))
                    }
                    </div>
                </div>
                : <Intro />
            }
        </div>
    )
}
export default TurtleTest;