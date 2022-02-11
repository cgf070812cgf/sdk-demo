declare type Options = {
    endpoint: string;
    marketId: string;
    outcome: string;
    seed: string;
};
declare const rejectMarket: (opts: Options) => Promise<void>;
export default rejectMarket;
