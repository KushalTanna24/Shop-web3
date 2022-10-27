/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import itemManagerContract from "../contracts/ItemManager.json";

export const ItemManagerContext = React.createContext();

const { ethereum } = window;

export const ItemManagerProvider = ({ children }) => {
  const [accounts, setAccounts] = useState("");
  const [balance, setBalance] = useState(0);

  let web3 = new Web3("http://127.0.0.1:8545/");
  const itemMContract = new web3.eth.Contract(
    itemManagerContract.abi,
    itemManagerContract.networks[1666873916141].address
  );
  console.log(itemMContract);

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("please install metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    setAccounts(accounts);
    checkBalance(accounts);
  };

  const getData = async () => {
    const result = await itemMContract.methods
      .items(0)
      .send({ from: accounts[0] });
    checkBalance(accounts);
    console.log(result);
  };

  const addNewItem = async (name, price) => {
    console.log(name, price);
    const result = await itemMContract.methods
      .addNewItem(name, price)
      .send({ from: accounts[0] });

    console.log(result, "------------------------ here");
    checkBalance(accounts);
  };

  const whoIsTheOwner = async () => {
    const result = await itemMContract.methods
      .owner()
      .send({ from: accounts[0] });
    console.log(result);
  };

  useEffect(() => {
    if (!ethereum) return console.log("Please install metamask");
    ethereum.on("accountsChanged", (accounts) => {
      setAccounts(accounts);
      checkBalance(accounts);
    });
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts, "eth_requestAccounts");
      setAccounts(accounts);
    } catch (e) {
      console.log(e);
      throw new Error("No ethereum object.");
    }
  };

  const checkBalance = async (accounts) => {
    try {
      if (!ethereum) return alert("please install metamask");
      if (!accounts.length > 0) return setBalance(0);
      let balance = await web3?.eth?.getBalance(accounts[0]);
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
        accounts: accounts,
        balance,
        checkBalance,
        getData,
        addNewItem,
        whoIsTheOwner,
      }}
    >
      {children}
    </ItemManagerContext.Provider>
  );
};
