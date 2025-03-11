# BitGifts

### 🎁 A Simple Way to Gift Bitcoin

BitGifts is a project designed to make gifting Bitcoin easy and accessible, serving as an introduction to **ckBTC on the Internet Computer** and the broader ICP ecosystem. Whether it’s for Christmas, a birthday, or any special occasion, this project provides a seamless way to share Bitcoin with others.

## Local setup

Init toolchain

```bash
mops toolchain init
```

Create and deploy canisters:


```bash
# create all canisters
dfx canister create --all
# deploy ledger canisters
cd external/ && ./setup_ledger.sh
# build and deploy remaining canisters
dfx deploy
```

For frontend development run the vite server:

```bash
npm start
```

Now you should be to access the application and sign in.

To get some funds for testing, call the transfer function on the ledger and specify the deposit address shown on the account page.

```bash
# when prompted, input principal and subaccount as show inside the app
dfx canister call ckbtc_ledger icrc1_transfer
```
