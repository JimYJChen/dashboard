import {
    BellOutlined,
    RightOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import React, { Fragment } from 'react';
import { Menu, Layout, Avatar, Popover, Badge, List } from 'antd';
import styles from './Header.less'
const { SubMenu } = Menu

const TestResult = (props) => {
    const {
        avatar,
        username,
    } = props
    const handleClickMenu = () =>{
        return null;
    };
    const rightContent = [
        <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
            <SubMenu
                title={
                    <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                <div>Hi,</div>
              </span>
                        <span>{username}</span>
                        <Avatar style={{ marginLeft: 8 }} src={avatar} />
                    </Fragment>
                }
            >
                <Menu.Item key="SignOut">
                    <div>Sign out</div>
                </Menu.Item>
            </SubMenu>
        </Menu>,
    ]
    return (
        <div display ='flex' align-items= 'center'>{rightContent}</div>
    );
}

export default TestResult;