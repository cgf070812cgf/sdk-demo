declare type Options = {
    endpoint: string;
    graphQlEndpoint: string;
    marketId: number;
};
declare const queryMarket: (opts: Options) => Promise<void>;
export default queryMarket;
