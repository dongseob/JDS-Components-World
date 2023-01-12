import { useState, useEffect } from "react";

const SearchRecord = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchRecord, setSearchRecord] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    const fnInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    const fnSubmit = (e) => {
        e.preventDefault();
        const origin = window.localStorage.getItem("최근검색어");
        const result = origin.split(",");

        if (origin.length > 0) {
            result.push(searchValue);
            window.localStorage.setItem("최근검색어", result);
            setSearchRecord(result);
        } else {
            window.localStorage.setItem("최근검색어", searchValue);
            setSearchRecord(searchValue);
        }
    };

    // useEffect(() => {
    //     console.log(searchRecord);
    // }, [searchRecord]);

    useEffect(() => {
        const origin = window.localStorage.getItem("최근검색어");
        const result = origin.split(",");
        setSearchRecord(result);
    }, []);

    return (
        <div className="card">
            <div className="mt-0 font-semibold">최근 검색어</div>

            <div className="mt-4">
                <form
                    onSubmit={fnSubmit}
                    className="relative mt-1 flex items-center"
                >
                    <input
                        type="text"
                        onChange={fnInputChange}
                        className="w-full border-none"
                        placeholder="검색어를 입력해주세요"
                        onFocus={() => setIsSearch(true)}
                        onBlur={() => setTimeout(() => {setIsSearch(false)}, 200) } //밑의 a태그를 누를 때 보다 빨리 동작해서 지연걸어놈 => 좋은 방법 아님
                    />
                    <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <button
                            type="submit"
                            className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {isSearch && (
                    <div className="py-2 bg-white border-t-2">
                        {searchRecord
                            .slice(0)
                            .reverse()
                            .map((el) => (
                                <>
                                    <a
                                        href="#"
                                        className="w-full bg-white mt-[1px] py-2 px-3 flex text-sm items-center border-none outline-none hover:bg-slate-200 focus:bg-slate-200 transition-all"
                                        onClick={() => alert(el)}
                                    >
                                        <p>{el}</p>
                                        {/* 탭 동작에 걸리기 때문에 버튼이 아닌 div로 */}
                                        <div
                                            className="ml-auto border-2 px-2 border-slate-500 rounded-md hover:bg-slate-300"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert(el);
                                            }}
                                        >
                                            X
                                        </div>
                                    </a>
                                </>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchRecord;
