import React, {useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete } from 'antd';


interface AutoInputProps {
    autoInputValue: string;
    setAutoInputValue: (value: string) => void;
}

const renderTitle = (title: string) => (
    <span>
    {title}
        <a
            style={{ float: 'right' }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
        >
    </a>
  </span>
);

const renderItem = (title: string) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
        <UserOutlined />
      </span>
        </div>
    ),
});

const options = [
    {
        label: renderTitle(''),
        options: [renderItem('Fix spelling & grammar'), renderItem('Make shorter'), renderItem('Make longer'), renderItem('Change tone'), renderItem('Simplify language')],
    },
    {
        label: renderTitle('Draft with AI'),
        options: [renderItem('Brainstorm ideas'), renderItem('Blog post'), renderItem('Outline'), renderItem('Social media post')],
    },

];

const App: React.FC<AutoInputProps> = ({ autoInputValue, setAutoInputValue }) => {
    return (
        <>
            <div style={{ position: 'relative' }}>
                <img
                    className="absolute w-[18px] h-[36px] top-0 left-0"
                    alt="Div"
                    src="https://c.animaapp.com/30zOW6yf/img/div-h2d-dac2a57b.svg"
                />
                <AutoComplete
                    popupClassName="certain-category-search-dropdown"
                    popupMatchSelectWidth={380}
                    style={{ width: 410, height: 40 }}
                    options={options}
                    placeholder={'Ask AI to write anything...'}
                    defaultOpen={true}
                    bordered={false}
                    className="left-4"
                    value={autoInputValue}
                    onChange={setAutoInputValue}
                />
                <img
                    className="absolute w-[20px] h-[36px] top-0.5 left-[380px]"
                    alt="Div"
                    src="https://c.animaapp.com/30zOW6yf/img/div-h2d-e209d6c9.svg"
                />
            </div>
        </>
    );
};


export default App;