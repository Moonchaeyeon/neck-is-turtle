import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function Oauth() {
    const navigation = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();

    useEffect(()=>{
        const getKakaoToken = async () => {
            // const res = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${window.location.origin}/oauth&code=${searchParams.get('code')}`);
            // const kakaoToken = res.data.access_token;
            // console.log('kakao token', kakaoToken);
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