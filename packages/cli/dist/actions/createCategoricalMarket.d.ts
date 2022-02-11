declare type Options = {
    endpoint: string;
    slug: string;
    description: string;
    oracle: string;
    period: string;
    categories?: string[];
    question: string;
    advised: boolean;
    seed: string;
    timestamp: boolean;
    authorized: string;
    court: boolean;
    cpmm: boolean;
};
declare const createCategoricalMarket: (opts: Options) => Promise<void>;
export default createCategoricalMarket;
