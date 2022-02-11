import { KeyringPair } from "@polkadot/keyring/types";
import { Signer } from "@polkadot/types/types";
import { Asset, MarketType } from "@zeitgeistpm/types/dist/interfaces/index";
export declare type DecodedMarketMetadata = {
    slug: string;
    question: string;
    description: string;
    categories?: CategoryMetadata[];
    tags?: string[];
    confidential_id?: string;
    img?: string;
};
export declare type CategoryMetadata = {
    name: string;
    ticker?: string;
    img?: string;
    color?: string;
};
export declare type MarketId = number;
export declare type CategoricalMarket = {
    categories: number;
};
export declare type ScalarMarket = {
    lowerBound: number;
    higherBound: number;
};
export declare type OutcomeIndex = [number, number | string];
declare type categoricalOutcomeIndex = [number, number];
declare type scalarOutcomeIndex = [number, "Long" | "Short"];
export declare type CurrencyIdOf = CategoricalOutcome | ScalarOutcome | {
    CombinatorialOutcome: null;
} | {
    Ztg: null;
} | {
    PoolShare: number;
};
export declare type AssetId = CategoricalOutcome | ScalarOutcome | {
    ztg: null;
} | {
    poolShare: number;
};
export declare type CategoricalOutcome = {
    categoricalOutcome: categoricalOutcomeIndex;
};
export declare type ScalarOutcome = {
    scalarOutcome: scalarOutcomeIndex;
};
export declare type MarketResponse = {
    creator: string;
    creation: MarketCreation;
    creator_fee: number;
    oracle: string;
    metadata?: string;
    market_type: MarketType;
    period: MarketPeriod;
    scoring_rule: ScoringRule;
    status: string;
    report: Report | null;
    resolved_outcome: OutcomeReport | null;
    mdm: MarketDisputeMechanism;
    outcomeAssets: Asset[];
    end: BigInt;
};
export declare type ExtendedMarketResponse = {
    creator: string;
    creation: MarketCreation;
    creator_fee: number;
    oracle: string;
    period: MarketPeriod;
    scoring_rule: ScoringRule;
    metadata: string;
    market_type: MarketType;
    status: string;
    report: Report | null;
    categories: string[] | null;
    resolved_outcome: OutcomeReport | null;
    mdm: MarketDisputeMechanism;
    marketId: number;
    title: string;
    description: string;
    metadataString: string;
    outcomeAssets: Asset[];
};
export declare type FilteredMarketResponse = {
    creator?: string;
    creation?: MarketCreation;
    creator_fee?: number;
    oracle?: string;
    period?: MarketPeriod;
    metadata?: string;
    market_type?: string;
    status?: string;
    report?: Report | null;
    categories?: number | null;
    resolved_outcome?: OutcomeReport | null;
    marketId?: number;
    title?: string;
    description?: string;
    metadataString?: string;
    outcomeAssets?: Asset[];
};
export declare type Report = {
    at: number;
    by: string;
    outcome: OutcomeReport;
};
export declare type OutcomeReport = {
    categorical: number;
} | {
    scalar: number;
};
export declare type MarketPeriod = {
    block: number[];
} | {
    timestamp: number[];
};
export declare type MarketEnd = {
    block: number;
} | {
    timestamp: number;
};
export declare type MarketCreation = "Permissioned" | "Advised";
export declare type MarketTypeOf = {
    Categorical: number;
} | {
    Scalar: number[];
};
export declare type ScoringRule = "CPMM" | "RikiddoSigmoidFeeMarketEma";
export declare type MarketDisputeMechanism = {
    Authorized: number;
} | {
    Court: null;
} | {
    SimpleDisputes: null;
};
export declare type MarketDispute = {
    at: number;
    by: string;
    outcome: OutcomeReport;
};
export declare type PoolResponse = {
    assets: string[] | AssetId[];
    swap_fee: number;
    total_weight: number;
    weights: any;
};
interface PoolJoinOrExitIncomplete {
    amount: number;
}
interface PoolJoinForMaxAsset extends PoolJoinOrExitIncomplete {
    poolAmount: number;
    assetAmount?: never;
    poolMin?: never;
    assetMax: number | number[];
    assetMin?: never;
    poolMax?: never;
}
interface PoolJoinForMinPool extends PoolJoinOrExitIncomplete {
    poolAmount?: never;
    assetAmount: number;
    poolMin: number;
    assetMax?: never;
    assetMin?: never;
    poolMax?: never;
}
interface PoolExitForMinAsset extends PoolJoinOrExitIncomplete {
    poolAmount: number;
    assetAmount?: never;
    poolMin?: never;
    assetMax?: never;
    assetMin: number;
    poolMax?: never;
}
interface PoolExitForMaxPool extends PoolJoinOrExitIncomplete {
    poolAmount?: never;
    assetAmount: number;
    poolMin?: never;
    assetMax?: never;
    assetMin?: never;
    poolMax: number;
}
export declare type poolJoinBounds = PoolJoinForMaxAsset | PoolJoinForMinPool;
export declare type poolExitBounds = PoolExitForMinAsset | PoolExitForMaxPool;
export declare type PoolId = number;
export declare type AssetIdStringForTempCompatibility = string;
export declare type poolJoinOpts = {
    asset?: AssetIdStringForTempCompatibility;
    bounds: poolJoinBounds;
};
export declare type poolExitOpts = {
    asset?: AssetIdStringForTempCompatibility;
    bounds: poolExitBounds;
};
export declare type ExtSigner = {
    address: string;
    signer: Signer;
};
export declare type KeyringPairOrExtSigner = KeyringPair | ExtSigner;
export declare type MarketIdOf = MarketId;
export declare type MarketStatusText = "Proposed" | "Active" | "Reported" | "Disputed" | "Resolved";
export declare type MarketsOrdering = "asc" | "desc";
export declare type MarketsOrderBy = "newest" | "end";
export {};
