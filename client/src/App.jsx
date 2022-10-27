/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ItemManger from "./component/ItemManger";
import { ItemManagerProvider } from "./context/ItemManagerContex";

const App = () => {
  useEffect(() => {
    let provider = window.ethereum;
    if (!provider) {
      alert("Please install the metamask");
    }
  }, []);

  const { ethereum } = window;

  try {
    if (ethereum) {
      console.log("Metamask is already installed");
    } else {
      console.log("Metamask is not installed");
    }
  } catch {
    console.log("something is wrong");
  }

  return (
    <ItemManagerProvider>
      <div align="center" style={{ margin: "10rem" }}>
        <ItemManger />
      </div>
    </ItemManagerProvider>
  );
};

export default App;
