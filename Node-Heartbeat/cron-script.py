# Off-chain script to ping heartbeat contract for mainnet node.
# Assumes heartbeatContract is loaded with LINK tokens.
# Provide own web3 provider, contract address, ETH account and Private Key.
# Tested on Python 3.6.

from web3 import Web3
import json
import requests

# EthGasStation API

gasStationURL = 'https://ethgasstation.info/json/ethgasAPI.json'
gasPriceDefault = 12

def return_gas_api(gas_url):
    response = requests.get(gas_url)

    try:
        response.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print("GAS API Error: " + str(e))
        return gasPriceDefault

    response = response.json()
    return response['average'] / 10

# Ethereum Configuration

gasLimit = 300000
gasPriceGwei = return_gas_api(gasStationURL)

web3_provider = Web3.HTTPProvider('INFURA/WEB3 NODE PROVIDER HERE')
w3 = Web3(web3_provider)

heartbeatContractAddress = 'DEPOLOYED HEARTBEAT CONTRACT HERE'
accountAddress = 'ETHEREUM ACCOUNT ADDRESS HERE'
accountPK = 'ETHEREUM ACCOUNT PRIVATE KEY HERE'

# Oracle Address

oracleAddress = 'ORACLE ADDRESS HERE'

# Contract ABI (JSON)

heartbeat_abi = [
	{
		"constant": 'true',
		"inputs": [],
		"name": "getChainlinkToken",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'true',
		"inputs": [],
		"name": "uint256JobId",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'true',
		"inputs": [],
		"name": "changeDay",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [
			{
				"name": "_oracleAddress",
				"type": "address"
			},
			{
				"name": "_cronScript",
				"type": "address"
			},
			{
				"name": "_bytes32JobId",
				"type": "string"
			},
			{
				"name": "_int256JobId",
				"type": "string"
			},
			{
				"name": "_uint256JobId",
				"type": "string"
			}
		],
		"name": "configureOracle",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'true',
		"inputs": [],
		"name": "int256JobId",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [
			{
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"name": "_market",
				"type": "bytes32"
			}
		],
		"name": "fulfillEthereumLastMarket",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [
			{
				"name": "_oracle",
				"type": "address"
			},
			{
				"name": "_jobId",
				"type": "string"
			}
		],
		"name": "requestEthereumChange",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [],
		"name": "nodeHeartbeat",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'true',
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [],
		"name": "withdrawLink",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [
			{
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "fulfillEthereumPrice",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'true',
		"inputs": [],
		"name": "currentPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [
			{
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"name": "_change",
				"type": "int256"
			}
		],
		"name": "fulfillEthereumChange",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'true',
		"inputs": [],
		"name": "oracleAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [
			{
				"name": "_oracle",
				"type": "address"
			},
			{
				"name": "_jobId",
				"type": "string"
			}
		],
		"name": "requestEthereumPrice",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'true',
		"inputs": [],
		"name": "cronScript",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'true',
		"inputs": [],
		"name": "lastMarket",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'true',
		"inputs": [],
		"name": "bytes32JobId",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": 'false',
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": 'false',
		"inputs": [
			{
				"name": "_oracle",
				"type": "address"
			},
			{
				"name": "_jobId",
				"type": "string"
			}
		],
		"name": "requestEthereumLastMarket",
		"outputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": 'false',
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'false',
				"name": "oracleAddres",
				"type": "address"
			},
			{
				"indexed": 'false',
				"name": "cronScipt",
				"type": "address"
			},
			{
				"indexed": 'false',
				"name": "bytes32JobId",
				"type": "string"
			},
			{
				"indexed": 'false',
				"name": "int256JobId",
				"type": "string"
			},
			{
				"indexed": 'false',
				"name": "uint256JobId",
				"type": "string"
			}
		],
		"name": "oracleConfigured",
		"type": "event"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'true',
				"name": "cycleNo",
				"type": "uint256"
			},
			{
				"indexed": 'false',
				"name": "cycleState",
				"type": "uint256"
			},
			{
				"indexed": 'true',
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "heartBeatTriggered",
		"type": "event"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'true',
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": 'true',
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "RequestEthereumPriceFulfilled",
		"type": "event"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'true',
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": 'true',
				"name": "change",
				"type": "int256"
			}
		],
		"name": "RequestEthereumChangeFulfilled",
		"type": "event"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'true',
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": 'true',
				"name": "market",
				"type": "bytes32"
			}
		],
		"name": "RequestEthereumLastMarket",
		"type": "event"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'true',
				"name": "previousOwner",
				"type": "address"
			}
		],
		"name": "OwnershipRenounced",
		"type": "event"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'true',
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": 'true',
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'true',
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkRequested",
		"type": "event"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'true',
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkFulfilled",
		"type": "event"
	},
	{
		"anonymous": 'false',
		"inputs": [
			{
				"indexed": 'true',
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkCancelled",
		"type": "event"
	}
]

# Web3 Script

heartbeatContract = w3.eth.contract(address=heartbeatContractAddress, abi=heartbeat_abi)
accountNonce = w3.eth.getTransactionCount(accountAddress)

heartbeat_txn = heartbeatContract.functions.nodeHeartbeat().buildTransaction({'chainId': 1,'gas': gasLimit,'gasPrice': w3.toWei(str(gasPriceGwei), 'gwei'),'nonce': accountNonce,})

signed_txn = w3.eth.account.signTransaction(heartbeat_txn, private_key=accountPK)

w3.eth.sendRawTransaction(signed_txn.rawTransaction) 
