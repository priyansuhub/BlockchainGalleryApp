import "./App.css";
import React, { useEffect, useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./Utils";
import Web3 from "web3";
import { create } from "ipfs-http-client";
import {
  AppBar,
  Button,
  ImageList,
  ImageListItem,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#6867AC",
  },
}));

function App() {
  const classes = useStyles();
  const [bufferr, setBuffer] = useState();
  const [urlArr, setUrlArr] = useState([]);
  const [count, setCount] = useState();
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545/");
      const accounts = await web3.eth.requestAccounts();
      console.log(accounts[0]);
      setAccount(accounts[0]);
      const contractA = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      setContract(contractA);
      let val = await contractA.methods.getCount().call();
      setCount(val);
      console.log(val);
    }
    load();
  }, []);

  const client = create("https://ipfs.infura.io:5001/api/v0");

  const retrieveFile = (e) => {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      let a = reader.result;
      setBuffer(a);
      // setBuffer(reader.result);
      // console.log(Buffer(buffer));
    };
    e.preventDefault();
  };
  const check = async () => {
    // console.log(Buffer(bufferr));
    const created = await client.add(Buffer(bufferr));
    await contract.methods.setValue(created.path).send({ from: account });
  };
  const gethash = async () => {
    for (var i = 0; i < count; i++) {
      const returnval = await contract.methods.getValue(i).call();
      let url = `https://ipfs.infura.io/ipfs/${returnval}`;
      console.log(url);
      setUrlArr((urlArr) => [...urlArr, url]);
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">Priyansu Rath</Typography>

          <Typography variant="h6" className={classes.acco}>
            {account}
          </Typography>
          <Button onClick={gethash}>Refresh</Button>
          <input type="file" onChange={retrieveFile} />
          <Button onClick={check}>SUBMIT</Button>
        </Toolbar>
      </AppBar>
      <ImageList sx={{ width: 500, height: 400 }} cols={3} rowHeight={164}>
        {urlArr.map((item) => (
          <ImageListItem>
            <img src={item} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default App;
