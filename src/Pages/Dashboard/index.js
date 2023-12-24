import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import VerticalTabs from './VerticalTabs/VerticalTabs';
const { Content } = Layout;

const Index = () => {
    return (
        <Layout style={{ background: '#fff' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <Content >
                <h1>Welcome to the Admin Dashboard!</h1>
                {/* Add your dashboard content here */}
                <VerticalTabs/>
            </Content>
        </Layout>
    );
};

export default Index;