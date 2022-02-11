declare type Options = {
    endpoint: string;
    marketId: string;
    outcome: string;
    seed: string;
};
declare const cancelPendingMarket: (opts: Options) => Promise<void>;
export default cancelPendingMarket;
