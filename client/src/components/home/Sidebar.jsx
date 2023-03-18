import { useDispatch, useSelector } from 'react-redux';
import { setShowLoginModal } from '../../redux/modal/modalAction';
import defaultProfile from '../../assets/images/default_profile.png';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { BsArrowRightShort } from 'react-icons/bs';
import './Sidebar.scss';

function Sidebar() {
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.userData.auth);
    const userPicture = useSelector(state=>state.userData.picture);
    const userName = useSelector(state=>state.userData.name);

    const linkList = [
        { title: "스트레칭 하러 가기 🧘‍♀️", href: "https://neckisturtle.com/stretching" },
        { title: "나의 거북 지수는? 🐢", href: "https://neckisturtle.com/test/turtleneck" },
        { title: "지금 내 목에 가해지고 있는 하중은? 💪", href: "https://neckisturtle.com/check-pose" },
    ]

    return (
        <div className="sidebar">
            <Logo className="logo"/>
            {
                auth
                ? <>
                <img className="user-profile" src={userPicture ? userPicture : defaultProfile} onError={(e)=>{e.currentTarget.src=defaultProfile}}/>
                <div className="user-name-wrapper">
                    <div className="user-name">{ auth ? userName : "방울토망토" }</div>
                </div>
                <div className="link-container">
                    {
                        linkList.map((linkInfo, idx)=>(
                            <a
                                className="link-wrapper"
                                href={linkInfo.href}
                            >
                                <span className="text">{linkInfo.title}</span>
                                <BsArrowRightShort />
                            </a>
                        ))
                    }
                </div>
                </>
                : <button className="go-to-login" onClick={()=>{dispatch(setShowLoginModal(true))}}>
                    로그인 하러 가기
                </button>
            }

        </div>
    )
}
export default Sidebar;