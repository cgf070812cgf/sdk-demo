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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = exports.types = exports.models = void 0;
const graphql_request_1 = require("graphql-request");
const errorTable_1 = __importDefault(require("./errorTable"));
const models_1 = __importDefault(require("./models"));
const util_1 = require("./util");
exports.models = __importStar(require("./models"));
exports.types = __importStar(require("./types"));
exports.util = __importStar(require("./util"));
class SDK {
    constructor(api, errorTable, graphQLClient) {
        this.api = api;
        this.errorTable = errorTable;
        this.graphQLClient = graphQLClient;
        this.models = new models_1.default(this.api, errorTable, { graphQLClient });
    }
    static promiseWithTimeout(timeoutMs, promise, failureMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let timeoutHandle;
            const timeoutPromise = new Promise((_, reject) => {
                timeoutHandle = setTimeout(() => reject(new Error(failureMessage)), timeoutMs);
            });
            return Promise.race([promise, timeoutPromise]).then((result) => {
                clearTimeout(timeoutHandle);
                return result;
            });
        });
    }
    static initialize(endpoint = "wss://bsr.zeitgeist.pm", opts = { logEndpointInitTime: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const start = Date.now();
                const api = yield SDK.promiseWithTimeout(10000, util_1.initApi(endpoint), "Timed out while connecting to the zeitgeist node. Check your node address.");
                if (opts.logEndpointInitTime) {
                    console.log(`${endpoint} initialised in ${Date.now() - start} ms.`);
                }
                const { graphQlEndpoint } = opts;
                let graphQLClient;
                if (graphQlEndpoint != null) {
                    graphQLClient = new graphql_request_1.GraphQLClient(graphQlEndpoint, {});
                }
                const eTable = yield errorTable_1.default.populate(api);
                const sdk = new SDK(api, eTable, graphQLClient);
                return sdk;
            }
            catch (e) {
                throw e;
            }
        });
    }
    static mock(mockedAPI) {
        return new SDK(mockedAPI);
    }
}
exports.default = SDK;
//# sourceMappingURL=index.js.map