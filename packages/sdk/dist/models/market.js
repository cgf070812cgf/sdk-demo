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
const swaps_1 = __importDefault(require("./swaps"));
const util_1 = require("../util");
class Market {
    constructor(marketId, market, decodedMetadata, api) {
        this.marketId = marketId;
        this.getPoolId = () => __awaiter(this, void 0, void 0, function* () {
            return (yield this.api.query.marketCommons.marketPool(this.marketId)).toHuman();
        });
        this.getPool = () => __awaiter(this, void 0, void 0, function* () {
            const poolId = yield this.getPoolId();
            if (poolId == null) {
                return null;
            }
            if (poolId == null) {
                return null;
            }
            const pool = (yield this.api.query.swaps.pools(poolId));
            if (pool.isSome) {
                return new swaps_1.default(poolId, pool.unwrap(), this.api);
            }
            return null;
        });
        this.getDisputes = () => __awaiter(this, void 0, void 0, function* () {
            return (yield this.api.query.predictionMarkets.disputes(this.marketId)).toJSON();
        });
        this.deploySwapPool = (signer, weights, callbackOrPaymentInfo = false) => __awaiter(this, void 0, void 0, function* () {
            const poolId = yield this.getPoolId();
            if (poolId) {
                throw new Error("Pool already exists for this market.");
            }
            const tx = this.api.tx.predictionMarkets.deploySwapPoolForMarket(this.marketId, weights);
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
                        if (method == "PoolCreate") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve(data[0].toString());
                        }
                        if (method == "ExtrinsicFailed") {
                            util_1.unsubOrWarns(_unsub);
                            _resolve("");
                        }
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                console.log("Relative weights: ", weights
                    .map(Number)
                    .map((x) => x / 1e10)
                    .map((x) => `${x}X1e10`));
                console.log(`If market ${this.marketId} has a different number of outcomes than ${weights.length - 1}, you might get error {6,13}.\n`);
                if (this.outcomeAssets) {
                    if (weights.length !== this.outcomeAssets.length + 1) {
                        console.log("Weights length mismatch. Expect an error {6,13}: ProvidedValuesLenMustEqualAssetsLen.");
                        if (weights.length === this.outcomeAssets.length) {
                            console.log("Hint: don't forget to include the weight of ZTG as the last weight!");
                        }
                    }
                }
                else {
                    console.log("Market object appears to be a bare MarketResponse, not an ExtendedMarket");
                    console.log("This should not happen unless you are running old code for bug testing.");
                }
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => callback
                        ? callback(result, unsub)
                        : _callback(result, resolve, unsub));
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => callback ? callback(result, unsub) : _callback(result, resolve, unsub));
                }
            }));
        });
        ({
            creator: this.creator,
            creation: this.creation,
            creator_fee: this.creatorFee,
            oracle: this.oracle,
            period: this.period,
            scoring_rule: this.scoringRule,
            market_type: this.marketType,
            status: this.status,
            report: this.report,
            resolved_outcome: this.resolvedOutcome,
            mdm: this.mdm,
            outcomeAssets: this.outcomeAssets,
            end: this.end,
        } = market);
        ({
            slug: this.slug,
            question: this.question,
            description: this.description,
            categories: this.categories,
            tags: this.tags,
            confidential_id: this.confidential_id,
            img: this.img,
        } = decodedMetadata);
        this.api = api;
    }
    toJSONString() {
        const market = Object.assign({}, this);
        delete market.api;
        return JSON.stringify(market, null, 2);
    }
    toFilteredJSONString(filter) {
        const market = Object.assign({}, this);
        delete market.api;
        if (!filter) {
            return JSON.stringify(market, null, 2);
        }
        else {
            return JSON.stringify(Market.filterMarketData(market, filter), null, 2);
        }
    }
    static filterMarketData(market, filter) {
        if (!filter) {
            return market;
        }
        const alwaysInclude = ["marketId"];
        const res = {};
        filter
            .concat(alwaysInclude)
            .filter((key) => Object.keys(market).includes(key))
            .forEach((key) => (res[key] = market[key]));
        return res;
    }
    getEndTimestamp() {
        return __awaiter(this, void 0, void 0, function* () {
            if ("timestamp" in this.period) {
                return this.period.timestamp[1];
            }
            const now = (yield this.api.query.timestamp.now()).toNumber();
            const head = yield this.api.rpc.chain.getHeader();
            const blockNum = head.number.toNumber();
            const diffInMs = this.api.consts.timestamp.minimumPeriod.toNumber() *
                (this.period.block[1] - blockNum);
            return now + diffInMs;
        });
    }
    assetSpotPricesInZtg(blockHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield this.getPool();
            if (!pool) {
                return null;
            }
            return pool.assetSpotPricesInZtg(blockHash);
        });
    }
    buyCompleteSet(signer, amount, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.predictionMarkets.buyCompleteSet(this.marketId, amount);
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
                        if (method == "BoughtCompleteSet") {
                            _resolve(data[0].toString());
                        }
                        if (method == "ExtrinsicFailed") {
                            _resolve("");
                        }
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => callback
                        ? callback(result, unsub)
                        : _callback(result, resolve, unsub));
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => callback ? callback(result, unsub) : _callback(result, resolve, unsub));
                }
            }));
        });
    }
    sellCompleteSet(signer, amount, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.predictionMarkets.sellCompleteSet(this.marketId, amount);
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
                        if (method == "SoldCompleteSet") {
                            _resolve(data[0].toString());
                        }
                        if (method == "ExtrinsicFailed") {
                            _resolve("");
                        }
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => callback
                        ? callback(result, unsub)
                        : _callback(result, resolve, unsub));
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => callback ? callback(result, unsub) : _callback(result, resolve, unsub));
                }
            }));
        });
    }
    reportOutcome(signer, outcome, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.predictionMarkets.report(this.marketId, outcome);
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
                        if (method == "MarketReported") {
                            _resolve(data[0].toString());
                        }
                        if (method == "ExtrinsicFailed") {
                            _resolve("");
                        }
                        util_1.unsubOrWarns(_unsub);
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => callback
                        ? callback(result, unsub)
                        : _callback(result, resolve, unsub));
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => callback ? callback(result, unsub) : _callback(result, resolve, unsub));
                }
            }));
        });
    }
    dispute(signer, outcome, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.predictionMarkets.dispute(this.marketId, outcome);
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
                        if (method == "MarketDisputed") {
                            _resolve(data[0].toString());
                        }
                        if (method == "ExtrinsicFailed") {
                            _resolve("");
                        }
                        util_1.unsubOrWarns(_unsub);
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => callback
                        ? callback(result, unsub)
                        : _callback(result, resolve, unsub));
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => callback ? callback(result, unsub) : _callback(result, resolve, unsub));
                }
            }));
        });
    }
    redeemShares(signer, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.predictionMarkets.redeemShares(this.marketId);
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
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => callback
                        ? callback(result, unsub)
                        : _callback(result, resolve, unsub));
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => callback ? callback(result, unsub) : _callback(result, resolve, unsub));
                }
            }));
        });
    }
    approve(signer, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.predictionMarkets.approveMarket(this.marketId);
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
                        if (method == "MarketApproved") {
                            _resolve(data[0].toString());
                        }
                        if (method == "ExtrinsicFailed") {
                            _resolve("");
                        }
                        util_1.unsubOrWarns(_unsub);
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const sudoTx = yield this.api.tx.sudo.sudo(tx);
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield sudoTx.signAndSend(signer.address, { signer: signer.signer }, (result) => callback
                        ? callback(result, unsub)
                        : _callback(result, resolve, unsub));
                }
                else {
                    const unsub = yield sudoTx.signAndSend(signer, (result) => callback ? callback(result, unsub) : _callback(result, resolve, unsub));
                }
            }));
        });
    }
    reject(signer, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.predictionMarkets.rejectMarket(this.marketId);
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
                        if (method == "MarketRejected") {
                            _resolve(data[0].toString());
                        }
                        if (method == "ExtrinsicFailed") {
                            _resolve("");
                        }
                        util_1.unsubOrWarns(_unsub);
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const sudoTx = yield this.api.tx.sudo.sudo(tx);
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield sudoTx.signAndSend(signer.address, { signer: signer.signer }, (result) => callback
                        ? callback(result, unsub)
                        : _callback(result, resolve, unsub));
                }
                else {
                    const unsub = yield sudoTx.signAndSend(signer, (result) => callback ? callback(result, unsub) : _callback(result, resolve, unsub));
                }
            }));
        });
    }
    cancelAdvised(signer, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = this.api.tx.predictionMarkets.cancelPendingMarket(this.marketId);
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
                        if (method == "MarketCancelled") {
                            _resolve(data[0].toString());
                        }
                        if (method == "ExtrinsicFailed") {
                            _resolve("");
                        }
                        util_1.unsubOrWarns(_unsub);
                    });
                }
            };
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_1.isExtSigner(signer)) {
                    const unsub = yield tx.signAndSend(signer.address, { signer: signer.signer }, (result) => callback
                        ? callback(result, unsub)
                        : _callback(result, resolve, unsub));
                }
                else {
                    const unsub = yield tx.signAndSend(signer, (result) => callback ? callback(result, unsub) : _callback(result, resolve, unsub));
                }
            }));
        });
    }
}
exports.default = Market;
//# sourceMappingURL=market.js.map