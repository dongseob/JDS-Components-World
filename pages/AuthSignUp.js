import { useRef } from "react";
import "./api/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const AuthSignUp = ({ setUserName, setIsLogin }) => {
    const auth = getAuth();
    const emailRef = useRef();
    const pwRef = useRef();

    //이메일 방식 로그인
    const signUp = () => {
        if (window.confirm("입력하신 정보로 회원가입 하시겠습니까?")) {
            createUserWithEmailAndPassword(auth, emailRef.current.value, pwRef.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert(
                        "정상 등록 되었습니다.\n자동 로그인 처리 됩니다."
                    );
                    setIsLogin(true);
                    setUserName(user.email);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    //에러 분기
                    if (errorCode == "auth/email-already-in-use") {
                        alert(
                            "제공된 이메일을 기존 사용자가 이미 사용 중입니다."
                        );
                        return;
                    } else if (errorCode == "auth/invalid-email") {
                        alert("유효하지 않은 이메일 주소입니다.");
                        return;
                    } else {
                        alert("error : " + errorCode);
                    }
                });
        }
    };

    return (
        <div>
            <div className="mt-0 font-semibold">Firebase Auth - Sign Up</div>

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
                                    onClick={signUp}
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuthSignUp;
