declare type Options = {
    endpoint: string;
    marketId: string;
    outcome: string;
    seed: string;
};
declare const disputeMarket: (opts: Options) => Promise<void>;
export default disputeMarket;
