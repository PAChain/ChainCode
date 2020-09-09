require("../common/extend/jsextend");
import { Contract, Context } from "fabric-contract-api";
import { baseChaincode, log } from "../common/basechaincode";
import { IUser, IResult, IVote, IDeCodeVoted, IPaging } from "../common/interfaces/IEntitys";
import { couchdb } from "../common/tools/db";
import { voteChaincode } from "./chaincode/vote";
import { baseapp } from "../common/baseapp";




export class app extends baseapp {
    result: IResult;
    constructor() {
        super();
    }
    chainlist: Array<baseChaincode> = [];



    public async initLedger(ctx: Context) {
        this.chainlist = [
            voteChaincode.Instance,
        ];
        this.updateCtx(ctx);

        console.log("========================= Voted ============================")
    }








    public async vote(ctx: Context, userkey: string, votingdate: string, ballotnumber: string, voteData: string): Promise<IResult> {
        this.updateCtx(ctx);
        try {
            const votelist: Array<IVote> = JSON.parse(voteData);
            const data = await voteChaincode.Instance.votelist(userkey, votingdate, ballotnumber, votelist);
            this.result.ret = true;
        }
        catch (error) {
            this.result.msg = error.message;
        }
        return this.result;
    }




    public async startDecodeVoted(ctx: Context): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await voteChaincode.Instance.startDecodeVoted();
        return {
            ret: true,
            data: data
        }
    }






    public async getDeCodeVoted(ctx: Context, publickey: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: Array<IVote> = await voteChaincode.Instance.getDeCodeVoted(publickey);
        return {
            ret: true,
            data: data
        }
    }






    async setDeCodeVoted(ctx: Context, deCodeVotedData: string): Promise<IResult> {
        this.updateCtx(ctx);
        const deCodeVoted = JSON.parse(deCodeVotedData) as IDeCodeVoted;
        const data = await voteChaincode.Instance.setDeCodeVoted(deCodeVoted);
        return {
            ret: true,
            data: data
        }
    }






    async queryOriginalVotedByVotingNumber(ctx: Context, votingnumber: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: Array<IVote> = await voteChaincode.Instance.queryOriginalVotedByVotingNumber(votingnumber);
        return {
            ret: true,
            data: data
        }
    }








    async queryDeCodeVotedByVotingNumber(ctx: Context, votingnumber: string, countnumber: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await voteChaincode.Instance.queryDeCodeVotedByVotingNumber(votingnumber, countnumber);
        return {
            ret: true,
            data: data
        }

    }





    public async isvoted(ctx: Context, userkey: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await voteChaincode.Instance.isvoted(userkey);
        return {
            ret: true,
            data: data
        }
    }






    public async getVotedLog(ctx: Context): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await voteChaincode.Instance.getVotedLog();
        return {
            ret: true,
            data: data
        }
    }





    public async getCleartextVotedList(ctx: Context, pagesize: number, bookmark: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: { page: IPaging, data: Array<IUser> } = await voteChaincode.Instance.getCleartextVotedList(pagesize, bookmark);
        return {
            ret: true,
            data: data
        };
    }






    public async getCleartextVoted(ctx: Context, votingnumber: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await voteChaincode.Instance.getCleartextVoted(votingnumber);
        return {
            ret: true,
            data: data
        };
    }







    public async getDeCodeVodedStatus(ctx: Context) {
        this.updateCtx(ctx);
        const data = await voteChaincode.Instance.getDeCodeVodedStatus();
        return {
            ret: true,
            data: data
        }
    }







    public async getDecodeProgress(ctx: Context) {
        this.updateCtx(ctx);
        const data = await voteChaincode.Instance.getDecodeProgress();
        return {
            ret: true,
            data: data
        }
    }






    public async delkey(ctx: Context, dbkey: Array<string> | string): Promise<IResult> {
        this.updateCtx(ctx);
        return super._delkey(dbkey);

    }





    public async getHistory(ctx: Context, dbkey: string): Promise<IResult> {
        this.updateCtx(ctx);
        return await super._getHistory(dbkey);
    }



    public async putState(ctx: Context, dbkey: string, value: string) {
        this.updateCtx(ctx);
        return await super._putState(dbkey, value);
    }

    private updateCtx(ctx: Context) {
        couchdb.Instance.ctx = ctx;
        for (let i = 0; i < this.chainlist.length; i++) {
            this.chainlist[i].result = { ret: false };
        }
        this.result = {
            ret: false,
            msg: "",
            data: null
        }
        log.log("update ctx");
    }

}
process.on('uncaughtException', function (err) {

    log.error(err);

    log.error(err.stack);
});
