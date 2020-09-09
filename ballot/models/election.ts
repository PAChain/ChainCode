import { IElection } from "../../common/interfaces/IEntitys";
import { fileHelper } from "../../common/tools/fileHelper";
import { electionseatModel } from "./electionseat";
import { log } from "../../common/tools/log";

export class electionModel {

    private _data: Array<IElection> = [];
    get data(): Array<IElection> {
        if (this._data.length == 0) {
            this.init();
        }
        return this._data;
    };
    private static _instance: electionModel;
    static get Instance(): electionModel {
        if (this._instance == undefined) {
            this._instance = new electionModel();
        }
        return this._instance;
    }
    constructor() {
        this.init();
    }
    private init() {

        this._data = fileHelper.getjsonData<IElection>("/data/electionsData.json");
    }

    public queryElectionBySeatIDs(seatIDs: Array<number>) {
        const electionseatlist = electionseatModel.Instance.queryElectionSeatBySeatsIDs(seatIDs);
        if (electionseatlist != undefined && electionseatlist.length > 0) {
            const electionIDs = electionseatlist.map(a => a.electionid);
            return this.queryElectionByElectionIds(electionIDs);
        } else {
            return [];
        }
    }


    private queryElectionByElectionIds(electionIDs: Array<number>): Array<IElection> {
        let tempData = [];
        this.data.forEach(a => {
            if (electionIDs.indexOf(a.electionid) > -1) {
                tempData.push(a);
            }
        })
        return tempData;
    }







    queryAllElection() {
        return this.data;
    }




    queryElectionsByID(electionID: number) {
        return this.data.first(a => a.electionid == electionID);
    }

}
