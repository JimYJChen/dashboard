import React from 'react';
import { Tabs } from 'antd';
import TestResult from "../TestResult/TestResult";

const { TabPane } = Tabs;

const VerticalTabs = () => {
    return (
        <Tabs tabPosition="left">
            <TabPane tab="Test Results" key="1">
                <TestResult/>
            </TabPane>
            <TabPane tab="Edit Test Cases" key="2">
                {/* Add content for the Edit Test Cases tab here */}
                <p>This is the content of the Edit Test Cases tab.</p>
            </TabPane>
        </Tabs>
    );
};

export default VerticalTabs;