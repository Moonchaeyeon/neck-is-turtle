import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserApi from "../../apis/UserApi";
import axios from "axios";

function Oauth() {
    const userApi = new UserApi();
    const navigation = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();

    useEffect(()=>{
        const getKakaoToken = async () => {
            const res = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${window.location.origin}/oauth&code=${searchParams.get('code')}`);
            const kakaoToken = res.data.access_token;

            await userApi.kakaoLoginHandler(kakaoToken);
            
            console.log('kakao token: ', kakaoToken);
            console.log("code: ", searchParams.get('code'));
            navigation('/');
        }
        getKakaoToken();
    }, [])

    return (
        <div>
            로딩중 ...
        </div>
    )
}
export default Oauth;