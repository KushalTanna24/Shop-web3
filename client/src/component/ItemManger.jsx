/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import { ItemManagerContext } from "../context/ItemManagerContex";

const ItemManger = () => {
  const { accounts, connectWallet, balance, contract } =
    useContext(ItemManagerContext);

  console.log(contract.methods, "methods here");

  const nameRef = useRef("");
  const priceRef = useRef("");

  useEffect(() => {
    // let contract;
    // let result = async () => {
    //   const networkId = await web3.eth.net.getId();
    //   contract = await new web3.eth.contract(
    //     itemManagerContract.abi,
    //     itemManagerContract.networks[networkId].address
    //   );
    // };
    // console.log(result(), "this is contract");
  }, []);

  const isOwner = async () => {
    const result = await contract.methods.isOwner();
    console.log(result);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(nameRef.current.value, priceRef.current.value);
  };

  return (
    <>
      <h1>Item manager</h1>
      <br />
      <button onClick={isOwner}>IsOwner</button>
      <br />
      <br />
      <button onClick={connectWallet}>Connect</button>
      <br />
      <br />
      <h2>
        connected address: &nbsp; &nbsp; &nbsp;
        <span style={{ fontWeight: 100 }}>
          {accounts.length
            ? `${accounts[0]} `
            : "Please click on connect button to connect your meta mask."}
        </span>
      </h2>
      <br />
      <br />
      <h2>
        Balance: &nbsp; &nbsp; &nbsp;
        <span style={{ fontWeight: 100 }}>{balance} ethers</span>
      </h2>
      <br />
      <br />
      <div>
        <h2>Add new product</h2>
        <form onSubmit={submitHandler}>
          <br />
          <div>
            <label style={{ fontSize: "15px" }}>Name</label>
            <input type="text" ref={nameRef} />
          </div>
          <br />
          <div>
            <label style={{ fontSize: "15px" }}>Price</label>
            <input type="text" ref={priceRef} />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
};

export default ItemManger;
