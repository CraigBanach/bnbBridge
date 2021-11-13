# Introduction
This project is supposed to be a (very barebones) replica of AirBnB utilising blockchain technology to interact directly with a smart home system.

# Running instructions
To run the web app:

1. run a blockchain locally (`ganache-cli`)
2. Migrate the contract to the blockchain you have running (`truffle migrate`)
3. navigate to the client directory, install React dependencies and run npm start:
    ```
        cd client
        npm i
        npm start
    ```

4. The page will initially say ``alert: Failed to load web3, accounts, or contract. Check console for details.`` To resolve this, open MetaMask in the http://localhost:3000/ browser and import ``Private Key(0)`` from the ``Account(0)`` from the running local Ganache blockchain node. Click on the link to ``Add Property``, enter details and the property will be listed on the ``Properties page``. 

# Current functionality
You should currently be able to run the web app alongside a local blockchain.
This will allow you to create rental properties and view them in the web app.