import Image from "next/image";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const AuthSignInGithub = ({ setUserName, setIsLogin }) => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();

    const signInGithub = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential =
                    GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                // ...
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
                    GithubAuthProvider.credentialFromError(error);
                // ...
                alert("error : " + errorCode);
            });
    };

    return (
        <div onClick={signInGithub}>
            <a
                href="#"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
                <span className="sr-only">Sign in with Github</span>
                <Image
                    src="/images/github_logo.svg"
                    alt="github_logo"
                    width={20}
                    height={20}
                ></Image>
            </a>
        </div>
    );
};
export default AuthSignInGithub;
