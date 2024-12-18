export const allAbi = {
    WCMINER: [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "BUSD",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "DeposMap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "key",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depoTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amt",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "reffy",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "initialWithdrawn",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "FeesKey",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "daysInSeconds",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "feePercentage",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "MainKey",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "ovrTotalDeps",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ovrTotalWiths",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "users",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "compounds",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "PercsKey",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "daysInSeconds",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "divsPercentage",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "UsersKey",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "startDate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "divs",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "refBonus",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalInits",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalWiths",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalAccrued",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastWith",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "timesCmpd",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "keyCounter",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "dy",
                    "type": "address"
                }
            ],
            "name": "calcdiv",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "totalWithdrawable",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "compound",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "stakeRefBonus",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amtx",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "ref",
                    "type": "address"
                }
            ],
            "name": "stakeStablecoins",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "userInfo",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "key",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "depoTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "reffy",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "initialWithdrawn",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct Depo[]",
                    "name": "depoList",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawDivs",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "withdrawAmount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "keyy",
                    "type": "uint256"
                }
            ],
            "name": "withdrawInitial",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawRefBonus",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    ERC20: [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
}