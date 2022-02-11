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
const getShareBalance = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { addressOrSeed, seed, asset, endpoint } = opts;
    let address, signer;
    const sdk = yield sdk_1.default.initialize(endpoint);
    if (sdk_1.util.isValidAddress(addressOrSeed || opts.address)) {
        address = addressOrSeed || opts.address;
    }
    else {
        if (seed || addressOrSeed) {
            try {
                signer = sdk_1.util.signerFromSeed(seed || addressOrSeed);
                address = signer.address;
                console.log(`Sending transaction from ${address}`);
            }
            catch (e) {
                throw new Error(`${seed || addressOrSeed} was not a useable seed.`);
            }
        }
        else {
            throw new Error("No address or seed provided");
        }
    }
    if (seed) {
        if (opts.address) {
            console.log(`Both an address (${address}) and a seed were provided. The address will be used.`);
        }
        else {
            console.log(`Using ${address} generated from the provided seed`);
        }
    }
    const data = asset === "ztg"
        ? yield sdk.api.query.system
            .account(address)
            .then((res) => res.toRawType())
        : yield sdk.api.query.tokens.accounts(address, sdk_1.util.AssetIdFromString(asset));
    console.log("", data);
});
exports.default = getShareBalance;
//# sourceMappingURL=getShareBalance.js.map