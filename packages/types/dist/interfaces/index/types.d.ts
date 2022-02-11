import type { Enum, Option, Struct, U8aFixed, Vec, i128, u128, u16, u32, u64 } from '@polkadot/types';
import type { AccountId, AccountId32, Balance, MultiAddress, Perbill, Percent } from '@polkadot/types/interfaces/runtime';
import type { ITuple } from '@polkadot/types/types';
import type { MarketId } from '@zeitgeistpm/types/dist/interfaces/predictionMarkets';
export interface Address extends MultiAddress {
}
export interface Amount extends i128 {
}
export interface AmountOf extends i128 {
}
export interface Asset extends Enum {
    readonly isCategoricalOutcome: boolean;
    readonly asCategoricalOutcome: ITuple<[MarketId, CategoryIndex]>;
    readonly isScalarOutcome: boolean;
    readonly asScalarOutcome: ITuple<[MarketId, ScalarPosition]>;
    readonly isCombinatorialOutcome: boolean;
    readonly isPoolShare: boolean;
    readonly asPoolShare: u128;
    readonly isZtg: boolean;
    readonly type: 'CategoricalOutcome' | 'ScalarOutcome' | 'CombinatorialOutcome' | 'PoolShare' | 'Ztg';
}
export interface AuthorId extends AccountId {
}
export interface BlockNumber extends u64 {
}
export interface Bond extends Struct {
    readonly owner: AccountId;
    readonly amount: Balance;
}
export interface CategoryIndex extends u16 {
}
export interface Collator2 extends Struct {
    readonly id: AccountId;
    readonly bond: Balance;
    readonly nominators: Vec<AccountId>;
    readonly top_nominators: Vec<Bond>;
    readonly bottom_nominators: Vec<Bond>;
    readonly total_counted: Balance;
    readonly total_backing: Balance;
    readonly state: CollatorStatus;
}
export interface CollatorSnapshot extends Struct {
    readonly bond: Balance;
    readonly delegations: Vec<Bond>;
    readonly total: Balance;
}
export interface CollatorStatus extends Enum {
    readonly isActive: boolean;
    readonly isIdle: boolean;
    readonly isLeaving: boolean;
    readonly asLeaving: RoundIndex;
    readonly type: 'Active' | 'Idle' | 'Leaving';
}
export interface Currency extends Asset {
}
export interface CurrencyId extends Asset {
}
export interface CurrencyIdOf extends Asset {
}
export interface DelegatorStatus extends Enum {
    readonly isActive: boolean;
    readonly isLeaving: boolean;
    readonly asLeaving: RoundIndex;
    readonly type: 'Active' | 'Leaving';
}
export interface EmaConfig extends Struct {
    readonly ema_period: Timespan;
    readonly ema_period_estimate_after: Option<Timespan>;
    readonly smoothing: u128;
}
export interface EmaMarketVolume extends Struct {
    readonly config: EmaConfig;
    readonly ema: u128;
    readonly multiplier: u128;
    readonly last_time: UnixTimestamp;
    readonly state: MarketVolumeState;
    readonly start_time: UnixTimestamp;
    readonly volumes_per_period: u128;
}
export interface ExitQ extends Struct {
    readonly candidates: Vec<AccountId>;
    readonly nominators_leaving: Vec<AccountId>;
    readonly candidate_schedule: Vec<ITuple<[AccountId, RoundIndex]>>;
    readonly nominator_schedule: Vec<ITuple<[AccountId, Option<AccountId>, RoundIndex]>>;
}
export interface FeeSigmoid extends Struct {
    readonly config: FeeSigmoidConfig;
}
export interface FeeSigmoidConfig extends Struct {
    readonly m: i128;
    readonly p: i128;
    readonly n: i128;
    readonly initial_fee: i128;
    readonly min_revenue: i128;
}
export interface Index extends u64 {
}
export interface InflationInfo extends Struct {
    readonly expect: RangeBalance;
    readonly annual: RangePerbill;
    readonly round: RangePerbill;
}
export interface Lookup extends MultiAddress {
}
export interface MarketIdOf extends u128 {
}
export interface MarketVolumeState extends Enum {
    readonly isUninitialized: boolean;
    readonly isDataCollectionStarted: boolean;
    readonly isDataCollected: boolean;
    readonly type: 'Uninitialized' | 'DataCollectionStarted' | 'DataCollected';
}
export interface MaxRuntimeUsize extends u64 {
}
export interface Moment extends u64 {
}
export interface MultiHash extends Enum {
    readonly isSha3384: boolean;
    readonly asSha3384: U8aFixed;
    readonly type: 'Sha3384';
}
export interface Nominator2 extends Struct {
    readonly delegations: Vec<Bond>;
    readonly revocations: Vec<AccountId>;
    readonly total: Balance;
    readonly scheduled_revocations_count: u32;
    readonly scheduled_revocations_total: Balance;
    readonly status: DelegatorStatus;
}
export interface NominatorAdded extends Enum {
    readonly isAddedToTop: boolean;
    readonly asAddedToTop: Balance;
    readonly isAddedToBottom: boolean;
    readonly type: 'AddedToTop' | 'AddedToBottom';
}
export interface OrderedSet extends Vec<Bond> {
}
export interface OwnedValuesParams extends Struct {
    readonly participated_blocks: BlockNumber;
    readonly perpetual_incentives: Balance;
    readonly total_incentives: Balance;
    readonly total_shares: Balance;
}
export interface ParachainBondConfig extends Struct {
    readonly account: AccountId;
    readonly percent: Percent;
}
export interface RangeBalance extends Struct {
    readonly min: Balance;
    readonly ideal: Balance;
    readonly max: Balance;
}
export interface RangePerbill extends Struct {
    readonly min: Perbill;
    readonly ideal: Perbill;
    readonly max: Perbill;
}
export interface RelayChainAccountId extends AccountId32 {
}
export interface RewardInfo extends Struct {
    readonly total_reward: Balance;
    readonly claimed_reward: Balance;
}
export interface Rikiddo extends Struct {
    readonly config: RikiddoConfig;
    readonly fees: FeeSigmoid;
    readonly ma_short: EmaMarketVolume;
    readonly ma_long: EmaMarketVolume;
}
export interface RikiddoConfig extends Struct {
    readonly initial_fee: i128;
    readonly log2_e: i128;
}
export interface RoundIndex extends u32 {
}
export interface RoundInfo extends Struct {
    readonly current: RoundIndex;
    readonly first: BlockNumber;
    readonly length: u32;
}
export interface ScalarPosition extends Enum {
    readonly isLong: boolean;
    readonly isShort: boolean;
    readonly type: 'Long' | 'Short';
}
export interface SerdeWrapper extends Balance {
}
export interface Timespan extends Enum {
    readonly isSeconds: boolean;
    readonly asSeconds: u32;
    readonly isMinutes: boolean;
    readonly asMinutes: u32;
    readonly isHours: boolean;
    readonly asHours: u32;
    readonly isDays: boolean;
    readonly asDays: u16;
    readonly isWeeks: boolean;
    readonly asWeeks: u16;
    readonly type: 'Seconds' | 'Minutes' | 'Hours' | 'Days' | 'Weeks';
}
export interface UnixTimestamp extends u64 {
}
export interface VestingBlockNumber extends u32 {
}
export declare type PHANTOM_INDEX = 'index';
