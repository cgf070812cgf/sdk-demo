declare type Options = {
    endpoint: string;
    title: string;
    description: string;
    oracle: string;
    period: string;
    bounds?: number[];
    advised: boolean;
    seed: string;
    timestamp: boolean;
    authorized: string;
    court: boolean;
    cpmm: boolean;
};
declare const createScalarMarket: (opts: Options) => Promise<void>;
export default createScalarMarket;
