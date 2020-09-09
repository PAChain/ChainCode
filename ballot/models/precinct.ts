
import { IPrecinct } from "../../common/interfaces/IEntitys";
import { fileHelper } from "../../common/tools/fileHelper";
import { log } from "../../common/tools/log";
import { precinctseatsModel } from "./precinctseats";

export class precinctModel {

    private _data: Array<IPrecinct> = [];
    get data(): Array<IPrecinct> {
        if (this._data.length == 0) {
            this.init();
        }
        return this._data;
    };
    private static _instance: precinctModel;
    static get Instance(): precinctModel {
        if (this._instance == undefined) {
            this._instance = new precinctModel();
        }
        return this._instance;
    }
    constructor() {
        this.init();
    }
    private init() {

        this._data = fileHelper.getjsonData<IPrecinct>("/data/precinctsData.json");
    }







    queryPrecincts(): Array<IPrecinct> {
        return this.data;
    }

    queryPrecinctByID(precinctID: number) {
        return this.data.first(a => a.precinctid == precinctID);
    }






    public queryPrecinctBySeatID(seatid: number) {
        const pids = precinctseatsModel.Instance.queryPrecinctBySeatId(seatid);
        return this.data.filter(a => pids.indexOf(a.precinctid) > -1);
    }



}
