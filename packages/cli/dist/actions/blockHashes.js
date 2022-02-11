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
const getBlockHashes = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { blocks, link, endpoint } = opts;
    const linkOf = (hash) => link
        ? `\nhttps://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbp-rpc.zeitgeist.pm#/explorer/query/${hash}\n`
        : "";
    const sdk = yield sdk_1.default.initialize(endpoint);
    const hashes = blocks.map((block) => sdk.api.rpc.chain.getBlockHash(block));
    console.log((yield Promise.all(hashes))
        .map((hash, idx) => `${blocks[idx]}: ${hash}${linkOf(hash)}`)
        .join("\n"));
});
exports.default = getBlockHashes;
//# sourceMappingURL=blockHashes.js.map