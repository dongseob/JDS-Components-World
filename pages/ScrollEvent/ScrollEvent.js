import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const meteorData = [
    {
        id: "meteor1",
        src: "/scrollEvent/meteor1.png",
        top: "60%",
        left: "5%",
        width: "23vw",
        height: "23vh",
    },
    {
        id: "meteor2",
        src: "/scrollEvent/meteor2.png",
        top: "24%",
        left: "75%",
        width: "15vw",
        height: "15vh",
    },
    {
        id: "meteor3",
        src: "/scrollEvent/meteor3.png",
        top: "1%",
        left: "56%",
        width: "12vw",
        height: "10vh",
    },
    {
        id: "meteor4",
        src: "/scrollEvent/meteor4.png",
        top: "16%",
        left: "6%",
        width: "8vw",
        height: "8vh",
    },
    {
        id: "meteor5",
        src: "/scrollEvent/meteor5.png",
        top: "50%",
        left: "33%",
        width: "4vw",
        height: "4vh",
    },
    {
        id: "meteor6",
        src: "/scrollEvent/meteor6.png",
        top: "62%",
        left: "65%",
        width: "26vw",
        height: "26vh",
    },
];

const ScrollEvent = () => {
    const spaceManRef = useRef();
    const meteorRef = useRef();
    const textRef = useRef();

    const [spaceManState, setSpaceManState] = useState(12);
    const [spaceManTop, setSpaceManTop] = useState(300);
    const [spaceManLeft, setSpaceManLeft] = useState(12);

    const [meteorState, setMeteorState] = useState(100);

    const [scrollState, setScrollState] = useState(0); //max: 21, 0~12: spaceMan, 12~24: meteor

    // useEffect(() => {
    //     console.log("scrollState : " + scrollState);
    // }, [scrollState]);

    // useEffect(() => {
    //     console.log("spaceManState : " + spaceManState);
    // }, [spaceManState]);

    // useEffect(() => {
    //     console.log("meteorState : " + meteorState);
    // }, [meteorState]);
    
    // useEffect(() => {
    //     console.log("spaceManTop : " + spaceManTop);
    // }, [spaceManTop]);

    // useEffect(() => {
    //     console.log("spaceManLeft : " + spaceManLeft);
    // }, [spaceManLeft]);

    return (
        <div className="wrap">
            <Link href="/">
                <span className="back">&larr;</span>
            </Link>
            <div className="text-2xl font-semibold mt-2">Scroll Event</div>

            <div
                className="mt-12 relative overflow-hidden"
                onWheel={(e) => {
                    //위로 스크롤
                    if (e.deltaY === -200) {
                        if (scrollState > 0) {
                            if (scrollState <= 11) {
                                spaceManRef.current.style.transform =
                                    "scale(" + (spaceManState + 1) + ")";
                                spaceManRef.current.style.top =
                                    spaceManTop + 25;
                                spaceManRef.current.style.left =
                                    spaceManLeft + 1;
                                setSpaceManState(spaceManState + 1);
                                setSpaceManTop(spaceManTop + 25);
                                setSpaceManLeft(spaceManLeft + 1);
                            } else {
                                meteorRef.current.style.left =
                                    meteorState + 10 + "%";
                                setMeteorState(meteorState + 10);
                            }

                            setScrollState(scrollState - 1);
                        }
                        if(scrollState === 21){
                            textRef.current.style.display="none";
                        }
                    }
                    //아래로 스크롤
                    if (e.deltaY === 200) {
                        if (scrollState < 21) {
                            if (scrollState < 11) {
                                spaceManRef.current.style.transform =
                                    "scale(" + (spaceManState - 1) + ")";
                                spaceManRef.current.style.top =
                                    spaceManTop - 25;
                                spaceManRef.current.style.left =
                                    spaceManLeft - 1;
                                setSpaceManState(spaceManState - 1);
                                setSpaceManTop(spaceManTop - 25);
                                setSpaceManLeft(spaceManLeft - 1);
                            } else {
                                meteorRef.current.style.left =
                                    meteorState - 10 + "%";
                                setMeteorState(meteorState - 10);
                            }

                            setScrollState(scrollState + 1);
                        }

                        if(scrollState === 21){
                            textRef.current.style.display="block";
                        }
                    }
                }}
            >
                <div className="w-full h-[600px]">
                    {/* background */}
                    <Image
                        src={"/scrollEvent/bg.jpeg"}
                        layout="fill"
                        objectFit="cover"
                        alt="background"
                    ></Image>

                    {/* spaceMan */}
                    <picture className="w-full h-full flex items-center relative">
                        <img
                            src="/scrollEvent/spaceman.png"
                            alt="spaceman"
                            ref={spaceManRef}
                            className="transition-all duration-500 w-full h-2/3 object-contain object-top absolute"
                            style={{
                                transform: "scale(12)",
                                top: spaceManTop + "%",
                                left: spaceManLeft + "%",
                            }}
                        />
                    </picture>

                    {/* meteor */}
                    <div
                        className="absolute z-10 transition-all w-full h-full"
                        style={{ left: "100%", top: "0" }}
                        ref={meteorRef}
                    >
                        {meteorData.map((el) => (
                            <div key={el.id}>
                                <picture>
                                    <img
                                        src={el.src}
                                        alt={el.id}
                                        className="absolute"
                                        style={{
                                            top: el.top,
                                            left: el.left,
                                            width: el.width,
                                            height: el.height,
                                        }}
                                    />
                                </picture>
                            </div>
                        ))}
                    </div>

                    {/* text */}
                    <div className="absolute top-1/2 left-1/2 bg-black/80 -translate-x-1/2 w-2/3 rounded-lg transition-all hidden z-20" ref={textRef}>
                        <div className="text-5xl font-bold text-slate-100 p-12 text-center">JDS Components World</div>
                    </div>

                    {/* scroll down 안내멘트 */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce rounded-lg z-30">
                        <Image src={"/scrollEvent/scrollIcon.svg"} width={50} height={50} alt={"scrollIcon"}></Image>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ScrollEvent;
