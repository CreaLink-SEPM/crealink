import React, {useRef, useState} from 'react';

const UploadImage = ({ onImageUpload, imagePreviewUrl }) => {
    const fileInputRef = useRef(null);
    const [imageUploaded, setImageUploaded] = useState(false);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageUpload(file);
        }
    };

    return (
        <div className="relative top-[41px] left-[48px]">
            <button
                onClick={handleButtonClick}
                className="flex items-center justify-start w-[150px] h-[21px] all-[unset] box-border"
                style={{fontFamily: 'Roboto, Helvetica', fontSize: '15px', color: '#999999'}}
            >
                Add to CreaLink
                <img
                    className="ml-2" // margin-left for spacing
                    src="https://c.animaapp.com/30zOW6yf/img/div-xx6bhzk.svg"
                    alt="Div"
                    style={{width: '20px', height: '20px'}}
                />
            </button>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{display: 'none'}}
            />
        </div>
    );
};

export default UploadImage;
