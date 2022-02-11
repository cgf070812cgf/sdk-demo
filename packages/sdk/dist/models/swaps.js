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
const util_1 = require("../util");
class Swap {
    constructor(poolId, details, api) {
        this.joinPool = (signer, poolAmountOut, maxAmountsIn, callbackOrPaymentInfo = false) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.swaps.poolJoin(this.poolId, poolAmountOut, maxAmountsIn);
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_1.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            const _callback = (result, _resolve, _unsub) => {
                const { events, status } = result;
                if (status.isInBlock) {
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                        if (method == "ExtrinsicSuccess") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(true);
                        }
                        if (method == "ExtrinsicFailed") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(false);
                        }
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
            }));
        });
        this.poolJoinWithExactAssetAmount = (signer, assetIn, assetAmount, minPoolAmount, callbackOrPaymentInfo = false) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.swaps.poolJoinWithExactAssetAmount(this.poolId, assetIn, assetAmount, minPoolAmount);
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_1.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            const _callback = (result, _resolve, _unsub) => {
                const { events, status } = result;
                if (status.isInBlock) {
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                        if (method == "ExtrinsicSuccess") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(true);
                        }
                        if (method == "ExtrinsicFailed") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(false);
                        }
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
            }));
        });
        this.joinPoolMultifunc = (signer, opts, callbackOrPaymentInfo = false) => __awaiter(this, void 0, void 0, function* () {
            const _callback = (result, _resolve, _unsub) => {
                const { events, status } = result;
                console.log("status:", status.toHuman());
                if (status.isInBlock) {
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                        if (method == "ExtrinsicSuccess") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(true);
                        }
                        if (method == "ExtrinsicFailed") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(false);
                        }
                    });
                }
            };
            const isLikeNum = (param) => {
                const p = opts.bounds[param];
                return (typeof p === "number" || (Array.isArray(p) && typeof p[0] === "number"));
            };
            const areAllUndefined = (...params) => params.every((param) => typeof opts.bounds[param] === "undefined");
            let tx;
            if (isLikeNum("assetAmount") && isLikeNum("poolMin")) {
                if (!areAllUndefined("poolAmount", "poolMax", "assetMin", "assetMax")) {
                    throw new Error("Too many asset and pool bounds were specified.");
                }
                if (areAllUndefined("assetId")) {
                    throw new Error("Missing assetId.");
                }
                tx = this.api.tx.swaps.poolJoinWithExactAssetAmount(this.poolId, opts.asset, opts.bounds.assetAmount, opts.bounds.poolMin);
            }
            else if (isLikeNum("poolAmount") && isLikeNum("assetMax")) {
                if (!areAllUndefined("assetAmount", "poolMin", "poolMax", "assetMin")) {
                    throw new Error("Too many asset and pool bounds were specified.");
                }
                if (!areAllUndefined("assetId") && Array.isArray(opts.bounds.assetMax)) {
                    throw new Error("Too many asset maxima were specified.");
                }
                else if (areAllUndefined("assetId") &&
                    !Array.isArray(opts.bounds.assetMax)) {
                    opts.bounds.assetMax = [opts.bounds.assetMax];
                }
                tx = areAllUndefined("assetId")
                    ? this.api.tx.swaps.poolJoin(this.poolId, opts.bounds.poolAmount, opts.bounds.assetMax)
                    : this.api.tx.swaps.poolJoinWithExactPoolAmount(this.poolId, opts.asset, opts.bounds.poolAmount, opts.bounds.assetMax);
            }
            else {
                console.log(opts.bounds);
                throw new Error(`Incorrect asset and pool bounds in params to joinPool. Valid combinations are:\n
        poolId, assetId, bounds = { poolAmount, assetMax } \n
        poolId, bounds = { poolAmount, assetMax } \n
        poolId, bounds = { assetAmount, poolMin } \n`);
            }
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_1.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
            }));
        });
        this.exitPool = (signer, poolAmountIn, minAmountsOut, callbackOrPaymentInfo = false) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.swaps.poolExit(this.poolId, poolAmountIn, minAmountsOut);
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_1.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            const _callback = (result, _resolve, _unsub) => {
                const { events, status } = result;
                console.log("status:", status.toHuman());
                if (status.isInBlock) {
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                        if (method == "ExtrinsicSuccess") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(true);
                        }
                        if (method == "ExtrinsicFailed") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(false);
                        }
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
            }));
        });
        this.swapExactAmountIn = (signer, assetIn, assetAmountIn, assetOut, minAmountOut, maxPrice, callbackOrPaymentInfo = false) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.swaps.swapExactAmountIn(this.poolId, util_1.AssetIdFromString(assetIn), assetAmountIn, util_1.AssetIdFromString(assetOut), minAmountOut, maxPrice);
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_1.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            const _callback = (result, _resolve, _unsub) => {
                const { events, status } = result;
                console.log("status:", status.toHuman());
                if (status.isInBlock) {
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                        if (method == "ExtrinsicSuccess") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(true);
                        }
                        if (method == "ExtrinsicFailed") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(false);
                        }
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
            }));
        });
        this.swapExactAmountOut = (signer, assetIn, maxAmountIn, assetOut, assetAmountOut, maxPrice, callbackOrPaymentInfo = false) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.swaps.swapExactAmountOut(this.poolId, util_1.AssetIdFromString(assetIn), maxAmountIn, util_1.AssetIdFromString(assetOut), assetAmountOut, maxPrice);
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_1.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            const _callback = (result, _resolve, _unsub) => {
                const { events, status } = result;
                console.log("status:", status.toHuman());
                if (status.isInBlock) {
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                        if (method == "ExtrinsicSuccess") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(true);
                        }
                        if (method == "ExtrinsicFailed") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(false);
                        }
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => {
                        callback
                            ? callback(result, unsub)
                            : _callback(result, resolve, unsub);
                    });
                }
            }));
        });
        const { assets, pool_status, swap_fee, total_weight, weights } = details;
        this.assets = assets;
        this.status = pool_status.toString();
        this.swapFee = swap_fee.toString();
        this.totalWeight = total_weight.toString();
        this.weights = weights;
        this.poolId = poolId;
        this.api = api;
    }
    toJSONString() {
        const swap = Object.assign({}, this);
        delete swap.api;
        return JSON.stringify(swap, null, 2);
    }
    getSpotPrice(inAsset, outAsset, blockHash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!blockHash) {
                blockHash = yield this.api.rpc.chain.getBlockHash();
            }
            return this.api.rpc.swaps.getSpotPrice(this.poolId, typeof inAsset === "string" ? util_1.AssetIdFromString(inAsset) : inAsset, typeof outAsset === "string" ? util_1.AssetIdFromString(outAsset) : outAsset, blockHash);
        });
    }
    assetSpotPricesInZtg(blockHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const prices = {};
            for (const asset of this.assets) {
                if (asset.isZtg) {
                    continue;
                }
                const price = yield this.getSpotPrice({ ztg: null }, asset, blockHash);
                prices[asset.toString()] = price.toString();
            }
            return prices;
        });
    }
    fetchPoolSpotPrices(inAsset, outAsset, blockNumbers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (blockNumbers) {
                return this.api.rpc.swaps.getSpotPrices(this.poolId, util_1.AssetIdFromString(inAsset), util_1.AssetIdFromString(outAsset), blockNumbers);
            }
        });
    }
    sharesId() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.api.rpc.swaps.poolSharesId(this.poolId);
            return res;
        });
    }
    accountId() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.api.rpc.swaps.poolAccountId(this.poolId);
            return res;
        });
    }
}
exports.default = Swap;
//# sourceMappingURL=swaps.js.map