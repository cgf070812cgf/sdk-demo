// ==========================getBlockInfo.ts=============================
import { ApiPromise, WsProvider } from "@polkadot/api";

async function main() {
  // Initialise the provider to connect to the local node
  const ZTGNET = 'wss://bp-rpc.zeitgeist.pm'
  const provider = new WsProvider(ZTGNET);

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });

  // Retrieve the chain & node information information via rpc calls
  const [blockNumber] = await Promise.all([
    api.rpc.chain.getHeader(),
  ]);

  console.log(
    `The block number is ${blockNumber}`
  );
}

for (let index = 0; index < 30; index++) {
    setTimeout(function () {
        console.log("index: " + index)
        main().then(function(value) {
            console.log("finish: "+ index);
        })
    },5000)
}

// ==========================countMarkets.ts=============================
// import SDK from "@zeitgeistpm/sdk";

// async function main() {
//   // Initialise the provider to connect to the local node
//   // wss://bsr.zeitgeist.pm
//   // wss://bp-rpc.zeitgeist.pm
//   const ZTGNET = "wss://bsr.zeitgeist.pm";

//   const sdk = await SDK.initialize(ZTGNET);

//   const res = await sdk.models.getMarketCount();

//   console.log(res);
// }

// for (let index = 0; index < 30; index++) {
//     setTimeout(function () {
//         console.log("index: " + index)
//         main().then(function(value) {
//             console.log("finish: "+ index);
//         })
//     },5000)
// }

// ==========================viewMarket.ts=============================

// import SDK from "@zeitgeistpm/sdk";

// async function main() {
//   // Initialise the provider to connect to the local node
//   // wss://bsr.zeitgeist.pm
//   // wss://bp-rpc.zeitgeist.pm
//   const ZTGNET = "wss://bsr.zeitgeist.pm";

//   const sdk = await SDK.initialize(ZTGNET);
//   const marketId: number = 1;

//   const res = await sdk.models.fetchMarketData(marketId);
//   console.log(res.toJSONString());
// }

// for (let index = 0; index < 30; index++) {
//     setTimeout(function () {
//         console.log("index: " + index)
//         main().then(function(value) {
//             console.log("finish: "+ index);
//         })
//     },5000)
// }
