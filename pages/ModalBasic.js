import React,{ useRef } from "react";

/**
 * basic modal
 */
const ModalBasic = ({isModalBasic, setIsModalBasic}) =>{
    const modalRef = useRef();
    const buttonRef = useRef();

    //모달 영역밖 클릭 시, close
    const modalCloseOutside = (e) => {
        if (isModalBasic && modalRef.current === e.target){
            setIsModalBasic(false);
        }else if(buttonRef.current === e.target){
            //"close" 버튼을 클릭 시
            setIsModalBasic(false);
        }else{
            setIsModalBasic(true);
        }
    };

    return(
        <>
            {/* modal background */}
            <div className="fixed left-0 top-0 w-full h-full bg-gray-500/75 flex justify-center items-center z-30"
                ref={modalRef}
                onClick={e => modalCloseOutside(e)}>
                
                {/* modal wrap */}
                <div className="bg-white w-1/4 min-w-[400px] h-auto rounded-lg p-6 flex items-center flex-col shadow-lg">
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
export default ModalBasic;