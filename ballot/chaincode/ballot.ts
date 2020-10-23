import { baseChaincode, IEntityTypeAndDbKey, entityType, config, log, IStatistic } from "../../common/basechaincode";
import { IBallot, IElection, ISeat, ICandidate, IUser, IPrecinctSeats, IElectionSeat, IBallotElection, IResult, IPrecinct, IUserBallot } from "../../common/interfaces/IEntitys";
import { tool } from "../../common/tools/tool";

import { ballotName } from "../config";
import { userModel } from "../otherchaincode/user";
import { seatModel } from "../models/seat";
import { precinctModel } from "../models/precinct";
import { electionModel } from "../models/election";
import { candidateModel } from "../models/candidate";
import { electionseatModel } from "../models/electionseat";
import { strict } from "assert";
import { voteChaincode } from "../otherchaincode/vote";

interface IBallotStatistic extends IStatistic {
    ballotcount: number;
}


interface IPrecinctBallot {
    precinctid: number,
    ballotMd5: string
}
interface IBallotGroup {
    md5: string;
    ballot: IBallot;
}
export class ballotChaincode extends baseChaincode implements IEntityTypeAndDbKey {
    type: entityType = "ballot";
    precinctBallot: string = "precinctBallot";
    dbkeyballotList: string = "ballotList";
    dbStatistic = "statistic";



    ballotList: Array<IBallotGroup> = [];



    precinctList: Array<IPrecinctBallot> = [];


    formatDbKey(...values: string[]): string {
        return config.db_ballot.format(values);
    }

    static get Instance(): ballotChaincode {
        return super.getInstance(new ballotChaincode());
    }

    private constructor() {
        super();

    }
    async init() {
        this.precinctList.clear();
        await this.queryPrecinctBallots();
        this.ballotList.clear();
        await this.queryBallotList();
    }






    async builderBallotAllUser(ballotdate: string) {
        let ballotCount = 0;

        if (this.precinctList.length == 0) {

            throw new Error('must builder demo ballot');
        }

        await this.queryBallotList();
        const userlist: Array<IUser> = await userModel.Instance.queryAllUsers();
        for (let i = 0; i < userlist.length; i++) {
            const user = userlist[i];

            const isexist = await this.existBallotByUserKey(user.publickey, ballotdate);
            if (isexist) {

                ballotCount += 1;
            }
            else {

                const ballot = this.precinctList.filter(b => b.precinctid == user.precinctid);
                if (ballot && ballot.length == 1) {
                    const tempballot: IBallot = this.queryPrecinctBallot(ballot[0].precinctid);
                    if (tempballot) {
                        const ballot = tempballot as IUserBallot;
                        ballot.userkey = user.publickey;
                        ballot.ballotno = tool.md5("{0}_{1}".format(user.publickey, ballotdate));
                        ballot.isvoted = false;
                        ballot.isopenvoting = false;
                        ballot.isconfirm = false;
                        ballot.votingdate = "";
                        ballot.confirmdate = "";
                        ballotCount += 1;
                        await this.insterUserBallot(user.publickey, ballot);
                    }
                }
                else {

                }
            }
        }
        await this.setBallotCount(ballotCount);
    }







