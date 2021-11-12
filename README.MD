# Introduction
This project is supposed to be a (very barebones) replica of AirBnB utilising blockchain technology to interact directly with a smart home system.

# Running instructions
To run the web app:

1. run a blockchain locally (`ganache-cli`)
2. Migrate the contract to the blockchain you have running (`truffle migrate`)
3. navigate to the client directory and run npm start:
    ```
        cd client
        npm start
    ```

# Current functionality
You should currently be able to run the web app alongside a local blockchain.
This will allow you to create rental properties and view them in the web app.