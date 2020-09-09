
import { ICandidate } from "../../common/interfaces/IEntitys";
import { fileHelper } from "../../common/tools/fileHelper";
import { log } from "../../common/tools/log";


export class candidateModel {


    private _data: Array<ICandidate> = [];
    get data(): Array<ICandidate> {
        if (this._data.length == 0) {
            this.init();
        }
        return this._data;
    };
    private static _instance: candidateModel;
    static get Instance(): candidateModel {
        if (this._instance == undefined) {
            this._instance = new candidateModel();
        }
        return this._instance;
    }
    constructor() {
        this.init();
    }
    private init() {

        this._data = fileHelper.getjsonData<ICandidate>("/data/candidatesData.json");
    }

    querycandidateID(candidateID: string) {
        return this.data.first(a => a.candidateid == candidateID);
    }
    queryAllCandidates() {
        return this.data;
    }

    queryCandidatesByIDs(cids: number[]) {
        return this.data.filter(a => cids.indexOf(a.candidateid) > -1);
    }

}
