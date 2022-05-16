import React from 'react';
import { useWeb3React } from '@web3-react/core';

import { useEagerConnect, useInactiveListener } from '../../hooks';
import connectorList, { resetWalletConnectConnector } from '../../lib/connectors';
import { Menu, Dropdown, Space, Button } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

const ConnectWallet = () => {
  const { activate, deactivate, active, error } = useWeb3React();

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  const handleClick = (connectorName) => () => {
    activate(connectorList[connectorName]);
  };

  const handleDisconnect = () => {
    deactivate();
  };

  const handleRetry = () => {
    resetWalletConnectConnector(connectorList['WalletConnect']);
    deactivate();
  };

  function getMenu() {
    const items = [];
    if (active) {
      items.push({
        label: (
          <Button type="link" onClick={handleDisconnect}>
            Disconnect Wallet
          </Button>
        ),
      });
    } else {
      if (!error) {
        const list = [
          <Button type="link" onClick={handleClick('MetaMask')}>
            MetaMask
          </Button>,
          <Button type="link" onClick={handleClick('WalletConnect')}>
            WalletConnect
          </Button>,
          <Button type="link" onClick={handleClick('WalletLink')}>
            WalletLink
          </Button>,
        ];
        list.forEach((label) => items.push({ label }));
      } else {
        items.push({
          label: (
            <Button type="link" onClick={handleRetry}>
              Retry
            </Button>
          ),
        });
      }
    }
    return <Menu items={items} />;
  }

  return (
    <Dropdown overlay={getMenu()}>
      <Button type="link">
        <Space>
          Wallet
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default ConnectWallet;
