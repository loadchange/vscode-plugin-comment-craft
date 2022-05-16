import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import Header from './components/Header';
import Footer from './components/Footer';

// import Content from './components/Containers';

import { Layout, Menu, Breadcrumb, Tabs, ConfigProvider } from 'antd';
import NFTDAppIndex from './components/NFTMarket';
import Home from './components/NFTMarket/home';
import MyAssets from './components/NFTMarket/assets';
import CreatorDashboard from './components/NFTMarket/creator-dashboard';

import { Router, Route, Link } from 'react-router';

import { useLocalStorageState } from 'ahooks';

import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';



import './App.less';

library.add(fas, fab);

const { Content } = Layout;

const { TabPane } = Tabs;

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};

function App() {
  const [language] = useLocalStorageState('language', {
    defaultValue: 'enUS',
  });
  return (
    <ConfigProvider locale={{ enUS, zhCN }[language] || enUS}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout className="layout">
          <Header />
          <Content style={{ padding: '0 50px', height: 700 }}>
            <NFTDAppIndex />
            <Tabs>
              <TabPane tab="Home" key="1">
                <Home />
              </TabPane>
              <TabPane tab="Creator Dashboard" key="2">
                <CreatorDashboard />
              </TabPane>
              <TabPane tab="Digital Assets" key="3">
                <MyAssets />
              </TabPane>
            </Tabs>
          </Content>
          <Footer />
        </Layout>
      </Web3ReactProvider>
    </ConfigProvider>
  );
}

export default App;
