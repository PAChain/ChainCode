import { Contract } from "fabric-contract-api";
import { couchdb, ISelector, IHistoryData } from "./tools/db";
import { IPaging } from "./interfaces/IEntitys";

export class basemodel extends Contract {

    private static __instance: basemodel = new basemodel();





    protected static async putState(key: string, value: any): Promise<void> {
        return await this.__instance.putState(key, value);
    }




    static async filter<T>(queryJson: ISelector): Promise<Array<T>> {
        return await this.__instance.filter(queryJson);
    }







    static async first<T>(queryJson: ISelector): Promise<T> {
        return await this.__instance.first(queryJson);
    }





    public static async getHistoryForKey(dbkey: string): Promise<IHistoryData[]> {
        return await this.__instance.getHistoryForKey(dbkey);
    }






    protected static async exist(queryJson: ISelector): Promise<boolean> {
        return await this.__instance.exist(queryJson);
    }
    protected static async queryResultWithPagination<T>(queryJson: ISelector, paging: IPaging)
    protected static async queryResultWithPagination<T>(queryJson: ISelector, pageSize: number, bookmark: string);






    protected static async queryResultWithPagination<T>(queryJson: ISelector, pageSize: number | IPaging, bookmark?: string) {
        let paging: IPaging = { pageCount: 1, bookMark: "" };
        if (typeof pageSize == "number") {
            paging.pageCount = pageSize;
            paging.bookMark = bookmark;
            return await this.__instance.queryResultWithPagination(queryJson, paging.pageCount, bookmark);
        }
        else {
            paging = pageSize;
            return await this.__instance.queryResultWithPagination(queryJson, paging);
        }
    }













    protected async putState(key: string, value: any): Promise<void> {
        return await couchdb.Instance.putState(key, value);
    }





    async filter<T>(queryJson: ISelector): Promise<Array<T>> {
        return await couchdb.Instance.filter<T>(queryJson);
    }




    async first<T>(queryJson: ISelector): Promise<T> {
        return await couchdb.Instance.first<T>(queryJson);
    }





    public async getHistoryForKey(dbkey: string): Promise<IHistoryData[]> {
        return await couchdb.Instance.getHistoryForKey(dbkey);
    }






    protected async exist(queryJson: ISelector): Promise<boolean> {
        return await couchdb.Instance.exist(queryJson);
    }
    protected async queryResultWithPagination<T>(queryJson: ISelector, paging: IPaging)
    protected async queryResultWithPagination<T>(queryJson: ISelector, pageSize: number, bookmark: string);






    protected async queryResultWithPagination<T>(queryJson: ISelector, pageSize: number | IPaging, bookmark?: string) {
        let paging: IPaging = { pageCount: 1, bookMark: "" };
        if (typeof pageSize == "number") {
            paging.pageCount = pageSize;
            paging.bookMark = bookmark;
            return await couchdb.Instance.queryResultWithPagination(queryJson, paging.pageCount, bookmark);
        }
        else {
            paging = pageSize;
            return await couchdb.Instance.queryResultWithPagination(queryJson, paging);
        }
    }
}
