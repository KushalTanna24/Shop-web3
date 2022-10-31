/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useRef } from "react";
import { ItemManagerContext } from "../context/ItemManagerContex";

const ItemManger = () => {
  const [owner, setOwner] = useState("");
  const [itemIndex, setItemIndex] = useState();
  const {
    accounts,
    connectWallet,
    balance,
    addNewItem,
    whoIsTheOwner,
    item,
    length,
    totalItems,
    items,
    deliverTheProduct,
  } = useContext(ItemManagerContext);

  const nameRef = useRef("");
  const priceRef = useRef(0);
  const whoIs = async () => {
    let result = await whoIsTheOwner();
    setOwner(result);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    addNewItem(nameRef.current.value, parseInt(priceRef.current.value));
    nameRef.current.value = "";
    priceRef.current.value = "";
  };

  const delieveryState = {
    0: "Created",
    1: "Purchased",
    2: "Delivered",
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
      <hr />
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
      <button onClick={connectWallet}>Connect</button>
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <h2>
        Your current balance: &nbsp; &nbsp; &nbsp;
        <span style={{ fontWeight: 100 }}>{balance} ethers</span>
      </h2>
      <br />
      <br />
      <hr />
      <br />
      <div>
        <h2>
          Total items:
          <span style={{ fontWeight: 100 }}>
            <br />
            {length}
          </span>
          <br />
          <button onClick={totalItems}>Fetch All</button>
        </h2>
        {items.length ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {items.map((item) => (
              <div
                key={item.address}
                style={{
                  padding: "10px",
                  margin: "10px",
                  width: "20%",
                  backgroundColor: "#3f3d3d1f",
                  overflow: "auto",
                }}
                align="left"
              >
                <h2>
                  Index: <span style={{ fontWeight: 100 }}>{item.index}</span>
                </h2>
                <h2>
                  Name: <span style={{ fontWeight: 100 }}>{item.name}</span>
                </h2>
                <h2>
                  Price:{" "}
                  <span style={{ fontWeight: 100 }}>{item.price} ether</span>
                </h2>
                <h2>
                  Address:{" "}
                  <span style={{ fontWeight: 100 }}>{item.address}</span>
                </h2>
                <h2>
                  Status:
                  <span style={{ fontWeight: 100 }}>
                    {delieveryState[item.state]}
                  </span>
                </h2>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <br />
      <hr />
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%" }}>
          <h1>Add new product</h1>
          <form onSubmit={submitHandler}>
            <br />
            <div>
              <label style={{ fontSize: "15px" }}>Name</label>
              <input type="text" ref={nameRef} style={{ width: "20%" }} />
            </div>
            <br />
            <div>
              <label style={{ fontSize: "15px" }}>Price</label>
              <input
                type="number"
                ref={priceRef}
                min={0}
                max={100}
                style={{ width: "20%" }}
              />
            </div>
            <br />
            <button type="submit">Add</button>
            <br />
          </form>

          {item.name?.trim() !== "" && (
            <>
              <br />
              <br />
              <u align="left">
                <h2>Last Added item:</h2>
              </u>
              <br />
              <h2 align="left">
                Name:
                <span style={{ fontWeight: 100 }}>{item.name}</span>
              </h2>
              <h2 align="left">
                Address:
                <span style={{ fontWeight: 100 }}>{item.address}</span>
              </h2>
              <h2 align="left">
                Price:
                <span style={{ fontWeight: 100 }}>{item.price}</span>
              </h2>
              <h2 align="left">
                pricePaid:
                <span style={{ fontWeight: 100 }}>{item.pricePaid}</span>
              </h2>
            </>
          )}
          <br />
          <br />
          <br />
        </div>
        <div style={{ width: "50%" }}>
          <h1>Deliver product</h1>
          <br />
          <label style={{ fontSize: "15px" }}>Index </label>
          <input
            type="number"
            style={{ width: "50%" }}
            value={itemIndex}
            onChange={(e) => setItemIndex(e.target.value)}
          />
          <br />
          <br />
          <button
            onClick={() => {
              if (items.some((item) => item.index == itemIndex)) {
                deliverTheProduct(itemIndex);
                setItemIndex("");
              } else {
                alert("no product exist with entered index");
                setItemIndex("");
              }
            }}
          >
            Deliver
          </button>
          <br />
        </div>
      </div>
    </>
  );
};

export default ItemManger;
