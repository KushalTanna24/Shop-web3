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
    [
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
        ],
        name: "addNewItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
        ],
        name: "buy",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
        ],
        name: "deliver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "purchasedBy",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "pricePaid",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "itemName",
            type: "string",
          },
          {
            indexed: false,
            internalType: "address",
            name: "itemAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "deliveryState",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "pice",
            type: "uint256",
          },
        ],
        name: "itemEvent",
        type: "event",
      },
      {
        inputs: [],
        name: "isOwner",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "items",
        outputs: [
          {
            internalType: "contract Item",
            name: "_item",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "enum ItemManager.deliveryStatus",
            name: "state",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    "0x77BC27145244Af7521Ce9FECE7c6D7f89668A265"
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
    console.log(itemMContract.methods, "bruh=----------------------------");

    const result = await itemMContract.methods.addNewItem(name, price).send({
      from: "0x50993a4e81b20d698b1396347d599b5319c26925",
      gas: 1500000,
      gasPrice: "30000000000000",
    });

    console.log(result, "------------------------ here");
    checkBalance(accounts);
  };

  const whoIsTheOwner = async () => {
    const result = await itemMContract.methods.owner().call();
    console.log(result);
    return result;
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
