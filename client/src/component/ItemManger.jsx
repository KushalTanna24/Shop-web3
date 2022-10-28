/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useRef } from "react";
import { ItemManagerContext } from "../context/ItemManagerContex";

const ItemManger = () => {
  const [owner, setOwner] = useState("");
  const {
    accounts,
    connectWallet,
    balance,
    getData,
    addNewItem,
    whoIsTheOwner,
  } = useContext(ItemManagerContext);

  const nameRef = useRef("");
  const priceRef = useRef(0);
  const whoIs = async () => {
    let result = await whoIsTheOwner();
    setOwner(result);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = addNewItem(
      nameRef.current.value,
      parseInt(priceRef.current.value)
    );
    console.log(result, "kushal bhai here");
  };

  const fetchData = async () => {
    getData().then(console.log());
  };

  return (
    <>
      <h1>Item manager</h1>
      <br />
      <button onClick={whoIs}>Who is owner</button>
      <br />
      <h2>
        Owner of this smart contract is:
        <span style={{ fontWeight: 100 }}>
          <br />
          {owner?.toLowerCase() === accounts[0]?.toLowerCase()
            ? `you`
            : `${owner}`}
        </span>
      </h2>
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
            <input type="text" ref={nameRef} style={{ width: "10%" }} />
          </div>
          <br />
          <div>
            <label style={{ fontSize: "15px" }}>Price</label>
            <input
              type="number"
              ref={priceRef}
              min={0}
              max={100}
              style={{ width: "10%" }}
            />
          </div>
          <br />
          <button type="submit">Add</button>
          <br />
        </form>
        <br />
        <button onClick={fetchData}>get</button>
      </div>
    </>
  );
};

export default ItemManger;
