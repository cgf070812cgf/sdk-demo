declare type Options = {
    endpoint: string;
    marketId: string;
    outcome: string;
    seed: string;
};
declare const approveMarket: (opts: Options) => Promise<void>;
export default approveMarket;
