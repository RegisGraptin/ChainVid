## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

```shell
# To load the variables in the .env file
source .env

# To deploy and verify our contract
forge script --chain scroll script/Manager.s.sol:ManagerScript --rpc-url $OP_SEP_RPC_URL --broadcast --verify -vvvv
```


## Contract address
 │   └─ ← [Return] 
    ├─ [2705923] → new Manager@0x2C3F4AB3D9C070032Acb46dFb5944bD94C4b79C6
    │   ├─ [1416276] → new Video@0x2C33241E491dbDAdAf9cC0B74A10f36Eaad1C88A
    │   │   └─ ← [Return] 6737 bytes of code
    │   └─ ← [Return] 6166 bytes of code