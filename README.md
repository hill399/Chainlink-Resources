# Chainlink-Resources
Collective repo for chainlink related projects.

### Node-Heartbeat
Deployable contract and off-chain cron script to facilitate automated runs of chainlink node jobs. 

Contract/Script currently automating jobs for mainnet node ['Everyday Data'](https://market.link/nodes/11406185-72d3-4cd5-9964-be0c86dc87e2) - deployed at: 
```
0x8Ba5844A429C497Ff0032921f14886F52E20D566
```


#### Solidity Contract
Contract is modified from the chainlink provided TestnetConsumer.sol with the following modifications:
  1. LINK constant has been modified from (10^18) to (10^17) to allow for 0.1 LINK job payments. NOTE: Node environment parameter MINIMUM_CONTRACT_PAYMENT should also be changed to allow lower payments.
  2. Functions configureOracle() and nodeHeartbeat() have been added. These allow for defining node parameters (co-ordinator address, jobIds, etc.) and allow for a simpler triggering of multiple jobs from the cron script.
  
 #### Cron Script
 Python 3.6 script utilising web3.py to trigger function nodeHeartbeat() of the solidity contract. Before use, script must be configured to include web3 provider, contract address, ETH account and private key. NOTE: Private Key is stored in plain text within script so recommended to run locally.
 
 #### To Use
 1. Deploy contract using remix.
 2. Call contract function configureOracle and supply node details. The three jobs outlined (uint256, int256, bytes32) are the initial jobs added when following the chainlink tutorial.
 3. Add LINK to contract.
 4. Configure cron script with user details.
 5. Setup python script with cron to automate with preferred timings.
 

### External-Adapters
Collection of external adapters to integrate into a chainlink node. See individual README for install instructions.

 1. Mavenstamp API Interface
 2. Revolut Business DEMO Interface
 3. Telegram Chat Interface
