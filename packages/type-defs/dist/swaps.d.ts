declare const _default: {
    rpc: {};
    types: {
        Pool: {
            assets: string;
            base_asset: string;
            market_id: string;
            pool_status: string;
            scoring_rule: string;
            swap_fee: string;
            total_subsidy: string;
            total_weight: string;
            weights: string;
        };
        CommonPoolEventParams: {
            pool_id: string;
            who: string;
        };
        PoolAssetEvent: {
            asset: string;
            bound: string;
            cpep: string;
            transferred: string;
        };
        PoolAssetsEvent: {
            assets: string;
            bounds: string;
            cpep: string;
            transferred: string;
        };
        PoolId: string;
        PoolStatus: {
            _enum: string[];
        };
        SubsidyUntil: {
            market_id: string;
            period: string;
        };
        SwapEvent: {
            asset_amount_in: string;
            asset_amount_out: string;
            asset_bound: string;
            asset_in: string;
            asset_out: string;
            cpep: string;
            max_price: string;
        };
    };
};
export default _default;
