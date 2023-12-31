import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, Modal} from 'antd';
import DropdownSelect from "@/src/components/common/DropdownSelect";
import UploadImage from "@/src/components/common/UploadImage";
import AutoInput from "@/src/components/common/AutoInput";
import TextArea from "antd/es/input/TextArea";
import "@/src/app/globals.css"
const App = ({ isModalOpen, setIsModalOpen }) => {
    const [autoInputValue, setAutoInputValue] = useState('');

    const [inputValue, setInputValue] = useState('');
    const [imageUploaded, setImageUploaded] = useState(false);

    const [showAutoInput, setShowAutoInput] = useState(false);
    const inputRef = useRef(null);

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
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

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === ' ' && inputValue === '') {
            event.preventDefault(); // Prevent the space from being added
            setShowAutoInput(true);
        }
    };

    return (
        <>
                <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)}
                       onCancel={() => setIsModalOpen(false)} width={580} onClick={() => setIsModalOpen(true)}
                       closeIcon={null} footer={null} centered={true} keyboard={true}
                >
                    <div className="flex flex-col justify-between bg-white w-[340px] h-[220px]">
                        <div>
                            <div className="relative h-[510px]">
                                <div className="absolute w-[319px] h-[153px] left-0">
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
                                    <div className="absolute w-[523px] left-[30px]">
                                        <div className="h-[21px]">
                                            <div className="relative w-[523px]">
                                                <div className="absolute w-[523px] h-[21px] top-[24px] left-[46px]">
                                                    jamesdinh
                                                </div>
                                            </div>
                                        </div>


                                        <div className="absolute top-[55px] left-[46px]">
                                            {!showAutoInput ? (
                                                <TextArea
                                                    className="borderless-textarea"
                                                    placeholder="Press ‘space’ for AI suggestion"
                                                       onKeyPress={handleKeyPress}
                                                       onChange={handleInputChange}
                                                       value={inputValue}
                                                       ref={inputRef}
                                                       style={{ border: 'none', height: '70px', width: '420px' }}
                                                />
                                            ) : (
                                                <AutoInput autoInputValue={autoInputValue} setAutoInputValue={setAutoInputValue} />                                            )}
                                            {imagePreviewUrl && (
                                                <img
                                                    src={imagePreviewUrl}
                                                    alt="Preview"
                                                    style={{width: '300px', height: '300px', position: 'absolute', top: '0', left: '0' , marginTop: '52px'}}
                                                />
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <div className="absolute w-[571px] h-[93px] top-[105px] left-[-20px] opacity-40">
                                    <UploadImage onImageUpload={handleImageUpload} imagePreviewUrl={imagePreviewUrl} />
                                </div>

                                <div className="absolute w-[619px] top-[155px] left-0">
                                    <div className="absolute w-[495px] left-[10px]">
                                        <div className="flex justify-between items-end w-full h-[84px] p-4">
                                            <div style={{marginLeft: '-15px'}}>
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
        </>
    );
};

export default App;