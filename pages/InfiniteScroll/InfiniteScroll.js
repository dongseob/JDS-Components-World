import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const InfiniteScroll = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(false);
    const preventRef = useRef(true); //중복 실행 방지
    const obsRef = useRef(null); //observer element

    useEffect(() => {
        getDog();
        const observer = new IntersectionObserver(obsHandler, {
            threshold: 0.5,
        });
        if (obsRef.current) {
            observer.observe(obsRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        getDog();
    }, [page]);

    const obsHandler = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && preventRef.current) {
            preventRef.current = false; //옵저버 중복 실행 방지
            setPage((prev) => prev + 1); //페이지 값 증가
        }
    };

    const getDog = useCallback(async () => {
        //불러오기
        console.log("고양이 사진 불러오기");
        setLoad(true); //로딩 시작
        const res = await axios({
            method: "GET",
            url: `https://api.thecatapi.com/v1/images/search`,
        });
        if (res.data) {
            console.log(res.data);
            setList((prev) => [...prev, { ...res.data[0] }]); //리스트 추가
            preventRef.current = true;
        } else {
            console.log(res); //에러
        }
        setLoad(false); //로딩 종료
    }, [page]);

    return (
        <>
            <div className="wrap min-h-[100vh]">
                <Link href="/">
                    <span className="back">&larr;</span>
                </Link>
                <div className="text-2xl font-semibold mt-2">
                    Infinite Scroll
                </div>

                <div className="card">
                    💡&emsp;IntersectionObserver를 활용한 고양이 무한 불러오기
                </div>
                {list && (
                    <div className="mt-6">
                        {list.map((el) => (
                            <>
                                <picture>
                                    <img
                                        key={el.id}
                                        className="opacity-100 mx-auto mb-6 rounded-md"
                                        src={el.url}
                                        alt={el.url}
                                        width={"80%"}
                                        height={"300px"}
                                    />
                                </picture>
                            </>
                        ))}
                    </div>
                )}
                {load && (
                    <div className="fixed w-full h-full flex items-center justify-center z-30 top-0 left-0">
                        <div className="bg-black/80 text-white p-12 rounded-lg text-lg">
                            Loading...
                        </div>
                    </div>
                )}

                <div
                    ref={obsRef}
                    // className="py-3 bg-red-500 text-white text-center"
                >
                    {/* 옵저버 Element */}
                </div>
            </div>
        </>
    );
};

export default InfiniteScroll;
