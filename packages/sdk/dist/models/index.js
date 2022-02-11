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
exports.Swap = exports.Market = void 0;
const graphql_request_1 = require("graphql-request");
const util_1 = require("@polkadot/util");
const util_2 = require("../util");
const util_3 = require("../util");
const market_1 = require("./graphql/market");
const market_2 = __importDefault(require("./market"));
exports.Market = market_2.default;
const swaps_1 = __importDefault(require("./swaps"));
exports.Swap = swaps_1.default;
const ipfs_1 = __importDefault(require("../storage/ipfs"));
class Models {
    constructor(api, errorTable, opts = {}) {
        this.currencyTransfer = (signer, dest, currencyId, amount, callbackOrPaymentInfo = false) => __awaiter(this, void 0, void 0, function* () {
            const _callback = (result, _resolve, _unsub) => {
                const { events, status } = result;
                if (status.isInBlock) {
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                        if (method == "ExtrinsicSuccess") {
                            util_2.unsubOrWarns(_unsub);
                            _resolve(true);
                        }
                        if (method == "ExtrinsicFailed") {
                            util_2.unsubOrWarns(_unsub);
                            _resolve(false);
                        }
                    });
                }
            };
            const tx = this.api.tx.currency.transfer(dest, currencyId, amount);
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_2.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (util_3.isExtSigner(signer)) {
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
        this.api = api;
        this.errorTable = errorTable;
        this.MAX_RPC_REQUESTS = opts.MAX_RPC_REQUESTS || 33000;
        this.graphQLClient = opts.graphQLClient;
    }
    getGraphQLClient() {
        return this.graphQLClient;
    }
    getAllMarketIds() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.graphQLClient != null) {
                const query = graphql_request_1.gql `
        {
          markets {
            marketId
          }
        }
      `;
                const data = yield this.graphQLClient.request(query);
                return data.markets.map((i) => i.marketId);
            }
            const keys = this.api["config"] !== "mock"
                ? yield this.api.query.marketCommons.markets.keys()
                : yield this.api.query.marketCommons.marketIds.keys();
            return keys.map((key) => {
                const idStr = "0x" + util_3.changeEndianness(key.toString().slice(-32));
                const id = util_1.hexToNumber(idStr);
                return id;
            });
        });
    }
    getAllMarkets() {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = yield this.getAllMarketIds();
            return Promise.all(ids.map((id) => this.fetchMarketData(id)));
        });
    }
    createCpmmMarketAndDeployAssets(signer, oracle, period, creationType = "Advised", marketType, mdm, amounts, baseAssetAmount, weights, keep, metadata, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const ipfs = new ipfs_1.default();
            const cid = yield ipfs.add(JSON.stringify(Object.assign({}, metadata)));
            const multihash = { Sha3_384: cid.multihash };
            const tx = this.api.tx.predictionMarkets.createCpmmMarketAndDeployAssets(oracle, period, multihash, creationType, marketType, mdm, baseAssetAmount, amounts, weights, keep);
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_2.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const _callback = (result, _resolve, _unsub) => {
                    const { events, status } = result;
                    if (status.isInBlock) {
                        console.log(`Transaction included at blockHash ${status.asInBlock}`);
                        events.forEach(({ phase, event: { data, method, section } }) => {
                            if (method == "MarketCreated") {
                                util_2.unsubOrWarns(_unsub);
                                console.log(`Market created with market ID: ${data[0].toString()}`);
                            }
                            if (method == "PoolCreate") {
                                util_2.unsubOrWarns(_unsub);
                                console.log(`Canonical pool for market deployed - pool ID: ${data[0]["pool_id"]}`);
                                _resolve(data[0]["pool_id"]);
                            }
                            if (method == "ExtrinsicFailed") {
                                util_2.unsubOrWarns(_unsub);
                                const { index, error } = data.toJSON()[0].module;
                                const { errorName, documentation } = this.errorTable.getEntry(index, error);
                                console.log(`${errorName}: ${documentation}`);
                                _resolve("");
                            }
                        });
                    }
                };
                if (util_3.isExtSigner(signer)) {
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
    createCategoricalMarket(signer, oracle, period, creationType = "Advised", mdm, scoringRule = "CPMM", metadata, callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const ipfs = new ipfs_1.default();
            const categories = metadata.categories;
            const cid = yield ipfs.add(JSON.stringify(Object.assign({}, metadata)));
            const multihash = { Sha3_384: cid.multihash };
            const tx = this.api.tx.predictionMarkets.createCategoricalMarket(oracle, period, multihash, creationType, categories.length, mdm, scoringRule);
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_2.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const _callback = (result, _resolve, _unsub) => {
                    const { events, status } = result;
                    if (status.isInBlock) {
                        console.log(`Transaction included at blockHash ${status.asInBlock}`);
                        events.forEach(({ phase, event: { data, method, section } }) => {
                            console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                            if (method == "MarketCreated") {
                                _resolve(data[0].toString());
                            }
                            else if (method == "ExtrinsicFailed") {
                                const { index, error } = data.toJSON()[0].module;
                                const { errorName, documentation } = this.errorTable.getEntry(index, error);
                                console.log(`${errorName}: ${documentation}`);
                                _resolve("");
                            }
                            util_2.unsubOrWarns(_unsub);
                        });
                    }
                };
                if (util_3.isExtSigner(signer)) {
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
    createScalarMarket(signer, title, description, oracle, period, creationType = "Advised", bounds = [0, 100], mdm, scoringRule = "CPMM", callbackOrPaymentInfo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const ipfs = new ipfs_1.default();
            const cid = yield ipfs.add(JSON.stringify({
                title,
                description,
                bounds,
            }));
            const multihash = { Sha3_384: cid.multihash };
            const tx = this.api.tx.predictionMarkets.createScalarMarket(oracle, period, multihash, creationType, bounds, mdm, scoringRule);
            if (typeof callbackOrPaymentInfo === "boolean" && callbackOrPaymentInfo) {
                return util_2.estimatedFee(tx, signer.address);
            }
            const callback = typeof callbackOrPaymentInfo !== "boolean"
                ? callbackOrPaymentInfo
                : undefined;
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const _callback = (result, _resolve, _unsub) => {
                    const { events, status } = result;
                    if (status.isInBlock) {
                        console.log(`Transaction included at blockHash ${status.asInBlock}`);
                        events.forEach(({ phase, event: { data, method, section } }) => {
                            console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                            if (method == "MarketCreated") {
                                _resolve(data[0].toString());
                            }
                            else if (method == "ExtrinsicFailed") {
                                const { index, error } = data.toJSON()[0].module;
                                const { errorName, documentation } = this.errorTable.getEntry(index, error);
                                console.log(`${errorName}: ${documentation}`);
                                _resolve("");
                            }
                            util_2.unsubOrWarns(_unsub);
                        });
                    }
                };
                if (util_3.isExtSigner(signer)) {
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
    createAssetsForMarket(marketId, marketType) {
        return marketType.isCategorical
            ? [...Array(marketType.asCategorical.toNumber()).keys()].map((catIdx) => {
                return this.api.createType("Asset", {
                    categoricalOutcome: [marketId, catIdx],
                });
            })
            : ["Long", "Short"].map((pos) => {
                const position = this.api.createType("ScalarPosition", pos);
                return this.api.createType("Asset", {
                    scalarOutcome: [marketId, position.toString()],
                });
            });
    }
    constructMarketFromQueryData(data) {
        var _a;
        const { marketType, period, mdm, marketId } = data;
        for (const type in marketType) {
            const val = marketType[type];
            if (val == null) {
                continue;
            }
            if (typeof val === "string") {
                marketType[type] = Number(val);
            }
        }
        const marketPeriod = {};
        for (const p in period) {
            const val = period[p];
            if (val == null) {
                continue;
            }
            if (typeof val === "string") {
                marketPeriod[p] = JSON.parse(val);
            }
        }
        for (const dispMech in mdm) {
            const val = mdm[dispMech];
            if (val == null) {
                delete mdm[dispMech];
            }
            else {
                mdm[dispMech] = val;
            }
        }
        const metadata = {
            question: data.question,
            slug: data.slug,
            categories: data.categories,
            description: data.description,
            tags: (_a = data.tags) !== null && _a !== void 0 ? _a : [],
            img: data.img,
        };
        const marketTypeAsType = this.api.createType("MarketType", marketType);
        const outcomeAssets = this.createAssetsForMarket(marketId, this.api.createType("MarketType", marketType));
        const marketReport = data.report != null ? this.api.createType("Report", data.report) : null;
        const basicMarketData = {
            end: data.end,
            creation: data.creation,
            creator: data.creator,
            creator_fee: 0,
            scoring_rule: data.scoringRule,
            oracle: data.oracle,
            status: data.status,
            outcomeAssets,
            market_type: marketTypeAsType,
            mdm: this.api.createType("MarketDisputeMechanism", mdm).toJSON(),
            report: marketReport,
            period: this.api.createType("MarketPeriod", marketPeriod).toJSON(),
            resolved_outcome: data.resolvedOutcome,
        };
        const market = new market_2.default(marketId, basicMarketData, metadata, this.api);
        return market;
    }
    queryMarket(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = graphql_request_1.gql `
      query marketData($marketId: Int!) {
        markets(where: { marketId_eq: $marketId }) {
          ...MarketDetails
        }
      }
      ${market_1.FRAGMENT_MARKET_DETAILS}
    `;
            const data = yield this.graphQLClient.request(query, { marketId });
            const queriedMarketData = data.markets[0];
            return this.constructMarketFromQueryData(queriedMarketData);
        });
    }
    filterMarkets({ statuses, tags, creator, oracle, }, paginationOptions = { ordering: "desc", orderBy: "newest", pageSize: 10, pageNumber: 1 }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.graphQLClient == null) {
                throw Error("(getMarketsWithStatuses) cannot use without graphQLClient.");
            }
            const query = graphql_request_1.gql `
      query marketPage(
        $statuses: [String!]
        $tags: [String!]
        $pageSize: Int!
        $offset: Int!
        $orderByQuery: [MarketOrderByInput!]
        $creator: String
        $oracle: String
      ) {
        markets(
          where: {
            status_in: $statuses
            tags_containsAll: $tags
            creator_eq: $creator
            oracle_eq: $oracle
          }
          limit: $pageSize
          offset: $offset
          orderBy: $orderByQuery
        ) {
          ...MarketDetails
        }
      }
      ${market_1.FRAGMENT_MARKET_DETAILS}
    `;
            const { pageSize, pageNumber, ordering, orderBy } = paginationOptions;
            const offset = (pageNumber - 1) * pageSize;
            let orderingStr = ordering.toUpperCase();
            if (orderBy === "newest") {
                orderingStr = ordering === "asc" ? "DESC" : "ASC";
            }
            const orderByQuery = orderBy === "newest" ? `marketId_${orderingStr}` : `end_${orderingStr}`;
            const data = yield this.graphQLClient.request(query, {
                statuses,
                tags,
                pageSize,
                offset,
                orderByQuery,
                creator,
                oracle,
            });
            const { markets: queriedMarkets } = data;
            return queriedMarkets.map((m) => this.constructMarketFromQueryData(m));
        });
    }
    fetchMarketData(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.graphQLClient != null) {
                return this.queryMarket(marketId);
            }
            const marketRaw = yield this.api.query.marketCommons.markets(marketId);
            const marketJson = marketRaw.toJSON();
            if (!marketJson) {
                throw new Error(`Market with market id ${marketId} does not exist.`);
            }
            const basicMarketData = Object.assign({}, marketJson);
            const { metadata: metadataString } = basicMarketData;
            let metadata = {
                slug: "No metadata",
            };
            try {
                if (metadataString) {
                    const ipfs = new ipfs_1.default();
                    const raw = yield ipfs.read(metadataString);
                    const parsed = JSON.parse(raw);
                    metadata = parsed;
                }
            }
            catch (err) {
                console.error(err);
            }
            const market = marketRaw.unwrap();
            basicMarketData.outcomeAssets = this.createAssetsForMarket(marketId, market.market_type);
            basicMarketData.report = market.report.isSome ? market.report.value : null;
            basicMarketData.resolved_outcome = market.resolved_outcome.isSome
                ? market.resolved_outcome.value.toNumber()
                : null;
            return new market_2.default(marketId, basicMarketData, metadata, this.api);
        });
    }
    getMarketCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = (yield this.api.query.marketCommons.marketCounter()).toJSON();
            if (typeof count !== "number") {
                throw new Error("Expected a number to return from api.query.marketCommons.marketCounter (even if variable remains unset)");
            }
            return count;
        });
    }
    fetchDisputes(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = (yield this.api.query.predictionMarkets.disputes(marketId)).toJSON();
            if (!Array.isArray(res)) {
                throw new Error(`fetchDisputes expected response an array but got ${typeof res}.`);
            }
            if (!res.length) {
                const market = (yield this.api.query.marketCommons.markets(marketId)).toJSON();
                if (!market) {
                    throw new Error(`Market with market id ${marketId} does not exist.`);
                }
                if (!market.report) {
                    throw new Error(`Market with market id ${marketId} has not been reported and therefore has not been disputed.`);
                }
            }
            return res;
        });
    }
    fetchPoolData(poolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = (yield this.api.query.swaps.pools(poolId));
            if (pool.isSome) {
                return new swaps_1.default(poolId, pool.unwrap(), this.api);
            }
            else {
                return null;
            }
        });
    }
    assetSpotPricesInZtg(blockHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const markets = yield this.getAllMarkets();
            let priceData = {};
            for (const market of markets) {
                const assetPrices = yield market.assetSpotPricesInZtg(blockHash);
                priceData = Object.assign(Object.assign({}, priceData), assetPrices);
            }
            return priceData;
        });
    }
    getBlockData(blockHash) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(blockHash.toString());
            const data = yield this.api.rpc.chain.getBlock(blockHash);
            console.log(data);
            return data;
        });
    }
    indexTransferRecipients(startBlock = 0, endBlock, arbitrarySet, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = {};
            const head = this.api.rpc.chain.getHeader();
            console.log([...Array(endBlock)]);
            let outstandingRequests = 0;
            let extrinsics = [];
            const range = [
                ...Array(Number(endBlock) || (yield (yield head).number.toNumber())).keys(),
            ].slice(startBlock || 0);
            if (arbitrarySet) {
                console.log(arbitrarySet);
            }
            else {
                console.log(`${startBlock} to ${endBlock}`);
                console.log(range);
            }
            const chunkSize = (arbitrarySet || range).length;
            console.log(`...makes ${chunkSize} blocks`);
            let timer = Date.now();
            if (chunkSize > this.MAX_RPC_REQUESTS) {
                const chunks = [];
                const whole = arbitrarySet ? [...arbitrarySet] : range;
                console.log(`Blocks exceed MAX_RPC_REQUESTS (${this.MAX_RPC_REQUESTS}). Chunking at: ${timer}`);
                while (whole.length) {
                    chunks.push(whole.splice(0, this.MAX_RPC_REQUESTS));
                }
                const chunkedExtrinsics = chunks.map((_) => new Promise(() => { }));
                const outerTrigger = chunks.reduce((trigger, chunk, idx) => __awaiter(this, void 0, void 0, function* () {
                    yield trigger;
                    console.log(`Chunk ${idx}: ${idx * this.MAX_RPC_REQUESTS}-${(idx + 1) * this.MAX_RPC_REQUESTS - 1}:`);
                    chunkedExtrinsics[idx] = yield this.indexTransferRecipients(0, 0, chunk, filter);
                    console.log(`Chunk ${idx}: extrinsics fetched at: ${Date.now()}`);
                    return yield chunkedExtrinsics[idx];
                }), chunks[0]);
                const arrayFlat1 = (arr) => arr.reduce((a, b) => a.concat(b), []);
                yield outerTrigger;
                console.log(`All extrinsics fetched at ${Date.now}`);
                const result = Promise.all(arrayFlat1(chunkedExtrinsics));
                return yield result;
            }
            console.log("beginning retrieval at:", Date.now());
            try {
                const blockHashes = yield Promise.all((arbitrarySet || range).map((block, idx) => {
                    outstandingRequests++;
                    if (Date.now() - timer > 30000) {
                        console.log(`Progress: ${idx}/${chunkSize}`);
                        timer = Date.now();
                    }
                    return this.api.rpc.chain.getBlockHash(block);
                }));
                outstandingRequests = 0;
                timer = Date.now();
                const blocks = Promise.all(blockHashes.map((hash, idx) => {
                    outstandingRequests++;
                    if (Date.now() - timer > 30000) {
                        console.log(`Progress: ${idx}`);
                        timer = Date.now();
                    }
                    try {
                        return this.api.rpc.chain
                            .getBlock(hash)
                            .then((block) => block.block);
                    }
                    catch (e) {
                        console.log("Oops at:", Date.now());
                        console.log(hash);
                        console.log("Requests outstanding:", outstandingRequests);
                    }
                }));
                console.log((arbitrarySet || range)[0], "-", (arbitrarySet || range)[chunkSize - 1], ",");
                console.log(" chunk sent at:", Date.now());
                yield blocks;
                outstandingRequests = 0;
                console.log("retrieved but not logged at:", Date.now());
                extrinsics = (yield blocks).map((block) => block.extrinsics);
            }
            catch (e) {
                console.log("Oops at:", Date.now());
                console.log("Requests outstanding:", outstandingRequests);
                throw e;
            }
            (arbitrarySet || range).forEach((blockNum, idx) => {
                extrinsics[idx].blockNum = blockNum;
            });
            console.log("Requests outstanding:", outstandingRequests);
            return extrinsics;
        });
    }
}
exports.default = Models;
//# sourceMappingURL=index.js.map