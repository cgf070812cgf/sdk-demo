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
const currencyTransfer = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { dest, marketId, categoryIndex, scalarPos, poolShare, ztg, amount, endpoint, seed, } = opts;
    const sdk = yield sdk_1.default.initialize(endpoint);
    const signer = sdk_1.util.signerFromSeed(seed);
    console.log("Sending transaction from", signer.address);
    let currencyId;
    if (marketId) {
        if (categoryIndex) {
            currencyId = { CategoricalOutcome: [marketId, categoryIndex] };
        }
        else if (scalarPos) {
            currencyId = { ScalarOutcome: [marketId, scalarPos] };
        }
        else {
            throw new Error("If specifying marketId, either categoryIndex or scalarPos must be provided.");
        }
    }
    else if (poolShare) {
        currencyId = { PoolShare: null };
    }
    else if (ztg) {
        currencyId = { Ztg: null };
    }
    else {
        currencyId = { CombinatorialOutcome: null };
    }
    const res = yield sdk.models.currencyTransfer(signer, dest, currencyId, amount, false);
    if (res) {
        console.log(`Successfully transferred ${JSON.stringify(currencyId)}`);
    }
    else {
        console.log(`Unable to transfer ${JSON.stringify(currencyId)} - check balance.`);
    }
    process.exit(0);
});
exports.default = currencyTransfer;
//# sourceMappingURL=currencyTransfer.js.map