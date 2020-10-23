
import { Contract, Context } from "fabric-contract-api";
import { baseChaincode, log } from "../common/basechaincode";
import { IUser, IResult, IBallot, IElection, ISeat, IPrecinct, ICandidate, IUserBallot } from "../common/interfaces/IEntitys";
import { couchdb } from "../common/tools/db";
import { ballotChaincode } from "./chaincode/ballot";
import { ballotDate } from "./config";
import { voteChaincode } from "./otherchaincode/vote";
import { electionModel } from "./models/election";
import { seatModel } from "./models/seat";
import { precinctModel } from "./models/precinct";
import { candidateModel } from "./models/candidate";
import { baseapp } from "../common/baseapp";
import { onionModel } from "./models/onion";
import { voteInviteHistory } from "./models/voteInviteHistory";
import { tool } from "../common/tools/tool";





export class app extends baseapp {

    constructor() {
        super();
    }
    chainlist: Array<baseChaincode> = [];

    public async initLedger(ctx: Context) {
        this.chainlist = [
            ballotChaincode.Instance
        ];
        this.updateCtx(ctx);
        await ballotChaincode.Instance.init();
        console.log("========================= Election ============================")
    }





    public async queryAllElection(ctx: Context): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await electionModel.Instance.queryAllElection();

        let electionlist = tool.cloneObject(data) as Array<IElection>;

        if (electionlist && electionlist.length) {
            let isopenvoting = await voteChaincode.Instance.getDeCodeVodedStatus();
            for (var i = 0; i < electionlist.length; i++) {
                electionlist[i]["isopenvoting"] = isopenvoting;
            }
        }

        return {
            ret: true,
            data: electionlist
        }
    }







    public async queryElectionsByID(ctx: Context, electionid: number): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await electionModel.Instance.queryElectionsByID(electionid);
        return {
            ret: true,
            data: data
        }
    }








    public async querySeatsByElectionID(ctx: Context, electionid: number): Promise<IResult> {
        this.updateCtx(ctx);
        const data = seatModel.Instance.querySeatsByElectionID(electionid);
        return {
            ret: true,
            data: data
        }
    }






    public async querySeatByID(ctx: Context, seatid: number): Promise<IResult> {
        this.updateCtx(ctx);
        const data = seatModel.Instance.querySeatByID(seatid);
        return {
            ret: true,
            data: data
        }
    }









    public async queryPrecinctBySeatID(ctx: Context, seatid: number): Promise<IResult> {
        this.updateCtx(ctx);
        const data: Array<IPrecinct> = await precinctModel.Instance.queryPrecinctBySeatID(seatid);
        return {
            ret: true,
            data: data
        }
    }








    public async queryCandidatesBySeatID(ctx: Context, seatid: number): Promise<IResult> {
        this.updateCtx(ctx);
        const cids = await seatModel.Instance.queryCandidateIDsBySeatID(seatid);
        const data: Array<ICandidate> = await candidateModel.Instance.queryCandidatesByIDs(cids);
        return {
            ret: true,
            data: data
        }
    }







    public async setInviteAllUser(ctx: Context, date: string): Promise<IResult> {
        this.updateCtx(ctx);
        await voteInviteHistory.Instance.setInviteAllUser(date);
        return {
            ret: true,
            data: true
        }
    }



    public async setVoteInvite(ctx: Context, userkey: string, status: number, date: string): Promise<IResult> {
        this.updateCtx(ctx);
        await voteInviteHistory.Instance.setVoteInvite(userkey, status, date);
        return {
            ret: true,
            data: true
        }
    }



    public async getVoteInvite(ctx: Context, userkey: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: number = await voteInviteHistory.Instance.getVoteInvite(userkey);
        return {
            ret: true,
            data: data
        }
    }
    public async getVoteInviteStatus(ctx: Context, userkey: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: number = await voteInviteHistory.Instance.getVoteInviteStatus(userkey);
        return {
            ret: true,
            data: data
        }
    }




    public async getVoteInviteStatistic(ctx: Context): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await voteInviteHistory.Instance.getStatistic();
        return {
            ret: true,
            data: data
        }
    }




















    public async queryPrecinctBallot(ctx: Context, precinctID: number): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await ballotChaincode.Instance.queryPrecinctBallot(precinctID);
        return {
            ret: true,
            data: data
        }
    }






    public async builderBallotAllUser(ctx: Context): Promise<IResult> {
        this.updateCtx(ctx);
        const result: IResult = {
            ret: false
        }
        try {
            await ballotChaincode.Instance.builderBallotAllUser(ballotDate);
            result.ret = true;
        }
        catch (ex) {
            result.msg = ex.message;
        }
        return result;
    }





    public async buildPrecinctBallot(ctx: Context) {
        this.updateCtx(ctx);
        const result: IResult = {
            ret: false
        }
        try {
            await ballotChaincode.Instance.buildPrecinctBallot(ballotDate);
            result.ret = true;
        }
        catch (ex) {
            result.msg = ex.message;
        }
        return result;
    }






    public async queryBallots(ctx: Context, userkey: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: Array<IBallot> = await ballotChaincode.Instance.queryBallots(userkey);
        return {
            ret: true,
            data: data
        }
    }







    public async queryBallot(ctx: Context, userkey: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: IBallot = await ballotChaincode.Instance.queryBallotByElectionDate(userkey, ballotDate);
        return {
            ret: true,
            data: data
        }
    }







    public async queryBallotByBallotNumber(ctx: Context, ballotnumber: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: IBallot = await ballotChaincode.Instance.queryBallotByBallotNumber(ballotnumber);
        return {
            ret: true,
            data: data
        }
    }






    public async existBallotByUserKey(ctx: Context, userkey: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await ballotChaincode.Instance.existBallotByUserKey(userkey, ballotDate);
        return {
            ret: true,
            data: data
        }
    }






    public async existBallotByBallotNumber(ctx: Context, ballotnumber: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await ballotChaincode.Instance.existBallotByBallotNumber(ballotnumber);
        return {
            ret: true,
            data: data
        }
    }






    public async getOnionKeys(ctx: Context, countnumber: string): Promise<IResult> {
        const onionKeys = onionModel.getonionGroup(countnumber);
        return {
            ret: true,
            data: onionKeys
        }
    }








    public async voted(ctx: Context, userkey: string, date: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await ballotChaincode.Instance.updateVoted(userkey, date);
        return {
            ret: true,
            data: data
        }
    }






    public async confirmVoted(ctx: Context, userkey: string, date: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await ballotChaincode.Instance.confirmVoted(userkey, date);
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
        log.log("update ctx");
    }
}
process.on('uncaughtException', function (err) {

    log.error(err);

    log.error(err.stack);
});