    async buildPrecinctBallot(electiondate: string): Promise<Array<IPrecinctBallot>> {


        const isexist = await this.exist({
            _id: this.precinctBallot
        })
        if (!isexist) {





            const specialSeat: Array<ISeat> = seatModel.Instance.getSpecialSeat(); 
            const precinctData: Array<IPrecinct> = precinctModel.Instance.data; 
            if (precinctData == undefined || precinctData.length == 0) {
                throw new Error(`not search precinct`);
            }


            for (let i = 0; i < precinctData.length; i++) {
                const precinct = precinctData[i];
                const seatData: Array<ISeat> = seatModel.Instance.querySeatsByPrecinctID(precinct.precinctid);

                if (specialSeat.length > 0) { 
                    specialSeat.forEach(a => {
                        const isexit = seatData.filter(b => b.seatid == a.seatid).length > 0; 
                        if (!isexit) {
                            seatData.push(a);
                        }
                    });
                }

                if (seatData == undefined || seatData.length == 0) {
                    throw new Error("not search seat");
                }

                const seatIDs = seatData.map(a => a.seatid);

                const electionData: Array<IElection> = electionModel.Instance.queryElectionBySeatIDs(seatIDs);
                if (electionData == undefined || electionData.length == 0) {
                    throw new Error("not search election");

                }

                const candidateData: Array<ICandidate> = candidateModel.Instance.data; 

                if (candidateData == undefined || candidateData.length == 0) {
                    throw new Error("not search candidate");

                }
                let newballot: IBallot = {
                    type: this.type,
                    ballotname: ballotName,
                    ballotdate: electiondate,
                    elections: []
                }


                for (let i = 0; i < electionData.length; i++) {
                    const election = electionData[i];
                    const respone = this.getBallot({
                        election: election,
                        eSeatlist: electionseatModel.Instance.data,
                        seats: seatData,
                        candidates: candidateData
                    });

                    if (respone.ret) {
                        newballot.elections.push(respone.data);
                    }
                }


                const ballotmd5 = this.pushBallot(newballot);
                if(!this.precinctList.exists(a=>a.precinctid==precinct.precinctid)){
                    this.precinctList.push({
                        precinctid: precinct.precinctid,
                        ballotMd5: ballotmd5
                    });
                }
               
            }

            await this.insterBallot();

            await this.insterPrecinctBallot(this.precinctList);
        }
        else {
            await this.queryPrecinctBallots();
        }
        return this.precinctList;

    }







    public async existBallotByUserKey(userkey: string, ballotdate: string) {
        const queryJson = {
            type: this.type,
            userkey: userkey,
            ballotdate: ballotdate
        }

        return await this.exist(queryJson);
    }





    public async existBallotByBallotNumber(ballotNumber: string) {
        const queryJson = {
            type: this.type,
            ballotno: ballotNumber
        }

        return await this.exist(queryJson);
    }





    public async queryBallotByBallotNumber(ballotno: string): Promise<IUserBallot> {
        const queryJson = {
            type: this.type,
            ballotno: ballotno
        }
        const ballot = await this.first<IUserBallot>(queryJson);
        if (ballot) {
            ballot.isopenvoting = await voteChaincode.Instance.getDeCodeVodedStatus();
        }
        return ballot
    }





    public async queryBallotByElectionDate(userkey: string, ballotdate: string): Promise<IUserBallot> {
        const queryJson = {
            type: this.type,
            userkey: userkey,
            ballotdate: ballotdate
        }
        const ballot = await this.first<IUserBallot>(queryJson);

        if (ballot) {
            ballot.isopenvoting = await voteChaincode.Instance.getDeCodeVodedStatus();
        }
        return ballot
    }




    public async queryBallots(userkey: string): Promise<Array<IUserBallot>> {
        const queryJson = {
            type: this.type,
            userkey: userkey
        };
        const ballotlist = await this.filter<IUserBallot>(queryJson);
        if (ballotlist) {
            const isopenvoting = await voteChaincode.Instance.getDeCodeVodedStatus();
            ballotlist.forEach(a => a.isopenvoting = isopenvoting);
        }
        return ballotlist;
    }









    public async updateVoted(userkey: string, date: string): Promise<boolean> {
        const db_key = this.formatDbKey(userkey);
        const ballot = await this.first<IUserBallot>({
            _id: db_key,
            userkey: userkey
        });
        if (ballot != undefined) {
            ballot.isvoted = true;
            ballot.votingdate = date;
            await this.putState(db_key, ballot);
            return true;
        }
        else {
            return false;
        }
    }





    public async confirmVoted(userkey: string, date: string): Promise<boolean> {
        const db_key = this.formatDbKey(userkey);
        const ballot = await this.first<IUserBallot>({
            _id: db_key,
            userkey: userkey
        });
        if (ballot != undefined) {
            ballot.isconfirm = true;
            ballot.confirmdate = date;
            await this.putState(db_key, ballot);
            return true;
        }
        else {
            return false;
        }
    }







