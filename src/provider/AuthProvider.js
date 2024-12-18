import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const AuthContext = createContext({
  address: null,
  connect: () => null,
  loading: false,
  disconnect: () => null,
  chainId: null,
  setSnackbar: () => null,
});

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider, // required
//     options: {
//       rpc: {
//         56: "https://bsc-dataseed.binance.org/",
//         97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
//       },
//       network: "binance",
//     },
//   },
// };

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const web3Modal = new Web3Modal({
//   cacheProvider: true, // optional
//   providerOptions, // required
// });

export const AuthProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(null);

  // const subscribeProvider = (provider) => {
  //   setProvider(provider);

  //   provider.on("disconnect", (error) => {
  //     console.log(error);
  //     setChainId(null);
  //     setAddress(null);
  //   });
  //   provider.on("accountsChanged", (accounts) => {
  //     setAddress(accounts[0]);
  //     setSnackbar({
  //       type: "info",
  //       message: "Account Changed",
  //     });
  //   });
  //   // Subscribe to chainId change
  //   provider.on("chainChanged", (chainId) => {
  //     setChainId(chainId);
  //   });
  // };

  const loadWeb3 = async () => 
  {
    if (window.ethereum) 
    {
      window.web3 = new Web3(window.ethereum);
      window.web3.eth.handleRevert = true;
    } 
    else if (window.web3) 
    {
      window.web3 = new Web3(Web3.givenProvider);
      window.web3.eth.handleRevert = true;
    } 
    else {
      // window.alert(
      //   "Non-Ethereum browser detected. Please connect and unlock your wallet."
      // );
      return;
    }
    if (window.ethereum) {
      window.ethereum.on('chainChanged', function (chainId) {
        checkNetworkById(chainId);

      });
      // window.web3.eth.getChainId().then((chainId) => {
      //   checkNetworkById(chainId);

      // })
      window.ethereum.on('disconnect', function(error  /*:ProviderRpcError*/) {
        //alert("disconnected, " + error);      
        // store.dispatch(setConnectedWalletAddress(0))
        // store.dispatch(setWalletStatus(false));
        setAddress(null);
      });
      window.ethereum.on('accountsChanged', function(accounts /*: Array<string>*/) {
        //  alert("wallet "+accounts[0]+" is connected");
        if(accounts[0]   !== undefined)
        {
          // store.dispatch(setConnectedWalletAddress(accounts[0]))
          // store.dispatch(setWalletStatus(true));

          setAddress(accounts[0]);
        }
        // if(accounts.length === 0) store.dispatch(setWalletStatus(false));
      });
    }
  };

  const checkNetwork = async () => {
    if (window.web3) {
      const chainId = await window.web3.eth.getChainId();
      return checkNetworkById(chainId);
    }
  }

  const checkNetworkById = async (newChainId) => {
    if (window.web3.utils.toHex(newChainId) !== window.web3.utils.toHex(chainId)) 
    {
      await switchNetwork(newChainId);
    }
    const cid = await window.web3.eth.getChainId();
    // store.dispatch(setConnectedChainId(cid));
    setChainId(cid);
    return (window.web3.utils.toHex(cid) === window.web3.utils.toHex(newChainId) )
  }

  // const changeNetwork = async (chainId) => 
  // {
  //   try {
  //       await window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: window.web3.utils.toHex(chainId) }],
  //       });
  //     } 
  //   catch (switchError) 
  //     {
  //       // This error code indicates that the chain has not been added to MetaMask.
  //       if (switchError.code === 4902) 
  //       {
  //         try {
  //           await window.ethereum.request({
  //             method: 'wallet_addEthereumChain',
  //             params: [
  //               {
  //                 chainId: window.web3.utils.toHex(config.chainId),
  //                 chainName: 'Cronos',
  //                 rpcUrls: [config.testNetUrl] /* ... */,
  //               },
  //             ],
  //           });
  //           return {
  //             success : true,
  //             message : "switching succeed"
  //           }
  //         } catch (addError) {          
  //           return {
  //             success : false,
  //             message : "Switching failed." + addError.message
  //           }
  //         }
  //       }
  //     }
  // }


  const connect = async () => {
    console.log("ethereum => ", ethereum);
    console.log("Window.ethereum => ", window.ethereum);
    if (ethereum) {
      ethereum
      .request({method: "eth_requestAccounts"})
      .then((accounts) => {
        setAddress(accounts[0]); 
        setChainId(ethereum.chainId);
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });

      console.log('connected');
    }
  }

  const connect_old = async () => {
    if (address) {
      return;
    }
    setLoading(true);

    if (window.ethereum) {
      if (window.ethereum.chainId != "0x38") {
          window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                  chainId: "0x38",
                  rpcUrls: ["https://bsc-dataseed1.binance.org"],
                  chainName: "BSC Mainnet",
                  nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18
                  },
                  blockExplorerUrls: ["https://bscscan.com"]
              }]
          }).then(() => {
              window.location.reload()
          });
      };

      // if (window.ethereum.chainId != "0x61") {
      //     window.ethereum.request({
      //         method: "wallet_addEthereumChain",
      //         params: [{
      //             chainId: "0x61",
      //             rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
      //             chainName: "BSC Mainnet",
      //             nativeCurrency: {
      //                 name: "BNB",
      //                 symbol: "BNB",
      //                 decimals: 18
      //             },
      //             blockExplorerUrls: ["https://bscscan.com"]
      //         }]
      //     }).then(() => {
      //         // window.location.reload()
      //     });
      // };

      console.log('detected');
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setAddress(accounts[0]);
      console.log("address: ", accounts[0]);

      let web3 = new Web3(Web3.givenProvider);

      // if (!web3.currentProvider) {
      //   setSnackbar({
      //     type: "error",
      //     message: '"No provider was found"',
      //   });
      //   return;
      // }
      // const provider = await web3Modal.connect();
      // web3 = new Web3(provider);
      // subscribeProvider(provider);

      // const accounts = await web3.eth.getAccounts();
      const chain = await web3.eth.getChainId();
      setChainId(chain);
    } catch (err) {
      console.error(err);
      // setSnackbar({
      //   type: "error",
      //   message: "Failed to connect",
      // });
    }
    setLoading(false);
  };

  const switchNetwork = async (newChainId) => {
    setLoading(true);
    console.log("switchNetwork: ", newChainId, ethereum.chainId);
    if (window.ethereum) {
      if (newChainId == 56 && ethereum.chainId != "0x38") {
        try {
          await ethereum.send('wallet_switchEthereumChain', [{chainId: '0x38'}]);
          setChainId('0x38');
        } catch(switchError) {
          if (switchError.code === 4902) {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                  chainId: "0x38",
                  rpcUrls: ["https://bsc-mainnet.public.blastapi.io"],
                  chainName: "BSC Mainnet",
                  nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18
                  },
                  blockExplorerUrls: ["https://bscscan.com"]
              }]
            }).then(() => {
              window.location.reload();
            })
          }
        }
      } else if (newChainId == 137 && ethereum.chainId != "0x89") {
        try {
          await ethereum.send('wallet_switchEthereumChain', [{chainId: '0x89'}]);
          setChainId('0x89');
        } catch(switchError) {
          if (switchError.code === 4902) {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                  chainId: "0x89",
                  rpcUrls: ["https://polygon-rpc.com/"],
                  chainName: "Polygon Mainnet",
                  nativeCurrency: {
                      name: "MATIC",
                      symbol: "MATIC",
                      decimals: 18
                  },
                  blockExplorerUrls: ["https://polygonscan.com"]
              }]
            }).then(() => {
              window.location.reload();
            })
          }
        }
      } else if (newChainId == 43114 && ethereum.chainId != "0xA86A") {
        try {
          await ethereum.send('wallet_switchEthereumChain', [{chainId: '0xA86A'}]);
          setChainId('0xA86A');
        } catch(switchError) {
          console.log("switchError: ", switchError);
          if (switchError.code === 4902) {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                  chainId: "0xA86A",
                  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                  chainName: "Avalanche Mainnet",
                  nativeCurrency: {
                      name: "AVAX",
                      symbol: "AVAX",
                      decimals: 18
                  },
                  blockExplorerUrls: ["https://snowtrace.io"]
              }]
            }).then(() => {
              window.location.reload();
            })
          }
        }
      } else {
        // console.log("Current Network is not supported, yet!");
      }
    }
    setLoading(false);
  };

  const disconnect = () => {
    ethereum.on('disconnect', (value) => {
      console.log("disconnect: ", value);
    });
    // web3Modal.clearCachedProvider();
    setAddress(null);
    setChainId(null);
    console.log("disconnected");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(null);
  };

  useEffect(() => {
    // if (web3Modal.cachedProvider) {
      // connect();
      loadWeb3();
      connect();
    // }
  }, []);

  return (
    <AuthContext.Provider
      // value={{ address, loading, connect, disconnect, chainId, setSnackbar, provider }}
      value={{ address, connect, disconnect, switchNetwork, chainId, setSnackbar }}
    >
      {children}
      {snackbar && (
        <Snackbar
          open={!!snackbar}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          {
            <Alert
              onClose={handleClose}
              severity={snackbar?.type}
              sx={{ width: "100%" }}
            >
              {snackbar?.message}
            </Alert>
          }
        </Snackbar>
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
