import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Image, Button } from 'antd';

import logo from '../../assets/logo.svg';
import ConnectWallet from '../Wallet/ConnectWallet';

const { Header } = Layout;

export default () => {
  return (
    <Header>
      <Image preview={false} src={logo} width={46} height={46} />
      <Menu
        theme="light"
        mode="horizontal"
        items={[
          {
            label: <Button type="link">Docs</Button>,
          },
          {
            label: <Button type="link">Tutorial</Button>,
          },
          { label: <ConnectWallet /> },
        ]}
      />
    </Header>
  );
};
