import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * login - naver
 * Login 페이지를 나가면 자동 로그아웃 처리
 */
const LoginNaver = () => {
    const { naver } = window;
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState("");
    
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: "IhWJSq30No8UR3E9mxpG",
            callbackUrl: "https://jds-components-world.vercel.app/Login",
            isPopup: false, //popup 형식으로 띄울것인지 설정
            loginButton: { color: 'green', type: 1, height: '40' }, //버튼의 스타일, 타입, 크기를 지정
        });
        naverLogin.init();
    };

    const getNaverToken = () => {
        if(!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0];
        if(token){setIsLogin(true); setUserName(token)};

        // console.log(location);
    };

    //현재 코드 useEffect dependency array 이슈있음. (onload로 대체하려고 했으나, js파일 로드 시점이 다른가보다.)
    useEffect(() => {
        initializeNaverLogin();
        getNaverToken();
    });

    return (
        <div>
            {/* id가 꼭 naverIdLogin이어야 함 */}
            <div id="naverIdLogin"></div>
            {isLogin && 
                <p>네이버에 로그인 되었습니다.<br/> 
                    <h6 className="my-2 leading-6">
                        <span className="text-red-500">* 현재 페이지를 나가면 자동 로그아웃 처리</span><br/> 
                        <span>* 네이버 로그인 API에서는 로그아웃 개념이 없다.</span><br/> 
                        token 정보 : {userName}
                    </h6>
                </p>
            }
        </div>
    );
    
};
export default LoginNaver;
