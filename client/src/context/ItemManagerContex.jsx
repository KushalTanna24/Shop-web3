/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import itemManagerContract from "../contracts/ItemManager.json";

export const ItemManagerContext = React.createContext();

const { ethereum } = window;
let web3 = new Web3("http://127.0.0.1:8545/");
let networkID;
web3.eth.net.getId().then((e) => (networkID = e));

export const ItemManagerProvider = ({ children }) => {
  const [accounts, setAccounts] = useState("");
  const [balance, setBalance] = useState(0);
  const [length, setLength] = useState(0);
  const [item, setItem] = useState({
    name: "",
    address: "",
    price: "",
    pricePaid: "",
  });
  const [items, setItems] = useState([]);

  const itemMContract = new web3.eth.Contract(
    itemManagerContract?.abi,
    itemManagerContract?.networks[networkID]?.address
  );

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("please install metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    setAccounts(accounts);
    checkBalance(accounts);
  };

  const getData = async (e) => {
    const result = await itemMContract?.methods?.items(e).call();
    checkBalance(accounts);
    return result;
  };

  const lastAddedItem = (item) => {
    if (!item) return "Please enter product information";
    setItem({
      name: item.itemName,
      address: item.itemAddress,
      price: item.pice,
      pricePaid: item.pricePaid,
    });
  };

  const addNewItem = async (name, price) => {
    try {
      const result = await itemMContract?.methods
        ?.addNewItem(name, price)
        .send({
          from: accounts[0],
          gas: 1500000,
          gasPrice: "30000000000",
        });

      console.log(result, "------------------------ here");
      if (result.status) {
        lastAddedItem(result.events.itemEvent.returnValues);
        totalItems();
        alert("added item on the blockchain");
      } else {
        alert("Failed to add item on the blockchain");
      }
      checkBalance(accounts);
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
      checkBalance(accounts);
    }
  };

  const totalItems = async () => {
    const result = await itemMContract?.methods?.itemIndex().call();
    setLength(result);
    let array = [];
    let index = 0;
    for (let i = 0; i < result; i++) {
      const result1 = await getData(i);
      array.push({
        index: index++,
        name: result1.name,
        price: result1.price,
        state: result1.state,
        address: result1._item,
      });
    }
    setItems(array);
    checkBalance(accounts);
    return result;
  };

  const whoIsTheOwner = async () => {
    const result = await itemMContract?.methods?.owner()?.call();
    return result;
  };

  const deliverTheProduct = async (index) => {
    try {
      const result = await itemMContract?.methods
        ?.deliver(index)
        .send({ from: accounts[0] });
      totalItems();
    } catch (error) {
      console.log(error);
      alert(
        "only owner can change the delivery state or product is yet to be sold"
      );
    }
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
        item,
        items,
        totalItems,
        length,
        deliverTheProduct,
      }}
    >
      {children}
    </ItemManagerContext.Provider>
  );
};
