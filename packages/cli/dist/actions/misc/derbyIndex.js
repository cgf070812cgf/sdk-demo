"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = __importDefault(require("@zeitgeistpm/sdk"));
const fs_1 = __importDefault(require("fs"));
const util_crypto_1 = require("@polkadot/util-crypto");
const FAUCET_ADDRESS = "5EeeZVU4SiPG6ZRY7o8aDcav2p2mZMdu3ZLzbREWuHktYdhX";
const DERBY_MARKETS = [14, 15, 16];
const METHODS = ["balances", "swaps", "predictionMarkets"];
const Store = new Map();
const addPoints = (address, points) => {
    console.log(`Adding ${points} to ${address}`);
    if (Store.has(address)) {
        const oldVal = Store.get(address);
        Store.set(address, oldVal + points);
    }
    else {
        Store.set(address, points);
    }
    return true;
};
const derbyIndex = () => __awaiter(void 0, void 0, void 0, function* () {
    const sdk = yield sdk_1.default.initialize("ws://localhost:9944");
    const readExtrinsicsHistory = () => __awaiter(void 0, void 0, void 0, function* () {
        const currentHeader = yield sdk.api.rpc.chain.getHeader();
        const headBlock = yield sdk.api.rpc.chain.getBlock(currentHeader.hash);
        let curBlock = headBlock;
        while (curBlock.block.header.number.toNumber() > 0) {
            const { block } = curBlock;
            const { header, extrinsics } = block;
            console.log("Current block", block.header.number.toNumber());
            for (const extrinsic of extrinsics) {
                const { method, signer } = extrinsic;
                const { method: exMethod, section, args } = method;
                if (!!METHODS.find((x) => x === section)) {
                    if (section === "balances") {
                        if (exMethod === "transfer") {
                            if (signer.toString() === FAUCET_ADDRESS) {
                                const [dest] = args;
                                addPoints(dest.toString(), 0.1);
                            }
                        }
                    }
                    if (section === "swaps") {
                        if (exMethod === "swapExactAmountIn") {
                            const [, , , assetOut] = args;
                            if (assetOut.isCategoricalOutcome) {
                                const [marketId] = assetOut.asCategoricalOutcome;
                                if (DERBY_MARKETS.indexOf(marketId.toNumber()) !== -1) {
                                    addPoints(signer.toString(), 1);
                                }
                            }
                        }
                    }
                    if (section === "predictionMarkets") {
                        if (exMethod === "redeemShares") {
                            const marketId = Number(args[0].toString());
                            if (DERBY_MARKETS.indexOf(marketId) !== -1) {
                                addPoints(signer.toString(), 5);
                            }
                        }
                    }
                }
            }
            curBlock = yield sdk.api.rpc.chain.getBlock(header.parentHash);
        }
    });
    const getAllBalances = () => __awaiter(void 0, void 0, void 0, function* () {
        const allKeys = yield sdk.api.query.system.account.keys();
        const balances = yield Promise.all(allKeys.map((key) => __awaiter(void 0, void 0, void 0, function* () {
            const pubkey = key.toString().slice(-64);
            const address = util_crypto_1.encodeAddress("0x" + pubkey);
            const data = yield sdk.api.query.system.account(address);
            return [address.toString(), data.data.free.toString()];
        })));
        for (const entry of balances) {
            const points = Math.min(10, (Number(entry[1]) * 0.01) / Math.pow(10, 10));
            addPoints(entry[0], points);
        }
    });
    yield getAllBalances();
    yield readExtrinsicsHistory();
    for (const entry of Array.from(Store)) {
        fs_1.default.appendFileSync("derbyIndex.output", `${entry[0]},${entry[1]}\n`);
    }
});
try {
    derbyIndex();
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=derbyIndex.js.map