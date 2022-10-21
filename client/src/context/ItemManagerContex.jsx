/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import itemManagerContract from "../contracts/ItemManager.json";

export const ItemManagerContext = React.createContext();

const { ethereum } = window;

export const ItemManagerProvider = ({ children }) => {
  const [accouts, setAccouts] = useState("");
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState("");

  let web3 = new Web3("http://127.0.0.1:9545/");

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("please install metamask");

    const accounts = await ethereum.request({ method: "eth_accounts" });

    setAccouts(accounts);
    checkBalance(accounts);
  };

  const constructContract = async () => {
    const networkId = await web3.eth.net.getId();
    const itemMContract = new web3.eth.Contract(
      itemManagerContract.abi,
      itemManagerContract.networks[networkId].address
    );
    console.log(itemMContract, "contract created");
    setContract(itemMContract);
  };

  useEffect(() => {
    if (!ethereum) return console.log("Please install metamask");
    ethereum.on("accountsChanged", (accounts) => {
      setAccouts(accounts);
      checkBalance(accounts);
    });
    constructContract();
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts, "eth_requestAccounts");
      setAccouts(accounts);
    } catch (e) {
      console.log(e);
      throw new Error("No ethereum object.");
    }
  };

  const checkBalance = async (accounts) => {
    try {
      if (!ethereum) return alert("please install metamask");
      let balance = await web3.eth.getBalance(accounts[0]);
      balance = web3.utils.fromWei(balance);
      setBalance(balance);
    } catch (e) {
      console.log(e);
      throw new Error("No ethereum object");
    }
  };

  return (
    <ItemManagerContext.Provider
      value={{
        connectWallet,
        accounts: accouts,
        balance,
        checkBalance,
        contract,
      }}
    >
      {children}
    </ItemManagerContext.Provider>
  );
};
