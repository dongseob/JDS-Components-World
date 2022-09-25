import React,{ useRef } from "react";

/**
 * transition modal - zoom in out
 */
const ModalZoom = ({isModalZoom, setIsModalZoom}) =>{
    const modalRef = useRef();
    const modalChildRef = useRef();
    const buttonRef = useRef();

    //모달 영역밖 클릭 시, close
    const modalCloseOutside = (e) => {
        if(modalRef.current === e.target || buttonRef.current === e.target){
            //리액트 라이프 사이클 때문에 이렇게 코드 짰음(최선)
            //modal background fade out
            modalRef.current.style.transition="all .5s ease-out";
            modalRef.current.style.opacity=0;

            //modal wrap zoom out
            modalChildRef.current.style.transition="all .5s ease-out";
            modalChildRef.current.style.transform="scale(0)";

            //modal animation delay function
            setTimeout(()=>{
                setIsModalZoom(false);
            },500)
        }else{
            setIsModalZoom(true);
        }
    };

    return(
        <>
            {/* modal background */}
            <div className="fixed left-0 top-0 w-full h-full bg-gray-500/75 flex justify-center items-center z-30 animate-fade-in"
                ref={modalRef}
                onClick={e => modalCloseOutside(e)}>
                
                {/* modal wrap */}
                <div className="bg-white w-1/4 min-w-[400px] h-auto rounded-lg p-6 flex items-center flex-col shadow-lg animate-zoom-in"
                    ref={modalChildRef}>
                    {/* modal header */}
                    <h3>
                        The standard Lorem Ipsum passage, used since the 1500s
                    </h3>
                    {/* modal body */}
                    <div>
                        &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&quot;
                    </div>
                    {/* modal footer */}
                    <div className="mt-4 w-full flex justify-end">
                        <button className="button text-right" onClick={e => modalCloseOutside(e)} ref={buttonRef}>Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ModalZoom;