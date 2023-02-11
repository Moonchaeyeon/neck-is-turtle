import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import resultList from './resultList.json';
import MobileTemplate from "../../../components/mobile";
import {ReactComponent as KakaoIcon} from '../../../assets/svg/kakao.svg';
import './index.scss';

function TurtleTestResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalScore, setTotalScore] = useState(0);
    const [result, setResult] = useState();
    const [categoryResultList, setCategoryResultList] = useState([]);

    useEffect(()=>{
        setTotalScore(searchParams.get('totalScore'));
        setCategoryResultList([
            { name: '통증', score: searchParams.get('pain') },
            { name: '생활', score: searchParams.get('habit') },
            { name: '자세', score: searchParams.get('pose') }
        ])
    }, [searchParams])

    const kakaotalkShare = async () => {
        const kakaoShareInfo = {
            objectType: 'feed',
            content: {
                title: `거북목 테스트 결과 확인하기`,
                description: ``,
                imageUrl: result.image,
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            social: {
                //   likeCount: parseInt(post?.likedNum),
                //   commentCount: parseInt(commentList?.length),
                //   sharedCount: 845,
            },
            buttons: [
                {
                    title: `나도 하러가기`,
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                }
            ],
        };

        window.Kakao.Share.sendDefault(kakaoShareInfo);
    }

    useEffect(()=>{
        // 현재에 맞는 조건을 찾음
        resultList.forEach((el)=>{
            if (totalScore <= el.maxScore) {
                setResult(el);
            }
        })
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