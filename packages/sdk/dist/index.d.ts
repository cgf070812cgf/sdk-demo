import { ApiPromise } from "@polkadot/api";
import { GraphQLClient } from "graphql-request";
import ErrorTable from "./errorTable";
import Models from "./models";
export * as models from "./models";
export * as types from "./types";
export * as util from "./util";
declare type InitOptions = {
    logEndpointInitTime?: boolean;
    graphQlEndpoint?: string;
};
export default class SDK {
    api: ApiPromise;
    errorTable?: ErrorTable;
    graphQLClient?: GraphQLClient;
    models: Models;
    static promiseWithTimeout<T>(timeoutMs: number, promise: Promise<T>, failureMessage?: string): Promise<T>;
    static initialize(endpoint?: string, opts?: InitOptions): Promise<SDK>;
    static mock(mockedAPI: ApiPromise): SDK;
    constructor(api: ApiPromise, errorTable?: ErrorTable, graphQLClient?: GraphQLClient);
}
