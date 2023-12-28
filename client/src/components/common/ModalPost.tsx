import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, Modal} from 'antd';
import DropdownSelect from "@/src/components/common/DropdownSelect";
import UploadImage from "@/src/components/common/UploadImage";
import AutoInput from "@/src/components/common/AutoInput";

const App = ({ isModalOpen, setIsModalOpen }) => {

    const [showAutoInput, setShowAutoInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

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

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        const cursorPosition = inputRef.current ? inputRef.current.input.selectionStart : 0;
        if (event.key === ' ' && cursorPosition === 0) {
            setShowAutoInput(true);
        }
    };

    return (
        <>
                <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)}
                       onCancel={() => setIsModalOpen(false)} width={550} onClick={() => setIsModalOpen(true)}
                       closeIcon={null} footer={null} centered={true} keyboard={true}>
                    <div className="flex flex-col justify-between bg-white w-[300px] h-[350px]">
                        <div>
                            <div className="relative h-[560px]">
                                <div className="absolute w-[319px] h-[153px] top-0 left-0">
                                    <div className="absolute w-[48px] h-[40px] top-[24px] left-[24px]">
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
                                    <div className="absolute w-[523px] h-[21px] top-[2px] left-[30px]">
                                        <div className="h-[21px]">
                                            <div className="relative w-[523px] h-[21px]">
                                                <div className="absolute w-[523px] h-[21px] top-[24px] left-[46px]">
                                                    jamesdinh
                                                </div>
                                            </div>
                                        </div>


                                        <div className="absolute top-[70px] left-[46px]">
                                            {!showAutoInput ? (
                                                <Input className="w-[410px]"
                                                       placeholder="Press ‘space’ for AI suggestion"
                                                       onKeyPress={handleKeyPress}
                                                       onChange={handleInputChange}
                                                       value={inputValue}
                                                       ref={inputRef}
                                                />
                                            ) : (
                                                <AutoInput/>
                                            )}
                                        </div>

                                    </div>

                                </div>
                                <div className="absolute w-[571px] h-[93px] top-[200px] left-[-20px] opacity-40">
                                    <UploadImage/>
                                </div>

                                <div
                                    className="absolute w-[619px] h-[84px] top-[250px] left-0"> {/* Adjusted top value here */}
                                    <div className="absolute w-[495px] h-[30px] top-[27px] left-[10px]">
                                        <div
                                            className="flex justify-between items-end w-full h-[84px] p-4"> {/* Added flexbox properties */}
                                            <div>
                                                <DropdownSelect/>
                                            </div>
                                            <div>
                                                <Button
                                                    disabled
                                                    style={{
                                                        background: "#a20103",
                                                        color: "#fff",
                                                        borderRadius: 243,
                                                        opacity: 0.5
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
        </>
    );
};

export default App;