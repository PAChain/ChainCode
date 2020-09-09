
import { IPrecinctSeats } from "../../common/interfaces/IEntitys";
import { fileHelper } from "../../common/tools/fileHelper";
import { log } from "../../common/tools/log";


export class precinctseatsModel {
    private _data: Array<IPrecinctSeats> = [];
    get data(): Array<IPrecinctSeats> {
        if (this._data.length == 0) {
            this.init();
        }
        return this._data;
    };
    private static _instance: precinctseatsModel;
    static get Instance(): precinctseatsModel {
        if (this._instance == undefined) {
            this._instance = new precinctseatsModel();
        }
        return this._instance;
    }
    constructor() {
        this.init();
    }
    private init() {
        log.log("PrecinctSeats");
        this._data = fileHelper.getjsonData<IPrecinctSeats>("/data/precinctseatsData.json");
    }






    queryPrecinctByPrecinctId(precinctid: number): Array<IPrecinctSeats> {
        return this.data.filter(a => a.precinctids.indexOf(precinctid) > -1);
    }





    queryPrecinctBySeatId(seatId: number): Array<number> {
        const pseat = this.data.first(a => a.seatid == seatId);
        return pseat.precinctids;
    }

}
