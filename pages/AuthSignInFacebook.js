import Image from "next/image";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const AuthSignInFacebook = ({ setUserName, setIsLogin }) => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();

    const signInFacebook = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential =
                    FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                setUserName(user.displayName);
                setIsLogin(true);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    FacebookAuthProvider.credentialFromError(error);

                alert("error : " + errorCode);
            });
    };

    return (
        <div onClick={signInFacebook}>
            <a
                href="#"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
                <span className="sr-only">Sign in with Facebook</span>
                <Image
                    src="/images/facebook_logo.svg"
                    alt="facebook_logo"
                    width={20}
                    height={20}
                ></Image>
            </a>
        </div>
    );
};
export default AuthSignInFacebook;
