import React from 'react';
import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import GoogleMap from '../Components/GoogleMap';

const { Header, Content, Footer: AntFooter } = AntLayout;

const Layout = styled(AntLayout)`
  min-height: 100vh;
`;

const Inner = styled(Content)`
  min-height: 280px;
`;

const Footer = styled(AntFooter)`
  text-align: center;
`;

const Main = () => {
  return (
    <Layout>
      <Header>
        <h2 style={{ color: '#e3e3e3' }}>Wiki Map</h2>
      </Header>
      <Inner>
        <GoogleMap />
      </Inner>
      <Footer>Dawid Wajda (with Netguru)</Footer>
    </Layout>
  );
};

export default Main;
