import React, {useEffect, useRef, useState} from 'react';
import {Button} from "antd";

import ModalPost from "@/src/components/common/ModalPost";

const CreatePost: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);



    return (
        <div className="inline-flex flex-col items-start gap-[16px] relative">
            <div className="relative w-[572px] h-[68px]">
                <div className="absolute w-[36px] h-[36px] top-[16px] left-0 bg-neutral-100 rounded-[18px]">
                    <div className="h-[36px]">
                        <div className="relative w-[37px] h-[37px] rounded-[17.5px]">
                            <div
                                className="w-[36px] h-[36px] rounded-[18px]
                                bg-[url(https://c.animaapp.com/n1QiTcNd/img/357786538-658912836132654-4013649251107777622-n-jpg@2x.png)]
                                bg-cover bg-[50%_50%] absolute top-0 left-0"/>
                            <div
                                className="w-[37px] h-[37px] rounded-[17.5px] border border-solid border-[#00000026] absolute top-0 left-0"/>
                        </div>
                    </div>
                </div>

                {/*make a modal for this input section*/}

                <div className="absolute w-[472px] h-[36px] top-[16px] left-[36px]" onClick={() => setIsModalOpen(true)} >
                    <div className="relative w-[456px] h-[36px] left-[8px] rounded-[10px]">
                        <div className="relative w-[107px] h-[21px] top-[8px] left-[4px]">
                            <p className="absolute w-[211px] h-[18px] top-0 left-0 [font-family:'Roboto',Helvetica] font-normal
                            text-[#999999] text-[15px] tracking-[0] leading-[21px] whitespace-nowrap" >
                                Press ‘space’ for AI suggestion
                                <ModalPost isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
                            </p>
                        </div>
                    </div>
                </div>

                {/*this is a button to post, default button is disabled, users need to input something to be able to tap on this one*/}

                <div className="absolute w-[64px] h-[36px] top-[16px] left-[508px]">
                    <Button disabled style={{
                        background: "#a20103",
                        color: "#fff",
                        borderRadius: 243,
                        opacity: 0.5
                    }}>Post</Button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;