import React from 'react';
import { Layout, Menu } from 'antd';
import Index from '@/Pages/Dashboard';
import { Header } from '@/compoents/Layout';
const { Content, Footer } = Layout;

function App() {
    return (
        <Layout className="layout">
            <Header Avatar= "" username="jim"/>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Index />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Admin Portal ©2023</Footer>
        </Layout>
    );
}

export default App;