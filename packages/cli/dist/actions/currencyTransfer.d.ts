declare type Options = {
    endpoint: string;
    dest: string;
    marketId?: number;
    categoryIndex?: number;
    scalarPos?: string;
    poolShare?: number;
    ztg?: boolean;
    amount: number;
    seed: string;
};
declare const currencyTransfer: (opts: Options) => Promise<void>;
export default currencyTransfer;
