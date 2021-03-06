import React, {Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import {Input, Media} from 'reactstrap';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button'
const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100%',
	  maxHeight:'50ch',
	 // maxWidth: '36ch',
	  backgroundColor: theme.palette.background.paper,
	},
	inline: {
	  display: 'inline',
	},
  }));

  function RenderRequest({Data}){
	const classes = useStyles();
	
	
	
	const list = Data.map((data, index)=>{
		console.log(index);
	const  _arrayBufferToBase64 = ( buffer ) => {
			var binary = '';
			var bytes = new Uint8Array( buffer );
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode( bytes[ i ] );
			}
			return window.btoa( binary );
		}
	const  arrayBufferView = data.image;
	let base = _arrayBufferToBase64(data.image.data)
	console.log('base64',base);
	//const  blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
	
	//const  urlCreator = window.URL;
	//const imageUrl = urlCreator.createObjectURL(blob);
	const imageUrl = arrayBufferView.toString('base64');
		console.log('hello', imageUrl)
		const imgStyle = {
			maxHeight: 128,
			maxWidth: 128
		  }
		return (
			<Media key={index}>
			<Media left href="/home">
			  <Media object src={`data:image/jpeg;base64,${base}`} style = {imgStyle} alt="Generic placeholder image" />
			</Media>
			<Media body>
			  <Media heading>
			  {data.name}
			  </Media>
			  {`-${data.request}`}
			  <br/>
			  <Button component={Link} to={`/viewMedicallRequest/${index}`} color="primary" className="mt-2">View</Button>
			</Media>
			<br/>
			
		  </Media>
			

			 
	
		  );
	})
	    return(
			<div>
				{list}
			</div>
		);

	
  }

const Web3 = require('web3');
const abi= [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "requestHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "fullfilled",
				"type": "bool"
			}
		],
		"name": "RequestCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "collectedAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "valid",
				"type": "uint256"
			}
		],
		"name": "Verified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_rHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "makeRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "request",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "requestHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "fullfilled",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestCount",
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
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_money",
				"type": "uint256"
			}
		],
		"name": "sendMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "verify",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "collectedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "valid",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const TrustChainAddress = '0x4D8BBf5A16Fdc02340a34132E62391Ee782B79a1';
const web3 = new Web3( new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/c1633c281b39417eb2d061c5479a68f7'));

export default class Request extends Component{
    constructor(props){
        super(props);
        this.state={
            requestCount:0,
			index:[],
			State:''
			
        }

    }

    async componentDidMount(){
        //await this.loadEthereumData();
	}
	/*
    async loadEthereumData(){
        const contract = new web3.eth.Contract(abi, TrustChainAddress);
        let requestCount;
        contract.methods.requestCount().call().then((rc)=>{
            requestCount = rc;
            this.setState({requestCount});
            for(let i =1; i<=requestCount; i++){
                contract.methods.request(i).call().then(async(request)=>{
                    console.log('request', request)
                    if(!request.fulfilled){
					  const concat = require('it-concat')
                      const  Data =  await concat(ipfs.cat('QmbQ3PTMdbQ3kdVVff7BLTmyTgg5Sf8UTAMS3k954GUvBh'));
					   const Medical  = JSON.parse(Data.toString());
                       
                       this.setState({data: [...this.state.data, Medical]})
                       this.setState({index: [...this.state.index, i]})
						console.log(this.state.index)
						this.setState({
							requests: [...this.state.requests, request]
						   
						  })
	
                    }
                    else{
                        console.log(i);
                    }
                })
            }
        })
    }
*/
    render(){
        return(
            <div className="container mt-5">
                <div className="row col-12 col-md-12">
                <MDBCol md="12">
				<form onSubmit={(value)=> {
					this.setState({State: value})
			         console.log(value)}} className="md-form mr-auto mb-4">
				  <Input name="state" className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"
				  onChangeText={(value)=> {this.setState({State: value})
				console.log(this.state)} }
				  />
				  <input gradient="aqua" rounded size="sm" type="submit" className="mr-auto"
				  value = "search"/>
            
                  </form>
                  </MDBCol>
                
				</div>
				<RenderRequest Data = {this.props.Data}/>
            
            </div>
        );
    }
}