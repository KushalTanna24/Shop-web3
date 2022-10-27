/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { useRef } from "react";
import { ItemManagerContext } from "../context/ItemManagerContex";

const ItemManger = () => {
  const {
    accounts,
    connectWallet,
    balance,
    getData,
    addNewItem,
    whoIsTheOwner,
  } = useContext(ItemManagerContext);

  const nameRef = useRef("");
  const priceRef = useRef("");

  const whoIs = async () => {
    whoIsTheOwner().then((owner) =>
      console.log(owner, " <---- he is the owner")
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    addNewItem(nameRef.current.value, priceRef.current.value);
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
