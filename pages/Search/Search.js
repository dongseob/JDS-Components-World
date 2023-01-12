import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import SearchRecord from "./SearchRecord";
import SearchAuto from "./SearchAuto";

const Search = () => {
    return (
        <div className="wrap">
            <Link href="/">
                <span className="back">&larr;</span>
            </Link>
            <div className="text-2xl font-semibold mt-2">Search</div>
            <div className="card text-sm">💡&emsp;기능 참고 : 구글 검색창</div>
            <SearchRecord></SearchRecord>
            <SearchAuto></SearchAuto>
        </div>
    );
};
export default Search;
