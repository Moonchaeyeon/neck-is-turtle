import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import './index.scss';

function TurtleTestResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalScore, setTotalScore] = useState(0);
    const [painScore, setPainScore] = useState(0);
    const [habitScore, setHabitScore] = useState(0);
    const [poseScore, setPoseScore] = useState(0);

    useEffect(()=>{
        setTotalScore(searchParams.get('totalScore'));
        setPainScore(searchParams.get('painScore'));
        setHabitScore(searchParams.get('habitScore'));
        setPoseScore(searchParams.get('poseScore'));
    }, [searchParams])

    return (
        <div className="turtleneck-test-result">
            
        </div>
    )
}
export default TurtleTestResult;