import React from 'react';
import { Tabs, Table } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { TabPane } = Tabs;

const data = [
    { name: 'Test 1', success: 5, failure: 2 },
    { name: 'Test 2', success: 8, failure: 1 },
    { name: 'Test 3', success: 7, failure: 3 },
    // Add more data points as needed
];

const columns = [
    {
        title: 'Test Case',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Success',
        dataIndex: 'success',
        key: 'success',
    },
    {
        title: 'Failure',
        dataIndex: 'failure',
        key: 'failure',
    },
];

const TestResult = () => {
    return (
        <div>
            <h2>Test Case Execution Status</h2>
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="success" stroke="#00cc00" name="Success" />
                <Line type="monotone" dataKey="failure" stroke="#cc0000" name="Failure" />
            </LineChart>
            <h2>Test Case Summary</h2>
            <Table dataSource={data} columns={columns} />
        </div>
    );
};

export default TestResult;