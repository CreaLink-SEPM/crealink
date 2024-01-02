'use client';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import AutoInput from "@/src/components/common/AutoInput";
import UploadImage from "@/src/components/common/UploadImage";
import DropdownSelect from "@/src/components/common/DropdownSelect";

const CreatePost: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [autoInputValue, setAutoInputValue] = useState('');

    const [inputValue, setInputValue] = useState('');
    const [imageUploaded, setImageUploaded] = useState(false);

    const [showAutoInput, setShowAutoInput] = useState(false);
    const inputRef = useRef(null);

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUploaded(true);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Backspace' && inputValue === '') {
                setShowAutoInput(false);
            }
        };

        if (showAutoInput) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showAutoInput, inputValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === ' ' && inputValue === '') {
            event.preventDefault(); // Prevent the space from being added
            setShowAutoInput(true);
        }
    };

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

                            </p>
                        </div>
                    </div>
                </div>
                <Modal
                    open={isModalOpen}
                    onOk={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                    width={580}
                    closeIcon={null}
                    footer={null}
                    centered={true}
                    keyboard={true}
                    maskClosable={true}
                >
                    <div className="flex flex-col justify-between bg-white w-[58px] h-[300px]">
                        <div>
                            <div className="relative h-[510px]">
                                <div className="absolute w-[319px] h-[153px] left-0">
                                    <div className="absolute w-[48px] h-[40px] top-[14px] left-[24px]">
                                        <div className="relative h-[36px] top-[4px]">
                                            <div className="w-[36px] h-[36px] bg-neutral-100 rounded-[18px]">
                                                <div className="h-[36px]">
                                                    <div className="relative w-[37px] h-[37px] rounded-[17.5px]">
                                                        <div
                                                            className="w-[36px] h-[36px] rounded-[18px] bg-[url(https://c.animaapp.com/30zOW6yf/img/357786538-658912836132654-4013649251107777622-n-jpg@2x.png)] bg-cover bg-[50%_50%] absolute top-0 left-0"/>
                                                        <div
                                                            className="w-[37px] h-[37px] rounded-[17.5px] border border-solid border-[#00000026] absolute top-0 left-0"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute  left-[0px]">
                                        <div className="h-[21px]">
                                            <div className="relative">
                                                <div className="absolute h-[21px] top-[14px] left-[70px] font-bold">
                                                    jamesdinh
                                                </div>
                                            </div>
                                        </div>


                                        <div className="absolute top-[40px] left-[65px]">
                                            {!showAutoInput ? (
                                                <TextArea
                                                    className="borderless-textarea"
                                                    placeholder="Press ‘space’ for AI suggestion"
                                                    onKeyPress={handleKeyPress}
                                                    onChange={handleInputChange}
                                                    value={inputValue}
                                                    ref={inputRef}
                                                    maxLength={300}
                                                    style={{ border: 'none', height: '90px', width: '465px'}}
                                                />
                                            ) : (
                                                <AutoInput autoInputValue={autoInputValue} setAutoInputValue={setAutoInputValue} />                                            )}

                                        </div>
                                    </div>

                                </div>
                                <div className="absolute w-[650px] h-[93px] top-[145px] left-[75px] z-20">
                                    <UploadImage />
                                </div>

                                <div className="relative w-[619px] top-[235px] left-5">
                                    <div className="relative w-[495px] left-[5px]">
                                        <div className="flex justify-between items-end w-full h-[84px] p-4">
                                            <div style={{marginLeft: '-25px'}}>
                                                <DropdownSelect/>
                                            </div>
                                            <div>
                                                <Button
                                                    disabled={!inputValue && !autoInputValue && !imageUploaded}
                                                    style={{
                                                        background: "#a20103",
                                                        color: "#fff",
                                                        borderRadius: 243,
                                                        opacity: (!inputValue && !autoInputValue && !imageUploaded) ? 0.5 : 1
                                                    }}>
                                                    Post
                                                </Button>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Modal>

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