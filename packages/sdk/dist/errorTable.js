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
class ErrorTable {
    constructor(errorTableData) {
        this.data = errorTableData;
    }
    static generate(api) {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = yield api.rpc.state.getMetadata();
            const inner = metadata.get("metadata");
            const errorTable = {};
            for (const module of inner.toJSON().v13.modules) {
                const { errors, index } = module;
                errorTable[index] = {};
                if (!errors.length) {
                    continue;
                }
                errors.forEach((error, errorIndex) => {
                    const { name: errorName, documentation } = error;
                    errorTable[index][errorIndex] = { errorName, documentation };
                });
            }
            return errorTable;
        });
    }
    static populate(api) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorTableData = yield ErrorTable.generate(api);
            return new ErrorTable(errorTableData);
        });
    }
    getEntry(palletIndex, errorIndex) {
        if (!this.data[palletIndex]) {
            return null;
        }
        if (!this.data[palletIndex][errorIndex]) {
            return null;
        }
        return this.data[palletIndex][errorIndex];
    }
}
exports.default = ErrorTable;
//# sourceMappingURL=errorTable.js.map