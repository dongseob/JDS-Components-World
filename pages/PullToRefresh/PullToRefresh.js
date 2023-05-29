import Link from "next/link";
import PullToRefresh2 from "react-simple-pull-to-refresh";

const PullToRefresh = () => {
    return (
        <div className="wrap h-screen">
            <Link href="/">
                <span className="back">&larr;</span>
            </Link>
            <PullToRefresh2 onRefresh={() => window.location.reload()}>
                <div className="text-2xl font-semibold mt-2">PullToRefresh</div>
                <div className="card text-sm">
                    💡&emsp;사용 라이브러리 :{" "}
                    <a
                        href="https://github.com/thmsgbrt/react-simple-pull-to-refresh"
                        className="text-blue-500"
                    >
                        react-simple-pull-to-refresh
                    </a>
                </div>
                당겨서 새로고침 ↓
            </PullToRefresh2>
        </div>
    );
};
export default PullToRefresh;
