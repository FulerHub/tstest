import React, {FC} from 'react';
import {Layout} from 'antd';
import FormPost from "../components/FormPost";
import ListAnnouncement from "../components/ListAnnouncement";
const {Content} = Layout;
const Home:FC = () => {
    return (
        <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
                <div className="container">
                    <FormPost/>
                    <ListAnnouncement />
                </div>
            </div>
        </Content>
    );
};

export default Home;