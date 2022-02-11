declare type Options = {
    endpoint: string;
    marketId: string;
    seed?: string;
    address?: string;
};
declare const viewMarket: (opts: Options) => Promise<void>;
export default viewMarket;
