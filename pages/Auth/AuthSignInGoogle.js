import Image from "next/image";
import "../api/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const AuthSignInGoogle = ({ setUserName, setIsLogin }) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUserName(user.email);
                setIsLogin(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential =
                    GoogleAuthProvider.credentialFromError(error);

                //에러 분기
                if (errorCode == "auth/unauthorized-domain") {
                    alert(
                        "인증되지 않은 도메인입니다. 관리자에게 문의해주세요."
                    );
                } else {
                    alert("error : " + errorCode);
                }
            });
    };

    return (
        <div onClick={signInGoogle}>
            <a
                href="#"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
                <span className="sr-only">Sign in with Google</span>
                <Image
                    src="/images/google_logo.svg"
                    alt="google_logo"
                    width={20}
                    height={20}
                ></Image>
            </a>
        </div>
    );
};
export default AuthSignInGoogle;