    private async insterUserBallot(userkey: string, ballot: IUserBallot) {
        if (await this.existBallotByBallotNumber(ballot.ballotno)) {

        }
        else {

            ballot.type = this.type;
            const db_key = this.formatDbKey(userkey);
            await this.putState(db_key, ballot);
        }
    }





    public async queryPrecinctBallots(): Promise<Array<IPrecinctBallot>> {
        let data = await this.first<{ precinctBallotList: Array<IPrecinctBallot> }>({
            _id: this.precinctBallot
        });
        if (data == undefined) {
            data = {
                precinctBallotList: []
            }
        }
        this.precinctList = data.precinctBallotList;

        return this.precinctList;
    }




    public queryPrecinctBallot(precinctID: number) {
        const item = this.precinctList.first(a => a.precinctid == precinctID);
        const demoballot = this.ballotList.first(a => a.md5 == item.ballotMd5);
        if (demoballot) {
            return demoballot.ballot;
        }
        return undefined;
    }




    public async insterPrecinctBallot(precinctList: Array<IPrecinctBallot>) {
        await this.putState("precinctBallot", {
            precinctBallotList: precinctList
        }); 
    }








    private pushBallot(ballot: IBallot): string {
        let ballotmd5 = this.getballotMd5(ballot);
        const isexist = this.ballotList.exists(a => a.md5 == ballotmd5);
        if (!isexist) {
            this.ballotList.push({
                md5: ballotmd5,
                ballot: ballot
            })
        }
        return ballotmd5;
    }




    private getballotMd5(ballot: IBallot) {
        let electionSeatTreeSort = []
        const electionIDSort = ballot.elections.map(a => a.election.electionid).sort();
        electionIDSort.forEach(eid => {
            ballot.elections.forEach(election => {
                if (election.election.electionid == eid) {
                    const seatIDSort = election.seats.map(a => a.seat.seatid).sort();
                    electionSeatTreeSort.push({
                        eid: eid,
                        sids: seatIDSort
                    })
                }
            })
        })

        return tool.md5(JSON.stringify(electionSeatTreeSort));
    }




    private async insterBallot() {
        await this.putState(this.dbkeyballotList, {
            "ballotList": this.ballotList
        });
    }




    public async queryBallotList() {
        let data = await this.first<{ ballotList: Array<IBallotGroup> }>({
            _id: this.dbkeyballotList
        });
        if (data == undefined) {
            data = {
                ballotList: []
            }
        }
        this.ballotList = data.ballotList;
    }





    private getBallot(x: { election: IElection, eSeatlist: Array<IElectionSeat>, seats: Array<ISeat>, candidates: Array<ICandidate> }): { ret: boolean, data?: IBallotElection } {

        let ret = true;
        let data: IBallotElection = {};

        data.election = x.election;
        data.seats = [];
        const eseat = x.eSeatlist.first(a => a.electionid == x.election.electionid);

        if (eseat && eseat.seatids && eseat.seatids.length > 0) {
            for (let i = 0; i < eseat.seatids.length; i++) {
                const seatid = eseat.seatids[i];

                const seat = x.seats.first(b => b.seatid == seatid);
                if (seat == undefined) {
                    continue;
                }

                const clist: Array<ICandidate> = [];
                if (seat && seat.candidateids && seat.candidateids.length > 0) {

                    for (let j = 0; j < seat.candidateids.length; j++) {
                        const cid = seat.candidateids[j];
                        const cinfo = x.candidates.first(c => c.candidateid == cid);

                        clist.push(cinfo);
                    }
                    if (clist.length > 0) {
                        data.seats.push({
                            seat: seat,
                            candidates: clist
                        })
                    }
                    else {

                        ret = false;
                    }

                }
                else {

                    ret = false;
                    break;
                }
            }
        }
        else {

        }
        if (ret == false) {
            return { ret: false, }
        }
        else {
            return {
                ret: true,
                data: data
            }
        }
    }








    private async setBallotCount(ballotCount) {

        await this.putState(this.dbStatistic, {
            ballotcount: ballotCount
        });
    }






    private cloneObject(data: any) {
        return JSON.parse(JSON.stringify(data));
    }
}
