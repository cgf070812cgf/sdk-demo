declare type Options = {
    endpoint: string;
    marketId: string;
    amount: string;
    seed: string;
};
declare const sellCompleteSet: (opts: Options) => Promise<void>;
export default sellCompleteSet;
