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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = __importStar(require("@zeitgeistpm/sdk"));
const deployKusamaDerby = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { endpoint, seed } = opts;
    const sdk = yield sdk_1.default.initialize(endpoint);
    const signer = sdk_1.util.signerFromSeed(seed);
    console.log("sending transactions from", signer.address);
    const marketIds = [];
    for (let i = 0; i < 3; i++) {
        const marketId = yield sdk.models.createCategoricalMarket(signer, "5D2L4ghyiYE8p2z7VNJo9JYwRuc8uzPWtMBqdVyvjRcsnw4P", { timestamp: [1620504000000, 1620604000000] }, "Permissionless", { SimpleDisputes: null }, "CPMM", {
            categories: [
                { name: "karura" },
                { name: "moonriver" },
                { name: "phala" },
                { name: "robonomics" },
                { name: "kilt" },
                { name: "equilibirium" },
                { name: "hydradx" },
                { name: "shiden" },
            ],
            slug: `kusama-derby-test-${i}`,
            description: "test description",
            question: "who will win?",
        }, false);
        marketIds.push(marketId);
    }
    console.log(marketIds);
    for (const marketId of marketIds) {
        const market = yield sdk.models.fetchMarketData(marketId);
        yield market.buyCompleteSet(signer, "5000000000000", false);
        yield market.deploySwapPool(signer, [
            "10000000000",
            "10000000000",
            "10000000000",
            "10000000000",
            "10000000000",
            "10000000000",
            "10000000000",
            "10000000000",
            "80000000000",
        ], false);
        const pool = yield market.getPool();
        yield pool.joinPool(signer, "4000000000000", [
            "8000000000000",
            "8000000000000",
            "8000000000000",
            "8000000000000",
            "8000000000000",
            "8000000000000",
            "8000000000000",
            "8000000000000",
            "8000000000000",
        ], false);
    }
});
exports.default = deployKusamaDerby;
//# sourceMappingURL=deployKusamaDerby.js.map