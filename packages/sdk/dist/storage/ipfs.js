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
const util_1 = require("@polkadot/util");
const cids_1 = __importDefault(require("cids"));
const it_all_1 = __importDefault(require("it-all"));
const uint8arrays_1 = require("uint8arrays");
const util_2 = require("../util");
class IPFS {
    constructor() {
        this.client = util_2.initIpfs();
    }
    add(content, hashAlg = "sha3-384") {
        return __awaiter(this, void 0, void 0, function* () {
            const { cid } = yield this.client.add({ content }, { hashAlg });
            return cid;
        });
    }
    read(partialCid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (partialCid.slice(2, 6) !== "1530") {
                const str = util_1.hexToString(partialCid);
                return uint8arrays_1.toString(uint8arrays_1.concat(yield it_all_1.default(this.client.cat(str))));
            }
            const cid = new cids_1.default("f0155" + partialCid.slice(2));
            const data = yield it_all_1.default(this.client.cat(cid));
            return data.map(util_1.u8aToString).reduce((p, c) => p + c);
        });
    }
}
exports.default = IPFS;
//# sourceMappingURL=ipfs.js.map