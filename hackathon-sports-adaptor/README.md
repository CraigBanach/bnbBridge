# Running a Node

Chainlink video tutorial walkthrough of the below: https://www.youtube.com/watch?v=Ba1satx_fw0&ab_channel=Chainlink

Note: this repo was built using the Chainlink NodeJS External Adapter Template.

Docker Running: https://www.docker.com

Free Alchemy Account: https://www.alchemy.com/

Postgres: https://postgresapp.com/

Testnet ETH in MetaMask: https://faucets.chain.link/

Testnet LINK in wallet (Kovan): https://faucets.chain.link/


# Step by step setup

Create a local directory to hold the Chainlink data. Paste the below into your terminal and hit enter:
```
mkdir ~/.chainlink-kovan
```

# Create an Environment File

Paste the below into your terminal and hit enter: 
```
echo "ROOT=/chainlink
LOG_LEVEL=debug
ETH_CHAIN_ID=42
MIN_OUTGOING_CONFIRMATIONS=2
LINK_CONTRACT_ADDRESS=0xa36085F69e2889c224210F603D836748e7dC0088
CHAINLINK_TLS_PORT=0
SECURE_COOKIES=false
GAS_UPDATER_ENABLED=true
ALLOW_ORIGINS=*" > ~/.chainlink-kovan/.env
```

# Ethereum Client as an External Provider
Go to Alchemy: https://www.alchemy.com/ and create a staging App on the Kovan network. 
View details > view key > copy Websockets address. Paste the below into your terminal, replace *CHANGEME* with your Websockets address and hit enter: 
```
echo "ETH_URL=CHANGEME" >> ~/.chainlink-kovan/.env
```
# Set the Remote DATABASE_URL Config

Download and start Postgres: https://postgresapp.com/

Paste the below into your terminal, replace *$USERNAME* and *$DATABASE* with the Postgres database that has your username (ie, not the one called Postgres or template1, but your username) and hit enter: 
```
echo "DATABASE_URL=postgresql://$USERNAME:@host.docker.internal:5432/$DATABASE?sslmode=disable" >> ~/.chainlink-kovan/.env
```

# Start the Chainlink Node

Paste the below into your terminal and hit enter:
```
cd ~/.chainlink-kovan && docker run -p 6688:6688 -v ~/.chainlink-kovan:/chainlink -it --env-file=.env smartcontract/chainlink:1.0.0 local n
```

The first time running the image, it will ask you for a password and confirmation. Your password must contain numbers and letters and be more than 12 characters long. This will be your wallet password that you can use to unlock the keystore file generated for you. Then, you'll be prompted to enter an API Email and Password. This will be used to expose the API for the GUI interface, and will be used every time you log into your node. 

You can now connect to your Chainlink node's UI interface by navigating to http://localhost:6688

Fund the Ethereum address that your Chainlink node uses. You can find the address in the node Operator GUI under the Keys tab. The address of the node is the Regular type. You can obtain test ETH from several faucets.


# Deploy your own Oracle contract

## Overall
I'm able to successfully deploy the Oracle contract to the Kovan testnet using the Remix IDE and run a job with my node per the [Chainlink video walkthrough](https://www.youtube.com/watch?v=Ba1satx_fw0&ab_channel=Chainlink), or here for [text version](https://docs.chain.link/docs/fulfilling-requests/). However, as our ultimate objective is to enable our bnbBridge contract to communicate with our node, we can't use Remix IDE to compile and deploy our contract, but instead use our own frontend. This is where I'm currently stuck. 

## Where I'm currently at
I've added the Oracle contract (```Oracle.sol```) into this repo, together with a deploy script in the migrations directory (```3_deploy_contracts```). In your terminal in the root folder of this project, type ```truffle compile``` and hit enter. Then type ```truffle migrate``` and hit enter. The Oracle contract should compile and deploy successfully. (Note: I added the Kovan LINK token address ```"0xa36085F69e2889c224210F603D836748e7dC0088"``` to the ```3_deploy_contracts``` file in the migrations directory as it's required by the contract's constructor).


