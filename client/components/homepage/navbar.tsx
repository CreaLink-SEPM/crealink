import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import homeIcon from "@/public/assets/icons/Home Icon.svg";
import searchIcon from "@/public/assets/icons/Search Icon.svg";
import heartIcon from "@/public/assets/icons/Heart Icon.svg";
import messageIcon from "@/public/assets/icons/Message Icon.svg";
import userIcon from "@/public/assets/icons/User Icon.svg";
import Image from "next/image";


const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: <Image src={homeIcon} alt="HomePage" />,
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: <Image src={searchIcon} alt="SearchPage" />,
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: <Image src={heartIcon} alt="SavedPage" />,
        children: 'Content of Tab Pane 3',
    },

    {
        key: '4',
        label: <Image src={messageIcon} alt="MessagePage" />,
        children: 'Content of Tab Pane 4',
    },{
        key: '5',
        label: <Image src={userIcon} alt="UserPage" />,
        children: 'Content of Tab Pane 5',
    },
];

// const Navbar: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;


const Navbar: React.FC = () => <Tabs defaultActiveKey="1" items={items} tabBarGutter={69}
                                     centered={false}
                                     
                                     inkBarColor="#A20103"/>;


export { Navbar };