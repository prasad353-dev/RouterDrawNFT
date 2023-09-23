 // import "./App.css";
import { useState,useEffect,useRef } from "react";
import { signInWithGoogle } from "./firebase-config";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import Webcam from 'react-webcam'
import Transfer from "./Transfer";
import { db } from "./firebase-config";
import { Canvas } from './Canvas'
import { ClearCanvasButton } from './ClearCanvasButton';
import Draw from './Draw';

import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
  } from "firebase/firestore";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

import { Card, Button, Row, Col } from 'react-bootstrap';
import card1 from './images/card1.png'
import card2 from './images/card2.png'
import card3 from './images/card3.png'
import routerlogo from './images/routerlogo.png'
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import { ethers } from 'ethers';
import './App.css';
import camera from './images/camera.png';
import logo from './images/logo2.png'
import heading from './images2/heading.png'
import Home from './pages/Home'


import { Routes, Route,Link } from "react-router-dom";

function App() {

  const [loginButtonColor,setLoginButtonColor]=useState('button-1')
  const [loginButtonText,setLoginButtonText]=useState('Sign in ')
  const [loginImage,setLoginImage]=useState(false)
  const [loginButtonImage,setLoginButtonImage]=useState('')
  const [account,setAccount]=useState('Connect Wallet')
  const [accountShow,setAccountShow]=useState('')
  const [balance,setBalance]=useState(0)
  const [show, setShow] = useState(false);
  const [pics,setPics] =useState([]);
  const usersCollectionRef = collection(db, "user");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const webRef=useRef(null)
  const [screenshot,setScreenShot]=useState('')
  const [buttonColor,setButtonColor]=useState('')
  const [send,setSend]=useState('mint')
  const [send1,setSend1]=useState('false')
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  let ctx = null;


  let abi=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "chainName",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestIdentifier",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "execFlag",
				"type": "bool"
			},
			{
				"internalType": "bytes",
				"name": "execData",
				"type": "bytes"
			}
		],
		"name": "iAck",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "requestSender",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "packet",
				"type": "bytes"
			},
			{
				"internalType": "string",
				"name": "srcChainId",
				"type": "string"
			}
		],
		"name": "iReceive",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "chainId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contractAddress",
				"type": "string"
			}
		],
		"name": "setContractOnChain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "feePayerAddress",
				"type": "string"
			}
		],
		"name": "setDappMetadata",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "gateway",
				"type": "address"
			}
		],
		"name": "setGateway",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "chainName",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "nftId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "uri",
						"type": "string"
					}
				],
				"internalType": "struct XERC721.TransferTemp",
				"name": "transferTemp",
				"type": "tuple"
			}
		],
		"name": "transferCrossChain",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ChainName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "gateway",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gatewayContract",
		"outputs": [
			{
				"internalType": "contract IGateway",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "destGasLimit",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "destGasPrice",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "ackGasLimit",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "ackGasPrice",
				"type": "uint64"
			},
			{
				"internalType": "uint128",
				"name": "relayerFees",
				"type": "uint128"
			},
			{
				"internalType": "uint8",
				"name": "ackType",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "isReadCall",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "asmAddress",
				"type": "string"
			}
		],
		"name": "getRequestMetadata",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "ourContractOnChains",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "a",
				"type": "address"
			}
		],
		"name": "toBytes",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "b",
				"type": "bytes"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "uri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  AOS.init();



  

    // Define the styles for the card with a red gradient background
   

  useEffect(async () => {
    
	
  })

  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
	 
	  localStorage.setItem('address',accounts[0])
      setAccount(accounts[0].substring(0,4)+"...."+accounts[0].substring(38,42));
	  localStorage.setItem('account',accounts[0].substring(0,4)+"...."+accounts[0].substring(38,42))
      setAccountShow(accounts[0])
	  const user = await getDocs(usersCollectionRef);
	
	  const userdata=user.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
	  
	 let flag=0;
	 
	// alert("account[0] is "+accounts[0].length)
		for (let i = 0; i < userdata.length; i++) {
			const element = userdata[i];
			// alert(element.address);
			// console.log(typeof(element.address));
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			  });
			if(accounts[0].toLowerCase()==element.address.toLowerCase())
			{
				// alert("matched");
				flag=flag+1;
				localStorage.setItem('userId',element.id)

			}
			else
			{
				// alert("not matched "+accounts[0]);

			}
		}

	if(flag==0)
	{
		alert("adding new user")
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		  });
		await addDoc(usersCollectionRef,{
			address: accounts[0],
			pics:[]
		})
		localStorage.setItem("address",accounts[0])
		window.location.reload(true)
	}
		
  
	  
  
	
	 
	
     
      
    }
    
  }
  return (
    <div className="App">
     
	  
		
	  {/* <img  style={{width:'300px',borderRadius:'40px'}} src={logo}/> */}
	  
	 

	
	 

	
	

	  
	  
		<div class="navbar" style={{backgroundColor:'rgba(0,0,0,0.6)',height:'65px'}}>
		
			<div style={{color:'Violet',fontSize:'20px'}}>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<img style={{width:'120px'}} src={routerlogo} ></img>
				<b>DrawNFT</b></div>
	  <Button variant="warning" class="button-92" onClick={
        

        connectWallet}>{localStorage.getItem('address')!=null?localStorage.getItem('account'):account}</Button>
      
	  &nbsp;
		</div>

		<div style={{backgroundColor:'red'}}>
		<marquee>
			
		<h5 style={{color:'white'}}>Draw anything and convert to CrossChain NFT using Router Protocol !</h5>
		
		</marquee>
		</div>

	 
	 
	  
	  <div >
		<div >
		{/* <div style={{border: '2px solid black'}}>
			<div style={{backgroundColor:'white'}}> */}
	  {/* <Canvas/> */}

	  
	  {/* </div>
	  
	 
	  </div> */}

	  </div>
	  <br></br><br></br>
	  <div class="mint">

		
	 
                
      
	  
	 
	 
	 

      
	 
	  <div>

		


	  {2==2?<div>
		
		
	  {2==2?<div><button class="button1" onClick={async ()=>{
		

		


			 const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			  });
			const provider = new ethers.providers.Web3Provider(window.ethereum)
		 
		
			const signer = provider.getSigner();
		await window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [{
				chainId: "0x13881",
				rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
				chainName: "Mumbai",
				nativeCurrency: {
					name: "MATIC",
					symbol: "MATIC",
					decimals: 18
				},
				blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
			}]
		})
	   
		
		
		const contractAddress = "0x5f2F1A306353751B4633F4b062B92522d5Fd5371";
		const contract = new ethers.Contract(
			contractAddress,
			abi,
			signer
		)
	  
		contract.mint().then(()=>{
			

			setSend('Transfer')
			setSend1('true')
			handleShow()
		}).catch((error)=>{
			alert(error)
		})
            
		
	  }}> Mint Cross Chain NFT</button></div>:<div></div>}
	  <br></br>
		
		<hr></hr>
		
		</div>
      :<div>
		<hr></hr>
		
		<Link to={`/transfer?ipfsHash=${screenshot}`}>Transfer</Link>
		
		
		
		</div>}
		</div>
		</div>
		<div>
	  
	
	
		{/* <h5 style={{color:'white'}}>Transfer on other Chain</h5> */}
		
	 
	  
      </div>
	  </div>
	  
	{/* {send1=='true'?:<div></div>} */}
    
    {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Destination Chain</Modal.Title>
        </Modal.Header>
        <Modal.Body><div><center><h5 style={{color:'white'}}>Choose your Destination Chain</h5><Transfer/></center></div></Modal.Body>
        <Modal.Footer>
          
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
	  
      <Routes>
	 
<Route path="/transfer" element={<Transfer/>} />
<Route path="/draw" element={<Draw/>} />
    </Routes>


     



    </div>
  );
}

export default App;