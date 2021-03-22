import React, { useState } from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import styled from 'styled-components';
import GoogleMap from '../Components/GoogleMap';

import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { useMapStore } from '../../store/store';
import { Input } from 'antd';

const { Content, Sider } = AntLayout;
const { SubMenu } = Menu;

const Layout = styled(AntLayout)`
  min-height: 100vh;
`;

const Inner = styled(Content)`
  min-height: 280px;
`;

const Search = styled.div`
  width: 40%;
  padding: 20px;
  border-radius: 8px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 21, 41, 0.8);
  position: absolute;
  top: 20px;
  z-index: 2;

  :focus-within {
    background-color: rgba(24, 144, 255, 0.8);
  }
`;

const Main = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [{ markers }] = useMapStore();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const clickMenu = event => {
    console.log(event);
    if (event.key === 'search') {
      setIsSearchVisible(prev => !prev);
    }
  };

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
        }}
        width={'30vw'}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(prev => !prev)}
      >
        <Menu theme='dark' mode='inline' onClick={clickMenu}>
          <Menu.Item key='search' icon={<SearchOutlined />}>
            Search Location
          </Menu.Item>

          <SubMenu
            style={{ overflow: 'hidden' }}
            key='1'
            title='Places'
            icon={<EnvironmentOutlined />}
          >
            {markers.map(({ title, pageid }) => (
              <Menu.Item key={pageid}>{title}</Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Inner>
        {isSearchVisible && (
          <Search>
            <Input placeholder='Search Location' />
          </Search>
        )}

        <GoogleMap />
      </Inner>
    </Layout>
  );
};

export default Main;
