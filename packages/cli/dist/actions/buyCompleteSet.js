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
const buyCompleteSet = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { endpoint, marketId, amount, seed } = opts;
    const sdk = yield sdk_1.default.initialize(endpoint);
    const signer = sdk_1.util.signerFromSeed(seed);
    console.log(`Buy complete set of ${amount} market ${marketId} outcomes for ${signer.address} on network ${endpoint}`);
    const market = yield sdk.models.fetchMarketData(Number(marketId));
    const res = yield market.buyCompleteSet(signer, Number(amount), false);
    if (res) {
        console.log(`${signer.address} bought complete set of ${amount} market ${marketId} outcomes on network ${endpoint}`);
    }
    return;
});
exports.default = buyCompleteSet;
//# sourceMappingURL=buyCompleteSet.js.map