import { useState, useEffect, useRef } from "react";

const SearchRecord = () => {
    const [isInput, setIsInput] = useState(true); // 최근검색어 화면을 띄울지 말지 결정
    const [isInputVal, setIsInputVal] = useState(""); // 인풋에 담긴 값 실시간 저장
    const [storageItem, setStorageItem] = useState(null);
    const inputRef = useRef(null);

    // 검색 실행 함수
    const fnSubmit = (e, val) => {
        e.preventDefault(); // 페이지 이동 막음

        if (val === "" || val.length === 0) {
            alert("검색어를 입력해주세요");
            return;
        }

        addStorage(e, val); // 아이템 저장 함수

        // alert(val + "로 검색하셨군요 검색결과 화면은 준비중입니다.");
    };

    // 로컬스토리지에 아이템 저장
    const addStorage = (e, val) => {
        let storageItem = JSON.parse(localStorage.getItem("최근검색어"));

        console.log("yogiyo1 : ", storageItem);

        if (storageItem !== null) {
            // 로컬스토리지에 값이 존재한지 확인
            if (storageItem.includes(val)) {
                // 입력한 값이 기존에 존재하는 아이템이라면 삭제한 후, 다시 저장
                removeStorage(e, val); // 중복 아이템 제거

                let storageItem = JSON.parse(
                    localStorage.getItem("최근검색어")
                );
                storageItem.push(val); // 기존값과 합침
                localStorage.setItem("최근검색어", JSON.stringify(storageItem)); // 로컬스토리지에 기존값과 합쳐서 저장
                setStorageItem(storageItem);
            } else {
                // 입력한 값이 기존에 존재하지 않다면
                storageItem.push(val); // 기존값과 합침
                localStorage.setItem("최근검색어", JSON.stringify(storageItem)); // 로컬스토리지에 기존값과 합쳐서 저장
                setStorageItem(storageItem);
            }
        } else {
            localStorage.setItem("최근검색어", val); // 로컬스토리지에 아무값도 없을때 저장
            setStorageItem(storageItem);
        }
    };

    // 로컬스토리지에 아이템 제거
    const removeStorage = (e, val) => {
        // 선택한 값을 제외한 배열 다시 생성하여 저장하는 프로세스
        let storageItem = JSON.parse(localStorage.getItem("최근검색어"));
        let result = storageItem.filter((el) => el !== val);
        localStorage.setItem("최근검색어", JSON.stringify(result));
        setStorageItem(result);
        e.stopPropagation(); // 이벤트 버블링 방지
    };

    useEffect(() => {
        // 값이 없으면 초기화
        if (localStorage.getItem("최근검색어") === null) {
            localStorage.setItem("최근검색어", JSON.stringify([])); //초기화 용도
        }

        let storageItem = JSON.parse(localStorage.getItem("최근검색어"));

        // 최초 스토리지에 아이템이 있다면 셋팅
        if (storageItem !== null) {
            setStorageItem(storageItem);
        }
    }, []);

    return (
        <div className="card">
            <div className="mt-0 font-semibold">최근 검색어</div>

            <div className="mt-4">
                <form
                    onSubmit={(e) => fnSubmit(e, isInputVal)}
                    className="px-[18px] relative flex"
                >
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        onClick={() => setIsInput(false)}
                        onChange={(e) => setIsInputVal(e.target.value)}
                        ref={inputRef}
                        className="h-[44px] bg-[#eeeeee] rounded-[12px] py-[8px] px-[16px] pr-[140px] placeholder:text-[16px] placeholder:text-[#888888] placeholder:text-font-semibold w-full"
                    />

                    <button
                        type="submit"
                        className="flex absolute right-[28px] self-center rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        검색
                    </button>
                    {isInputVal.length > 0 && (
                        // 검색 인풋에 값을 1글자 이상 넣을 때 출력, isInputVal 초기화 용도
                        <button
                            onClick={() => {
                                setIsInputVal("");
                                inputRef.current.value = "";
                            }}
                            type="submit"
                            className="flex absolute right-[80px] self-center rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            지우기
                        </button>
                    )}
                </form>
                <div className="px-[18px] my-[24px]">
                    <p className="font-bold">최근 검색 목록</p>
                    <ul className="mt-[12px]">
                        {storageItem !== null && (
                            <>
                                {storageItem
                                    .slice(0) // 배열 반전
                                    .reverse() // 배열 반전
                                    .map((el) => (
                                        <li
                                            className="py-[12px] border-b flex relative"
                                            key={el}
                                        >
                                            <p
                                                onClick={(e) => fnSubmit(e, el)} // 검색 및 아이템 저장 함수
                                            >
                                                {el}
                                            </p>

                                            <button
                                                onClick={(e) =>
                                                    removeStorage(e, el)
                                                } // 아이템 삭제 함수
                                                className="flex absolute right-0 self-center rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                제거
                                            </button>
                                        </li>
                                    ))}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchRecord;
