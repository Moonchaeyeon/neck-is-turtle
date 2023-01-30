import { useDispatch } from 'react-redux';
import { setShowLoginModal } from '../../redux/modal/modalAction';
// import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import UserApi from '../../apis/UserApi';
import Modal from '../modal/Modal';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { ReactComponent as KakaoLogo } from '../../assets/svg/kakao.svg';
import { BsFillHexagonFill } from 'react-icons/bs';
import './index.scss';

function LoginModal() {
    const dispatch = useDispatch();
    const userApi = new UserApi();

    const kakaoLogin = () => {
        let redirectUrl = `${window.location.origin}/oauth`
        window.location.href=`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${redirectUrl}`;
    }

    const loginSuccess = (res) => {
        const userInfo = jwt_decode(res.credential);
        const { email, name, picture } = userInfo;
        userApi.loginHandler(email, name, picture);
    }

    return (
        <Modal displayType={"center"} closeModal={()=>{dispatch(setShowLoginModal(false))}}>
            <div className="login-modal modal-wrapper">
                <div className="modal-header">
                    <Logo id="logo"/>
                    <div className="modal-title">시작하기</div>
                    <div className="modal-description">
                        목이 거북해와 함께 바른 자세 습관을 길러보세요
                    </div>
                </div>
                <div className="modal-content">
                {/* <GoogleLogin
                    onSuccess={loginSuccess}
                    onFailure={(res)=>console.log("login fail", res)}
                /> */}
                <button 
                    className="login-button login-button--kakao"
                    onClick={()=>{kakaoLogin()}}
                >
                    <KakaoLogo />
                    카카오로 시작하기
                </button>
                </div>
                <div className="hexagon-wrapper">
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                </div>
            </div>
        </Modal>
    )
}
export default LoginModal;