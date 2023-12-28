import React, { useRef } from 'react';

export default function UploadImage() {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file); // Process the file as needed
    };

    return (
        <div className="relative top-[41px] left-[48px]">
            <button
                onClick={handleButtonClick}
                className="flex items-center justify-start w-[150px] h-[21px] all-[unset] box-border"
                style={{ fontFamily: 'Roboto, Helvetica', fontSize: '15px', color: '#999999' }}
            >
                Add to CreaLink
                <img
                    className="ml-2" // margin-left for spacing
                    src="https://c.animaapp.com/30zOW6yf/img/div-xx6bhzk.svg"
                    alt="Div"
                    style={{ width: '20px', height: '20px' }}
                />
            </button>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
}
