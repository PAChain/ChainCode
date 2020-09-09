import { basemodel } from "../../common/basemodel";
import { log } from "../../common/tools/log";
import { ISelector } from "../../common/tools/db";

interface IVotingnumberList {
    votingnumberlist: { [key: string]: boolean }
}




export class deCodeProgress extends basemodel {
    private static _instance: deCodeProgress;

    static get Instance(): deCodeProgress {
        if (!this._instance) {
            this._instance = new deCodeProgress();
        }
        return this._instance;
    }

    dbkey: string = "deCodeprogress";

    private constructor() {
        super();
    }





    async setvVotednumber(votingnumber: string, status: boolean = false) {
        const isexist = await this.isDeCodeVotedOver(votingnumber, status);
        if (!isexist) {
            const data = await this.getVotednumberList();
            data.votingnumberlist[votingnumber] = status;
            await this.putState(this.dbkey, data);
        }
    }
    async getVotednumberList() {
        let data = await this.first<IVotingnumberList>({
            _id: this.dbkey
        });
        if (data == undefined) {
            data = {
                votingnumberlist: {
                }
            }
        }
        return data;
    }




    async deCodeVotedOver(votingnumber: string) {
        await this.setvVotednumber(votingnumber, true);
    }





    async isDeCodeVotedOver(votingnumber: string, status: boolean = false) {

        const query: ISelector = {
            _id: this.dbkey,
            votingnumberlist: {
            }
        }
        query.votingnumberlist[votingnumber] = status;
        let isexist = await this.exist(query);
        return isexist;
    }
}
