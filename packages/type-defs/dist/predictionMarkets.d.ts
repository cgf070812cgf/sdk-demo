declare const _default: {
    rpc: {
        predictionMarkets: {
            marketOutcomeShareId: {
                description: string;
                params: ({
                    name: string;
                    type: string;
                    isOptional?: undefined;
                } | {
                    name: string;
                    type: string;
                    isOptional: boolean;
                })[];
                type: string;
            };
        };
    };
    types: {
        MarketCreation: {
            _enum: string[];
        };
        MarketPeriod: {
            _enum: {
                Block: string;
                Timestamp: string;
            };
        };
        MarketId: string;
        MarketType: {
            _enum: {
                Categorical: string;
                Scalar: string;
            };
        };
        MarketStatus: {
            _enum: string[];
        };
        Market: {
            creator: string;
            creation: string;
            creator_fee: string;
            oracle: string;
            metadata: string;
            market_type: string;
            period: string;
            scoring_rule: string;
            status: string;
            report: string;
            resolved_outcome: string;
            mdm: string;
        };
        ScoringRule: {
            _enum: string[];
        };
        OutcomeReport: {
            _enum: {
                Categorical: string;
                Scalar: string;
            };
        };
        Report: {
            at: string;
            by: string;
            outcome: string;
        };
        MarketDispute: {
            at: string;
            by: string;
            outcome: string;
        };
        MarketDisputeMechanism: {
            _enum: {
                Authorized: string;
                Court: any;
                SimpleDisputes: any;
            };
        };
    };
};
export default _default;
