import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider, googleLogout } from "@react-oauth/google";

/**
 * https://console.cloud.google.com/apis 에서 client_id 가져옴
 */
const LoginGoogle = () => {
    const [isLogin, setIsLogin] = useState(false); //로그인 유무

    const logout = () => {
        setIsLogin(false);
        googleLogout(); //로그아웃 함수
    }

    return(
        <>
            {isLogin === false ?
                <>
                    <GoogleOAuthProvider clientId="690183987906-5i2dkah2ekcg6sth8nsddb49djdnmn9q.apps.googleusercontent.com">
                        <GoogleLogin
                            buttonText="google login"
                            onSuccess={(credentiaReponse) => {
                                console.log(credentiaReponse);
                                setIsLogin(true);
                            }}
                            onError={() => {
                                alert("login Failed");
                            }}
                        />
                    </GoogleOAuthProvider>
                </>
             : 
                <>
                    <button className="button" onClick={logout}>logout</button>
                    <p>구글에 로그인 되었습니다.<br/> 
                    <h6 className="my-2 leading-6">
                        <span className="text-red-500">* 현재 페이지를 나가면 자동 로그아웃 처리</span>
                    </h6>
                </p>
                </> 
             }
        </>
    )
}
export default LoginGoogle;