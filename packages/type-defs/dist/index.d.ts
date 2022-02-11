export { default as orderbook } from "./orderbook";
export { default as predictionMarkets } from "./predictionMarkets";
export { default as swaps } from "./swaps";
export { default as court } from "./court";
export declare const index: {
    rpc: {};
    typesAlias: {
        tokens: {
            AccountData: {
                free: string;
                reserved: string;
                misc_frozen: string;
                fee_frozen: string;
            };
        };
    };
    types: {
        Address: string;
        Amount: string;
        AmountOf: string;
        Asset: {
            _enum: {
                CategoricalOutcome: string;
                ScalarOutcome: string;
                CombinatorialOutcome: any;
                PoolShare: string;
                Ztg: any;
            };
        };
        AuthorId: string;
        SerdeWrapper: string;
        BlockNumber: string;
        Bond: {
            owner: string;
            amount: string;
        };
        CategoryIndex: string;
        Collator2: {
            id: string;
            bond: string;
            nominators: string;
            top_nominators: string;
            bottom_nominators: string;
            total_counted: string;
            total_backing: string;
            state: string;
        };
        CollatorSnapshot: {
            bond: string;
            delegations: string;
            total: string;
        };
        CollatorStatus: {
            _enum: {
                Active: any;
                Idle: any;
                Leaving: string;
            };
        };
        Currency: string;
        CurrencyIdOf: string;
        CurrencyId: string;
        DelegatorStatus: {
            _enum: {
                Active: any;
                Leaving: string;
            };
        };
        EmaConfig: {
            ema_period: string;
            ema_period_estimate_after: string;
            smoothing: string;
        };
        EmaMarketVolume: {
            config: string;
            ema: string;
            multiplier: string;
            last_time: string;
            state: string;
            start_time: string;
            volumes_per_period: string;
        };
        ExitQ: {
            candidates: string;
            nominators_leaving: string;
            candidate_schedule: string;
            nominator_schedule: string;
        };
        FeeSigmoid: {
            config: string;
        };
        FeeSigmoidConfig: {
            m: string;
            p: string;
            n: string;
            initial_fee: string;
            min_revenue: string;
        };
        Index: string;
        InflationInfo: {
            expect: string;
            annual: string;
            round: string;
        };
        Lookup: string;
        MarketIdOf: string;
        MarketVolumeState: {
            _enum: string[];
        };
        MaxRuntimeUsize: string;
        Moment: string;
        MultiHash: {
            _enum: {
                Sha3_384: string;
            };
        };
        Nominator2: {
            delegations: string;
            revocations: string;
            total: string;
            scheduled_revocations_count: string;
            scheduled_revocations_total: string;
            status: string;
        };
        NominatorAdded: {
            _enum: {
                AddedToTop: string;
                AddedToBottom: any;
            };
        };
        OrderedSet: string;
        OwnedValuesParams: {
            participated_blocks: string;
            perpetual_incentives: string;
            total_incentives: string;
            total_shares: string;
        };
        ParachainBondConfig: {
            account: string;
            percent: string;
        };
        RangeBalance: {
            min: string;
            ideal: string;
            max: string;
        };
        RangePerbill: {
            min: string;
            ideal: string;
            max: string;
        };
        RelayChainAccountId: string;
        RewardInfo: {
            total_reward: string;
            claimed_reward: string;
        };
        Rikiddo: {
            config: string;
            fees: string;
            ma_short: string;
            ma_long: string;
        };
        RikiddoConfig: {
            initial_fee: string;
            log2_e: string;
        };
        RoundIndex: string;
        RoundInfo: {
            current: string;
            first: string;
            length: string;
        };
        ScalarPosition: {
            _enum: string[];
        };
        Timespan: {
            _enum: {
                Seconds: string;
                Minutes: string;
                Hours: string;
                Days: string;
                Weeks: string;
            };
        };
        UnixTimestamp: string;
        VestingBlockNumber: string;
    };
};
