import turtleImg from '../../assets/images/neck_stretching_3.png';
import './Intro.scss';

function Intro({ start }) {
    return (
        <div className="turtleneck-test-content-wrapper">
            <img className="intro-image" src={turtleImg}/>
            <div className="test-title">
                거북목 지수 테스트
            </div>
            <div className="test-description">
                나는 거북목일까 아닐까? <br/>
                나의 거북 레벨을 확인해보세요! 🐢
            </div>
            <button
                className="test-start-button"
                onClick={()=>start()}
            >
                거북목 지수 테스트 시작하기
            </button>
        </div>
    )
}
export default Intro;