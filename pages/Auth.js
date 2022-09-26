import "./api/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";

import AuthSignIn from "./AuthSignIn";
import AuthSignUp from "./AuthSignUp";

const Auth = () => {
    const [userName, setUserName] = useState(); //로그인한 유저 이메일
    const [isLogin, setIsLogin] = useState(); //로그인 유무

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        //로그인 되었는지 확인하기
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //로그인일시
                const uid = user.uid;
                setUserName(user.email);
                setIsLogin(true);
                console.log("로그인 상태");
            } else {
                //미로그인일시
                setIsLogin(false);
                console.log("미로그인 상태");
            }
        });
    }, []);

    const logOut = () => {
        if (window.confirm("로그아웃 처리 하시겠습니까?")) {
            signOut(auth)
                .then(() => {
                    setIsLogin(false);
                    location.reload();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        } else {
            return;
        }
    };

    return (
        <div className="wrap">
            <Link href="/">
                <span className="back">&larr;</span>
            </Link>
            <div className="text-2xl font-semibold mt-2">Auth</div>

            {isLogin && (
                <div className="mt-6">
                    <p>환영합니다. &quot;{userName}&quot;</p>
                    <button className="button" onClick={logOut}>
                        logout
                    </button>
                </div>
            )}

            {!isLogin && (
                <>
                    <div className="card">
                        <AuthSignIn
                            setUserName={setUserName}
                            setIsLogin={setIsLogin}
                        ></AuthSignIn>
                    </div>

                    <div className="card">
                        <AuthSignUp
                            setUserName={setUserName}
                            setIsLogin={setIsLogin}
                        ></AuthSignUp>
                    </div>
                </>
            )}
        </div>
    );
};

export default Auth;
