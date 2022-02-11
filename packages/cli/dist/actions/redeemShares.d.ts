declare type Options = {
    endpoint: string;
    marketId: string;
    seed: string;
};
declare const redeemShares: (opts: Options) => Promise<void>;
export default redeemShares;
