"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAddress = exports.signerFromSeed = exports.unsubOrWarns = exports.initApi = void 0;
const api_1 = require("@polkadot/api");
const keyring_1 = require("@polkadot/keyring");
const util_1 = require("@polkadot/util");
const zeitgeistDefinitions = __importStar(require("@zeitgeistpm/type-defs"));
require("@zeitgeistpm/types");
const typesFromDefs = (definitions) => {
    return Object.values(definitions).reduce((res, { types }) => (Object.assign(Object.assign({}, res), types)), {});
};
const initApi = (endpoint = "wss://bsr.zeitgeist.pm") => {
    return api_1.ApiPromise.create({
        provider: new api_1.WsProvider(endpoint),
        rpc: {
            predictionMarkets: {
                marketOutcomeShareId: {
                    description: "Get the market outcome share identifier.",
                    params: [
                        {
                            name: "market_id",
                            type: "MarketId",
                        },
                        {
                            name: "outcome",
                            type: "u16",
                        },
                        {
                            name: "at",
                            type: "Hash",
                            isOptional: true,
                        },
                    ],
                    type: "Asset",
                },
            },
            swaps: {
                poolSharesId: {
                    description: "Gets the share identifier for the pool shares.",
                    params: [
                        {
                            name: "pool_id",
                            type: "u128",
                        },
                        {
                            name: "at",
                            type: "Hash",
                            isOptional: true,
                        },
                    ],
                    type: "Asset",
                },
                poolAccountId: {
                    description: "Gets the pool's account.",
                    params: [
                        {
                            name: "pool_id",
                            type: "u128",
                        },
                        {
                            name: "at",
                            type: "Hash",
                            isOptional: true,
                        },
                    ],
                    type: "AccountId",
                },
                getSpotPrice: {
                    description: "Gets the spot price for a pool's in and out assets.",
                    params: [
                        {
                            name: "pool_id",
                            type: "u128",
                        },
                        {
                            name: "asset_in",
                            type: "Asset",
                        },
                        {
                            name: "asset_out",
                            type: "Asset",
                        },
                        {
                            name: "at",
                            type: "Hash",
                            isOptional: true,
                        },
                    ],
                    type: "SerdeWrapper",
                },
                getSpotPrices: {
                    description: "Gets spot prices for a range of blocks",
                    params: [
                        {
                            name: "pool_id",
                            type: "u128",
                        },
                        {
                            name: "asset_in",
                            type: "Asset",
                        },
                        {
                            name: "asset_out",
                            type: "Asset",
                        },
                        {
                            name: "blocks",
                            type: "Vec<BlockNumber>",
                        },
                    ],
                    type: "Vec<SerdeWrapper>",
                },
            },
        },
        typesAlias: {
            tokens: {
                AccountData: "TokensAccountData",
            },
        },
        types: Object.assign(Object.assign({}, typesFromDefs(zeitgeistDefinitions)), { BalanceInfo: {
                amount: "Balance",
            }, TokensAccountData: {
                free: "Balance",
                reserved: "Balance",
                frozen: "Balance",
            } }),
    });
};
exports.initApi = initApi;
const unsubOrWarns = (unsub) => {
    if (unsub) {
        unsub();
    }
    else {
        console.warn("Failing to unsubscribe from subscriptions could lead to memory bloat");
    }
};
exports.unsubOrWarns = unsubOrWarns;
const signerFromSeed = (seed) => {
    const keyring = new keyring_1.Keyring({
        type: "sr25519",
    });
    return keyring.addFromUri(seed);
};
exports.signerFromSeed = signerFromSeed;
const isValidAddress = (address) => {
    if (typeof address !== "string") {
        return false;
    }
    try {
        keyring_1.encodeAddress(util_1.isHex(address) ? util_1.hexToU8a(address) : keyring_1.decodeAddress(address));
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidAddress = isValidAddress;
//# sourceMappingURL=polkadot.js.map