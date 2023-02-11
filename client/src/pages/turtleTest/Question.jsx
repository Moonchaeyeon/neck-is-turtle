import { useEffect } from 'react';
import { useState } from 'react';
import { Transition } from 'react-transition-group';
import './Question.scss';

function Question ({ question, answerList, selectAnswer, currQuestionNum, totalQuestionNum }) {
    const [prevQuestionNum, setPrevQuestionNum] = useState(0);

    useEffect(()=>{
        setPrevQuestionNum(currQuestionNum);
    }, [currQuestionNum])

    return (
        <div className="turtleneck-test-content-wrapper">
            <div className="progress-bar">
                <div className="progress-bar-inner" style={{width: `${currQuestionNum / totalQuestionNum * 100}%`}}></div>
            </div>
            <Transition in={prevQuestionNum !== currQuestionNum} timeout={3000} appear>
                {(status)=>(
                    <div className={`turtleneck-test-content page-${status}`}>
                        <div className="question-idx">Q{currQuestionNum}.</div>
                        <div className="question-title">{question}</div>
                        <div className="answer-container">
                        {
                            answerList.map((answer, idx)=>(
                                <div 
                                    className="answer-elem"
                                    key={idx}
                                    onClick={()=>{selectAnswer(answer.score)}}
                                >
                                    {answer.answer}
                                </div>
                            ))
                        }
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    )
}
export default Question;