Next, I copied the ```Oracle.json``` ABI file from the build directory and added it to the ```bnbbridge-frontend``` repository (I pushed this to you in a separate git branch). The ```bnbbridge-frontend``` repo is a clone from a _buildspace React frontend project that successfully opens MetaMask and mints an NFT in the browser. You can see this by running `npm install` at the root of the ```bnbbridge-frontend``` directory and then `npm run start` to start the project. 

In the App.js, I then try to replace the variables (eg ```myEpicNFT``` with ```SetFulfillmentPermission```) and the ABI (eg ```MyEpicNFT.json``` with ```Oracle.json```) per the Chainlink video walkthrough above. In particular, I'm unable to replace this line of code with the ```SetFulFillmentPermission``` event: 

  
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
 
        
  Basically, I'm unable to connect the Oracle contract with the React frontend in order to communicate with our node. 


 <!-- # Chainlink NodeJS External Adapter Template

This template provides a basic framework for developing Chainlink external adapters in NodeJS. Comments are included to assist with development and testing of the external adapter. Once the API-specific values (like query parameters and API key authentication) have been added to the adapter, it is very easy to add some tests to verify that the data will be correctly formatted when returned to the Chainlink node. There is no need to use any additional frameworks or to run a Chainlink node in order to test the adapter.

## Creating your own adapter from this template

Clone this repo and change "ExternalAdapterProject" below to the name of your project

```
bash
git clone https://github.com/thodges-gh/CL-EA-NodeJS-Template.git ExternalAdapterProject
```

Enter into the newly-created directory

```
bash
cd ExternalAdapterProject
```

You can remove the existing git history by running:

```bash
rm -rf .git
```

See [Install Locally](#install-locally) for a quickstart

## Input Params

- `base`, `from`, or `coin`: The symbol of the currency to query
- `quote`, `to`, or `market`: The symbol of the currency to convert to

## Output

```json
{
 "jobRunID": "278c97ffadb54a5bbb93cfec5f7b5503",
 "data": {
  "USD": 164.02,
  "result": 164.02
 },
 "statusCode": 200
}
```

## Install Locally

Install dependencies:

```bash
yarn
```

### Test

Run the local tests:

```bash
yarn test
```

Natively run the application (defaults to port 8080):

### Run

```bash
yarn start
```

## Call the external adapter/API server

```bash
curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": 0, "data": { "from": "ETH", "to": "USD" } }'
```

## Docker

If you wish to use Docker to run the adapter, you can build the image by running the following command:

```bash
docker build . -t external-adapter
```

Then run it with:

```bash
docker run -p 8080:8080 -it external-adapter:latest
```

## Serverless hosts

After [installing locally](#install-locally):

### Create the zip

```bash
zip -r external-adapter.zip .
```

### Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 12.x for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `external-adapter.zip` file
- Handler:
    - index.handler for REST API Gateways
    - index.handlerv2 for HTTP API Gateways
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
- Save

#### To Set Up an API Gateway (HTTP API)

If using a HTTP API Gateway, Lambda's built-in Test will fail, but you will be able to externally call the function successfully.

- Click Add Trigger
- Select API Gateway in Trigger configuration
- Under API, click Create an API
- Choose HTTP API
- Select the security for the API
- Click Add

#### To Set Up an API Gateway (REST API)

If using a REST API Gateway, you will need to disable the Lambda proxy integration for Lambda-based adapter to function.

- Click Add Trigger
- Select API Gateway in Trigger configuration
- Under API, click Create an API
- Choose REST API
- Select the security for the API
- Click Add
- Click the API Gateway trigger
- Click the name of the trigger (this is a link, a new window opens)
- Click Integration Request
- Uncheck Use Lamba Proxy integration
- Click OK on the two dialogs
- Return to your function
- Remove the API Gateway and Save
- Click Add Trigger and use the same API Gateway
- Select the deployment stage and security
- Click Add

### Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `external-adapter.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_API_key 
   -->
