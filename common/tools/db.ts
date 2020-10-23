import { log } from "./log";
import { Context, Contract } from 'fabric-contract-api';
import { Iterators } from 'fabric-shim-api';
import { IPaging, IResult } from "../interfaces/IEntitys";
import { entityType } from "../interfaces/enums";
import { Timestamp } from "fabric-shim";
import { isObject, types } from "util";
import { tool } from "./tool";
import { strict } from "assert";



export interface ISelector {
    [index: string]: any;
    _id?: string;
    type?: entityType | string;
    $and?: Array<ISelector>;
    $in?: Array<ISelector>;
    $or?: Array<ISelector>;

}
export interface IQuery {
    selector: ISelector;
    limit?: number;
    skip?: number;
    sort?: Array<string>;
    fields?: Array<string>;
    bookmark?: string;
}

export interface IHistoryData {
    isDelete: boolean;
    timestamp: number;
    txId: string;
    data: any;
}

export class couchdb {
    protected static _instance: couchdb;

    static get Instance() {
        if (!this._instance) {
            this._instance = new couchdb();
        }
        return this._instance;
    }

    ctx: Context;





    public async getState<T>(key: string): Promise<T> {
        log.debugger(`getState key : ${key}`);
        return await this.first<T>({
            _id: key,
        })
    }






    public async putState(key: string, value: any): Promise<void> {
        log.debugger(`putState key : ${key} value :${JSON.stringify(value)}`);
        await this.ctx.stub.putState(`${key}`, Buffer.from(JSON.stringify(value)));
    }




    public async deleteState(key: string) {
        log.debugger(`del key : ${key}`);
        await this.ctx.stub.deleteState(`${key}`);
    }




    public async filter<T>(queryJson: ISelector): Promise<Array<T>> {
        log.debugger("type filter")
        let _queryJson: IQuery = {
            selector: queryJson
        };
        return await this.getQueryResult<T>(_queryJson);
    }




    public async first<T>(queryJson: ISelector): Promise<T> {
        log.debugger("type first")
        let _queryJson: IQuery = {
            selector: queryJson
        };
        const list = await this.getQueryResult<T>(_queryJson);
        if (list.length > 0) {
            return list[0];
        }
        else {
            log.debugger("return undefined");
            return undefined;
        }
    }







    public async exist<T>(queryJson: ISelector): Promise<boolean> {
        log.debugger("type exist")
        const t = await this.first<T>(queryJson);
        return t != undefined;
    }
    public async queryResultWithPagination<T>(queryJson: any, paging: IPaging);
    public async queryResultWithPagination<T>(queryJson: any, pageSize: number, bookmark: string);






    public async queryResultWithPagination<T>(queryJson: ISelector, pageSize: number | IPaging, bookmark?: string) {
        log.debugger("type QueryResultWithPagination");
        let paging: IPaging = { pageCount: 1, bookMark: "" };
        if (typeof pageSize == "number") {
            paging.pageCount = pageSize;
            paging.bookMark = bookmark;
        }
        else {
            paging = pageSize;
        }

        let _queryJson = {
            selector: queryJson
        };
        return await this.getQueryResultWithPagination(_queryJson, paging);
    }





    public async getHistoryForKey<T>(key: string): Promise<IHistoryData[]> {
        log.debugger(`query history for key ${key}`);
        const respons = await this.ctx.stub.getHistoryForKey(key);
        return await this.ConvertHistoryResultToModel(respons);
    }






    public async invokeChaincode(chaincode: string, action: string, ...params: string[]): Promise<IResult> {
        if (params == undefined) {
            params = [];
        }
        const channelID = this.ctx.stub.getChannelID();
        log.debugger(`invokeChaincode  channel:${channelID}  chaincode:${chaincode}  action:${action} params:${params}`);
        params.unshift(action);
        const respone = await this.ctx.stub.invokeChaincode(chaincode, params, channelID);
        const data = tool.ConvertChaincodeResponseToResult(respone);
        return data;
    }











    private async getQueryResultWithPagination<T>(queryJosn: IQuery, paging: IPaging)
        : Promise<{
            data: Array<T>,
            page: IPaging
        }> {
        const queryJosnString = JSON.stringify(queryJosn);

        log.debugger(`getQueryResultWithPagination query Where: ${queryJosnString} paging: ${JSON.stringify(paging)}`);

        const { iterator, metadata } = await this.ctx.stub.getQueryResultWithPagination(queryJosnString, paging.pageCount, paging.bookMark);
        const list: Array<T> = await this.ConvertResultToModel<T>(iterator);
        return {
            page: {
                pageCount: metadata.fetchedRecordsCount,
                bookMark: metadata.bookmark,
            },

            data: list
        };
    }




    private async getQueryResult<T>(queryJosn: IQuery): Promise<Array<T>> {
        const queryJosnString = JSON.stringify(queryJosn);
        log.debugger(`getQueryResult query Where ${queryJosnString}`);

        const respons = await this.ctx.stub.getQueryResult(queryJosnString);


        return await this.ConvertResultToModel<T>(respons);
    }






    private async ConvertResultToModel<T>(respons: Iterators.StateQueryIterator): Promise<Array<T>> {
        const list: Array<T> = [];
        log.debugger("Convert respons");
        let nextRead = true;
        while (nextRead) {
            log.debugger("in while");
            let itemData = await respons.next();
            log.debugger("itemdata");
            if (itemData.value) {
                const value = Buffer.from(itemData.value.value).toString("utf8").toString();
                log.debugger(`value: ${value}`);
                if (value && value.length > 0 && typeof value == "string") {
                    const item: T = JSON.parse(value);
                    list.push(item);
                }
            }
            if (itemData.done) {
                nextRead = false;
            }

        }
        await respons.close();
        log.debugger(`data lenth ${list.length}`);
        return list;
    }





    private async ConvertHistoryResultToModel<T>(respons: Iterators.HistoryQueryIterator) {
        const list: Array<IHistoryData> = [];
        log.debugger("Convert History respons");
        let nextRead = true;
        while (nextRead) {
            log.debugger("in while");
            let itemData = await respons.next();
            log.debugger("itemdata");
            if (itemData.value) {
                const value = Buffer.from(itemData.value.value).toString("utf8").toString();
                log.debugger(`value: ${value}`);
                if (value && value.length > 0 && typeof value == "string") {
                    const item: T = JSON.parse(value);
                    let seconds = itemData.value.timestamp.seconds;
                    if (isObject(seconds)) {
                        seconds = seconds["low"];
                    }
                    list.push({
                        isDelete: itemData.value.isDelete,
                        timestamp: seconds,
                        txId: itemData.value.txId,
                        data: item
                    });
                }
            }

            if (itemData.done) {

                nextRead = false;
            }

        }

        await respons.close();

        log.debugger(`data lenth ${list.length}`);
        return list;
    }
}
