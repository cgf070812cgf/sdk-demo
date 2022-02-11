declare type Options = {
    endpoint: string;
    marketId: string;
    outcome: string;
    seed: string;
};
declare const reportMarket: (opts: Options) => Promise<void>;
export default reportMarket;
