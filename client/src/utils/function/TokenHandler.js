import axios from "axios";
import store from "../../redux/store";
import { setAuth } from "../../redux/userData/userDataAction";

export const getRefreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/v1/token/refresh`, {
            headers: {
                refresh: refreshToken
            }
        });

        // refresh token 유효 -> access token 받고 현재 페이지 reload
        const accessToken = res.data.data.access_token;
        localStorage.setItem('accessToken', accessToken);
        window.location.reload();
    } catch(err) {
        // refresh token도 만료되면 -> 로그아웃
        console.log(err);
        store.dispatch(setAuth(false));
    }
}