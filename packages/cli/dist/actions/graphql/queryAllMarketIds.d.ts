declare type Options = {
    endpoint: string;
    graphQlEndpoint: string;
};
declare const queryAllMarketIds: (opts: Options) => Promise<void>;
export default queryAllMarketIds;
