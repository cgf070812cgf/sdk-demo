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
const viewSpotPrices = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { poolId, assetIn, assetOut, blocks, endpoint, displayWeights } = opts;
    const blocksAsNumArray = JSON.parse(blocks).map(Number);
    const sdk = yield sdk_1.default.initialize(endpoint);
    const pool = yield sdk.models.fetchPoolData(Number(poolId));
    if (displayWeights) {
        console.log(pool.weights);
    }
    const prices = yield pool.fetchPoolSpotPrices(assetIn, assetOut, blocksAsNumArray);
    console.log(prices.map((price) => price.toString()).map(Number));
});
exports.default = viewSpotPrices;
//# sourceMappingURL=viewPoolSpotPrices.js.map