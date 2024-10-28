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


[3213041] → new Manager@0x6E5AE454012F3B9F8DD113aD6bCF9D53f7d839fc
  ├─ [1697981] → new Video@0xc3eAc00AaFbf5E35D34e0367F434CfF8e8B03947
  │   └─ ← [Return] 8144 bytes of code
  └─ ← [Return] 7291 bytes of code

