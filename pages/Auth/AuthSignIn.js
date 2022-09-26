import { useRef } from "react";
import "../api/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import AuthSignInGoogle from "./AuthSignInGoogle";
import AuthSignInGithub from "./AuthSignInGithub";
import AuthSignInFacebook from "./AuthSignInFacebook";

const AuthSignIn = ({ setUserName, setIsLogin }) => {
    const auth = getAuth();
    const emailRef = useRef();
    const pwRef = useRef();

    //이메일 방식 로그인
    const signIn = () => {
        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            pwRef.current.value
        )
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setUserName(user.email);
                setIsLogin(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                //에러 분기
                if (errorCode === "auth/wrong-password") {
                    alert("패스워드가 일치하지 않습니다.");
                    return;
                } else if (errorCode === "auth/invalid-email") {
                    alert("유효하지 않은 이메일 주소입니다.");
                    return;
                } else {
                    alert("error : " + errorCode);
                }
            });
    };

    return (
        <div>
            <div className="mt-0 font-semibold">Firebase Auth - Sign In</div>
            <div className="text-sm text-red-500 mt-2">
                * 이메일 방식 테스트 계정 : test@gmail.com / qwe123!@#
            </div>

            <div className="flex min-h-full flex-col justify-center py-8 sm:px-4 lg:px-6">
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        ref={emailRef}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        ref={pwRef}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={signIn}
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <AuthSignInGoogle setUserName={setUserName} setIsLogin={setIsLogin}></AuthSignInGoogle>
                                <AuthSignInGithub setUserName={setUserName} setIsLogin={setIsLogin}></AuthSignInGithub>
                                <AuthSignInFacebook setUserName={setUserName} setIsLogin={setIsLogin}></AuthSignInFacebook>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuthSignIn;
