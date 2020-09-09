
import { ISeat, IElectionSeat } from "../../common/interfaces/IEntitys";
import { fileHelper } from "../../common/tools/fileHelper";
import { electionseatModel } from "./electionseat";
import { precinctseatsModel } from "./precinctseats";
import { log } from "../../common/tools/log";





export class seatModel {

    private _data: Array<ISeat> = [];
    get data(): Array<ISeat> {
        if (this._data.length == 0) {
            this.init();
        }
        return this._data;
    };
    private static _instance: seatModel;
    static get Instance(): seatModel {
        if (this._instance == undefined) {
            this._instance = new seatModel();
        }
        return this._instance;
    }
    constructor() {
        this.init();
    }
    private init() {

        this._data = fileHelper.getjsonData<ISeat>("/data/seatsData.json");
    }




    public getSpecialSeat() {
        return this.data.filter(a => a.number == "");
    }

    public querySeatsByPrecinctID(precinctID: number): Array<ISeat> {
        const pseatlist = precinctseatsModel.Instance.queryPrecinctByPrecinctId(precinctID);
        if (pseatlist != undefined && pseatlist.length > 0) {
            const seatIDs = pseatlist.map(a => a.seatid);
            return this.querySeatsBySeatIds(seatIDs);
        } else {
            return [];
        }
    }


    private querySeatsBySeatIds(seatIDs: Array<number>): Array<ISeat> {
        let tempData = [];
        this.data.forEach(a => {
            if (seatIDs.indexOf(a.seatid) > -1) {
                tempData.push(a);
            }
        })
        return tempData;
    }

    querySeatByID(seatID: number) {
        return this.data.first(a => a.seatid == seatID);

    }



    queryCandidateIDsBySeatID(seatid: number) {
        const seat = this.querySeatByID(seatid);
        if (seat) {
            return seat.candidateids;
        }
        return [];
    }





    querySeatsByElectionID(electionID: number): Array<ISeat> {
        const electionseat: IElectionSeat = electionseatModel.Instance.querySeatIds(electionID);
        if (electionseat != undefined && electionseat.seatids.length > 0) {
            return this.querySeatsBySeatIds(electionseat.seatids);
        }
        else {
            return [];
        }
    }

}
