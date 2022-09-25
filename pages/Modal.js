import { useState } from "react";
import Link from "next/link";
import ModalBasic from "./ModalBasic";
import ModalFade from "./ModalFade";
import ModalZoom from "./ModalZoom";

const Modal = () => {
    const [isModalBasic, setIsModalBasic] = useState(false);
    const [isModalFade, setIsModalFade] = useState(false);
    const [isModalZoom, setIsModalZoom] = useState(false);

    return(
        <div className="wrap">
            <Link href="/"><div className="back">&larr;</div></Link>
            <div className="text-2xl font-semibold">Modal</div>
            <div className="card">
                <div className="mt-0 font-semibold">Basic Modal</div>
                <div className="text-sm mt-4">* 기존의 TailwindCSS의 Modal의 경우 Headless UI를 사용해야 하므로 Plane하게 구현</div>
                <button className="button mt-4" onClick={e => setIsModalBasic(true)}>open modal</button>
            </div>

            <div className="card">
                <div className="mt-0 font-semibold">Transition Modal - fade in out</div>
                <div className="text-sm mt-4">fade 효과</div>
                <button className="button mt-4" onClick={e => setIsModalFade(true)}>open modal</button>
            </div>

            <div className="card">
                <div className="mt-0 font-semibold">Transition Modal - zoom in out</div>
                <div className="text-sm mt-4">zoom 효과</div>
                <button className="button mt-4" onClick={e => setIsModalZoom(true)}>open modal</button>
            </div>

            {isModalBasic && <ModalBasic isModalBasic={isModalBasic} setIsModalBasic={setIsModalBasic}/>}
            {isModalFade && <ModalFade isModalFade={isModalFade} setIsModalFade={setIsModalFade}/>}
            {isModalZoom && <ModalZoom isModalZoom={isModalZoom} setIsModalZoom={setIsModalZoom}/>}
        </div>
    );
}

export default Modal;