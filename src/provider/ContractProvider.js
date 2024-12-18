import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";

import minerAbi from "../abis/minerAbi.json";
import erc20Abi from "../abis/erc20Abi.json";
import { useAuthContext } from "./AuthProvider";
import { config } from "../config";

export const ContractContext = createContext({
  contract: null,
  web: null,
  wrongNetwork: false,
  getBnbBalance: () => null,
  getBusdBalance: () => null,
  getMaticBalance: () => null,
  fromWei: () => null,
  toWei: () => null,
});

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState();
  const [busdContract, setBusdContract] = useState();
  const [web3, setWeb3] = useState();
  const [web3Matic, setWeb3Matic] = useState();
  const { chainId, setSnackbar } = useAuthContext();
  const [wrongNetwork, setWrongNetwork] = useState(false);

  useEffect(() => {
    // if (!chainId) {
    //   return;
    // }
    // if (parseInt(chainId) !== config.chainId) {
    //   // setSnackbar({
    //   //   type: "error",
    //   //   message: "Wrong network",
    //   // });
    //   setWrongNetwork(true);
    //   return;
    // }
    setWrongNetwork(false);
    // const web3Instance = new Web3('https://bsc-dataseed.binance.org/');
    const web3Instance = new Web3('https://bsc-mainnet.public.blastapi.io');
    // web3Instance.setProvider(Web3.givenProvider);
    setWeb3(web3Instance);
    const contract = new web3Instance.eth.Contract(minerAbi, config.contractAddress);
    setContract(contract);
    
    const busdContract = new web3Instance.eth.Contract(erc20Abi, config.BSC_BUSD_Address);
    setBusdContract(busdContract);

    const web3Matic = new Web3('https://polygon-rpc.com');
    setWeb3Matic(web3Matic);

  }, []);

  const getBnbBalance = (address) => web3.eth.getBalance(address);
  const getBusdBalance = (address) => busdContract.methods.balanceOf(address).call();
  const getMaticBalance = (address) => web3Matic.eth.getBalance(address);
  const fromWei = (wei, unit = "ether") =>
    parseFloat(Web3.utils.fromWei(wei, unit)).toFixed(3);
  const toWei = (amount, unit = "ether") => Web3.utils.toWei(amount, unit);

  return (
    <ContractContext.Provider
      value={{ web3, contract, wrongNetwork, getBnbBalance, getBusdBalance, getMaticBalance, fromWei, toWei }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
