import { MarketStatusText, MarketsOrdering, MarketsOrderBy } from "@zeitgeistpm/sdk/dist/types";
declare type Options = {
    endpoint: string;
    graphQlEndpoint: string;
    statuses: MarketStatusText[];
    tags: string[];
    ordering: MarketsOrdering;
    orderBy: MarketsOrderBy;
    pageNumber: number;
    pageSize: number;
    creator?: string;
    oracle?: string;
};
declare const queryFilteredMarkets: (opts: Options) => Promise<void>;
export default queryFilteredMarkets;
