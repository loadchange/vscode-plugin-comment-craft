# MEDAL

> 勋章铸造机，可以免费得到一个自制勋章, 入门web3，一个学习项目

## 0. 环境配置 

### Requirements 

#### 安装 ganache 
```javascripts
Download Package from https://www.trufflesuite.com/ganache
```
#### 安装 truffle 

```javascript
npm install truffle -g
```

 在项目根目录下创建 `.env` 文件
 ```
 vim .env
 MNEMONIC=" {YOUR_MNEMONIC OR YOUR_PRIVATE_KEY} "
 POLYGON_RPC = " {PUBLIC_POLYGON_RPC} OR https://rpc-mainnet.matic.network"
 POLYGON_MUMBAI_RPC = " {PUBLIC_POLYGON_MUMBAI_RPC} or https://rpc-mumbai.maticvigil.com/"
 ```
 
 更多的 `PUBLIC_RPC` 参考：[Development Docs](https://docs.matic.network/docs/develop/network-details/network)

##### 合约学习文档
 [Solidity 最新(0.8.0)中文文档](https://learnblockchain.cn/docs/solidity/)
 [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)
 
## 1. 项目结构

- `migrations` 用来存放迁移、部署合约的 JS 脚本
- `src` 客户端 DAPP 目录
- `src/contracts` 用来存放编写的`智能合约(smart contract)`，同时 truffle 的 contract 目录指向
- `src/abis` 用来存放 truffle 编译后的 abis 文件
- `hooks/index.js` 初始化 `@web3-react` 中的 `Provider` 的请求钩子


## 2. 合约编译

使用 `turffle` 进行编译部署

```
truffle migrate --network development --reset 
```

> --network  指定部署网络为 development
> 
> --reset 是否重新编译、部署、会改变原有网络上的部署合约地址