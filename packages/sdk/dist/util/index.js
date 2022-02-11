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
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimatedFee = exports.AssetIdFromString = exports.isExtSigner = exports.changeEndianness = exports.isValidAddress = exports.unsubOrWarns = exports.signerFromSeed = exports.initIpfs = exports.initApi = void 0;
const ipfs_1 = require("./ipfs");
Object.defineProperty(exports, "initIpfs", { enumerable: true, get: function () { return ipfs_1.initIpfs; } });
const polkadot_1 = require("./polkadot");
Object.defineProperty(exports, "initApi", { enumerable: true, get: function () { return polkadot_1.initApi; } });
Object.defineProperty(exports, "signerFromSeed", { enumerable: true, get: function () { return polkadot_1.signerFromSeed; } });
Object.defineProperty(exports, "unsubOrWarns", { enumerable: true, get: function () { return polkadot_1.unsubOrWarns; } });
Object.defineProperty(exports, "isValidAddress", { enumerable: true, get: function () { return polkadot_1.isValidAddress; } });
const changeEndianness = (string) => {
    const result = [];
    let len = string.length - 2;
    while (len >= 0) {
        result.push(string.substr(len, 2));
        len -= 2;
    }
    return result.join("");
};
exports.changeEndianness = changeEndianness;
const isExtSigner = (signer) => {
    return signer.signer !== undefined;
};
exports.isExtSigner = isExtSigner;
const tolerantJsonParse = (anything) => {
    try {
        return JSON.parse(anything);
    }
    catch (e) {
        throw new Error("asset was not ztg, poolX or valid JSON");
    }
};
const AssetIdFromString = (stringAsset) => {
    if (stringAsset === "ztg") {
        return { ztg: null };
    }
    if (typeof stringAsset === "string") {
        const poolId = stringAsset.replace(/pool(share)?\:?/i, "");
        if (!isNaN(Number(poolId))) {
            return { poolShare: Number(poolId) };
        }
    }
    const asset = typeof stringAsset === "string"
        ? tolerantJsonParse(stringAsset)
        : stringAsset;
    if (Array.isArray(asset) && asset.length === 2) {
        if (isNaN(Number(asset[0]))) {
            throw new Error("In [market,outcome] market must be a number");
        }
        asset[0] = Number(asset[0]);
        if (["Long", "Short"].includes(asset[1])) {
            return { scalarOutcome: asset };
        }
        if (isNaN(Number(asset[0]))) {
            throw new Error(`In [market,outcome] only numerical values, or "Long", "Short" are supported for outcome`);
        }
        return { categoricalOutcome: asset.map(Number) };
    }
    if (typeof asset === "object" && !Array.isArray(asset)) {
        if (asset.ztg === null) {
            return { ztg: null };
        }
        if (typeof asset.poolShare === "number") {
            return { poolShare: asset.poolShare };
        }
        if (typeof asset.categoricalOutcome[0] === "number" &&
            typeof asset.categoricalOutcome[1] === "number") {
            return { categoricalOutcome: asset.categoricalOutcome.slice(0, 2) };
        }
        if (typeof asset.scalarOutcome[0] === "number" &&
            ["Long", "Short"].includes(asset.scalarOutcome[1])) {
            return { scalarOutcome: asset.scalarOutcome.slice(0, 2) };
        }
    }
    throw new Error(`Could not parse asset "${stringAsset}". Try ztg, [X,Y], '[X,"Long"]', '[X,"Short"]', poolX.`);
};
exports.AssetIdFromString = AssetIdFromString;
const estimatedFee = (tx, address) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield tx.paymentInfo(address);
    return info.partialFee.toString();
});
exports.estimatedFee = estimatedFee;
//# sourceMappingURL=index.js.map