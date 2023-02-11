import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import resultList from './resultList.json';
import serviceList from './serviceList.json';
import categoryAnalysisList from './categoryAnalysisList.json';
import MobileTemplate from "../../../components/mobile";
import {ReactComponent as KakaoIcon} from '../../../assets/svg/kakao.svg';
import './index.scss';

function TurtleTestResult() {
    const navigation = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalScore, setTotalScore] = useState(0);
    const [result, setResult] = useState();
    const [categoryResultList, setCategoryResultList] = useState([]);
    const [categoryAnalysis, setCategoryAnalysis] = useState("");

    useEffect(()=>{
        if (categoryResultList.length) {
            let maxScore = 0;
            let maxCategoryId;
            for(let el of categoryResultList) {
                if (maxScore < el.score) {
                    maxScore = el.score;
                    maxCategoryId = el.id;
                }
            }
            let tempCategoryAnalysis = categoryAnalysisList.find(el=>el.id === maxCategoryId);
            setCategoryAnalysis(result?.level < 3 ? tempCategoryAnalysis.analysisList[0] : tempCategoryAnalysis.analysisList[1]);
        }
    }, [result, setCategoryResultList])
    
    useEffect(()=>{
        setTotalScore(Number(searchParams.get('total')));
        setCategoryResultList([
            { id: 'pain', name: '통증', score: Number(searchParams.get('pain')) },
            { id: 'habit', name: '생활', score: Number(searchParams.get('habit')) },
            { id: 'pose', name: '자세', score: Number(searchParams.get('pose')) }
        ])
    }, [searchParams])

    const kakaotalkShare = async () => {
        const kakaoShareInfo = {
            objectType: 'feed',
            content: {
                title: `거북목 테스트 결과 확인하기`,
                description: `${result.title} 입니다.`,
                imageUrl: result.image,
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            social: {
            },
            buttons: [
                {
                    title: `거북목 지수 확인하러 가기`,
                    link: {
                        mobileWebUrl: `https://neckisturtle.com/test/turtleneck`,
                        webUrl: `https://neckisturtle.com/test/turtleneck`,
                    },
                }
            ],
        };

        window.Kakao.Share.sendDefault(kakaoShareInfo);
    }

    useEffect(()=>{
        // 현재에 맞는 조건을 찾음
        for (let el of resultList) {
            if (totalScore <= el.maxScore) {
                setResult(el);
                break;
            }
        }
    }, [totalScore])

    return (
        <MobileTemplate>
        <div className="turtleneck-test-result">
            {
                result &&
                <div>
                    <h1 className="result-title">
                        당신은 <span>{result.title}</span> 입니다
                    </h1>
                    <img className="result-image" src={result.image} />
                    <div
                        className="result-text-wrapper"
                    >
                        {
                            result.analysisList.map((text, idx)=>(
                                <div key={idx} className="result-text">{text}</div>
                            ))
                        }
                        {
                            categoryAnalysis && 
                            <div className="result-text">
                                { categoryAnalysis }
                            </div>
                        }
                    </div>
                </div>
            }
            <div className="category-result-wrapper">
                {
                    categoryResultList?.map((categoryResult, idx)=>(
                        <div className="category-result-elem" key={idx}>
                            <div className="category-result-title">{categoryResult.name}</div>
                            <div className="category-result-scorebar">
                                <div 
                                    className="category-result-scorebar-inner" 
                                    style={{width: `${categoryResult.score}%`}}
                                    id={categoryResult.score > 50 ? 'over-50' : 'under-50'}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="service-wrapper">
                {
                    serviceList.map((service, idx)=>(
                        <div className="service-elem">
                            <div className="service-title">{service.title}</div>
                            <button
                                className="service-button"
                                onClick={()=>{navigation(service.buttonLink)}}
                            >
                                { service.buttonText }
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className="share-wrapper">
                <div className="share-text">친구들에게 공유하기</div>
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
        </div>
        </MobileTemplate>
    )
}
export default TurtleTestResult;