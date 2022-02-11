import { ApiPromise } from "@polkadot/api";
declare type ErrorTableEntry = {
    errorName: string;
    documentation: string;
};
declare type ErrorTablePopulated = {
    [key: number]: {
        [key: number]: ErrorTableEntry;
    };
};
export default class ErrorTable {
    private data;
    static generate(api: ApiPromise): Promise<ErrorTablePopulated>;
    static populate(api: ApiPromise): Promise<ErrorTable>;
    constructor(errorTableData: ErrorTablePopulated);
    getEntry(palletIndex: number, errorIndex: number): ErrorTableEntry | null;
}
export {};
