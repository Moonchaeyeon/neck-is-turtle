import turtleImg from '../../assets/images/neck_stretching_3.png';

function Intro() {
    return (
        <div className="turtleneck-test-content-wrapper">
            <div className="">
                거북목 테스트
            </div>
            <img className="intro-image" src={turtleImg}/>
            <button
                className="test-start-button"
            >
                거북목 지수 테스트 시작하기
            </button>
        </div>
    )
}
export default Intro;