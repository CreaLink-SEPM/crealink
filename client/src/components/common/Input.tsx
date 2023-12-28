import {ConfigProvider, Input, Space} from 'antd';
import React from 'react';

const App: React.FC = () => (
    <ConfigProvider
        theme={{
            token: {
                colorBorder: '#ff4d4f',
                borderRadius: 15,

            },
        }}
    >
        <Space>
            <Input ref={this.inputRef} />;
        </Space>
    </ConfigProvider>
);

export default App;