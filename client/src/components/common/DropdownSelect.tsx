import { useState } from 'react';

export default function DropdownSelect() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Anyone");

    const options = ["Anyone", "Profiles you follow", "Mentioned only"];

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    }

    return (
        <div className="relative w-64">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 text-left text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                style={{ backgroundColor: 'white', color: '#999999', fontSize:'15px' }}
            >
                {selectedOption+" can reply"}
            </button>

            {isOpen && (
                <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white">
                    <div className="py-1">
                        {options.map((option, index) => (
                            <a
                                key={index}
                                onClick={() => handleSelect(option)}
                                className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                style={{ color: 'black' }}
                            >
                                {option}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
