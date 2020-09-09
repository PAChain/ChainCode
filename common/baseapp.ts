import { Contract, Context } from "fabric-contract-api";
import { log } from "./tools/log";
import { couchdb } from "./tools/db";
import { IResult } from "./interfaces/IEntitys";

export abstract class baseapp extends Contract {
    abstract async delkey(ctx: Context, dbkey: Array<string> | string): Promise<IResult>;
    abstract async getHistory(ctx: Context, dbkey: string): Promise<IResult>;
    abstract async putState(ctx: Context, dbkey: string, value: string): Promise<IResult>;
    async _delkey(dbkey: Array<string> | string): Promise<IResult> {
        log.log("delete");
        let dbkeylist = [];
        if (typeof dbkey == "string") {
            if (dbkey.indexOf(',') > -1) {
                dbkeylist = dbkey.split(',');
            }
            else {
                dbkeylist.push(dbkey);
            }
        }
        else {
            dbkeylist = dbkey;
        }
        for (let i = 0; i < dbkeylist.length; i++) {
            await couchdb.Instance.deleteState(dbkeylist[i]);
        }
        return {
            ret: true
        }
    }






    async _getHistory(dbkey: string): Promise<IResult> {
        log.log("getHistory");
        const data = await couchdb.Instance.getHistoryForKey(dbkey);
        return {
            ret: true,
            data: data
        }
    }





    async _putState(key: string, value: string): Promise<IResult> {
        log.log("putstate");
        const data = JSON.parse(value);
        await couchdb.Instance.putState(key, data);
        return {
            ret: true
        }
    }

    public test() {
        log.debugger("test");
    }
}
