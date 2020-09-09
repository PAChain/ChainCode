require("./extend/jsextend");
import { Context, Contract } from 'fabric-contract-api';

import { entityType, party } from "./interfaces/enums"
import { IDbKey } from "./interfaces/IChanCode"
import * as config from "./config";
import { log } from "./tools/log";
import { IPaging, IResult, IStatistic } from './interfaces/IEntitys';

import { couchdb, ISelector, IHistoryData } from "./tools/db";
import { basemodel } from './basemodel';

export class baseChaincode extends basemodel {

    result: IResult;
    protected static _instance: baseChaincode;

    static getInstance<T extends baseChaincode>(newmodel: T): T {
        if (!this._instance) {
            this._instance = newmodel as T;
        }
        return this._instance as T;
    }

    constructor() {
        super();
    }

}


export {
    entityType,
    party,
    IDbKey as IEntityTypeAndDbKey,
    config,
    Context,
    log,
    IStatistic
}

