import { baseChaincode, IEntityTypeAndDbKey, entityType, config, log } from "../../common/basechaincode";
import { IElectionSeat } from "../../common/interfaces/IEntitys";
import { fileHelper } from "../../common/tools/fileHelper";

export class electionseatModel {

    private _data: Array<IElectionSeat> = [];
    get data(): Array<IElectionSeat> {
        if (this._data.length == 0) {
            this.init();
        }
        return this._data;
    };
    private static _instance: electionseatModel;
    static get Instance(): electionseatModel {
        if (this._instance == undefined) {
            this._instance = new electionseatModel();
        }
        return this._instance;
    }
    constructor() {
        this.init();
    }
    private init() {

        this._data = fileHelper.getjsonData<IElectionSeat>("/data/electionSeatsData.json");
    }



    queryElectionSeatBySeatsIDs(seatIDs: Array<number>): Array<IElectionSeat> {
        const tempData: Array<IElectionSeat> = [];
        seatIDs.forEach(seatid => {
            this.data.forEach(a => {
                if (a.seatids.indexOf(seatid) > -1) {
                    const isexist = tempData.filter(b => b.electionid == a.electionid).length > 0;
                    if (!isexist) {
                        tempData.push(a);
                    }
                }
            })

        });
        return tempData;
    }






    querySeatIds(electionID: number): IElectionSeat {
        return this.data.first(a => a.electionid == electionID);
    }

}
