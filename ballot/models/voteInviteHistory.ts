import { stat } from "fs";
import { config } from "process";
import { basemodel } from "../../common/basemodel";
import { IUserBallot } from "../../common/interfaces/IEntitys";
import { ballotChaincode } from "../chaincode/ballot";
import { ballotDate, ballotName } from "../config";
import { userModel } from "../otherchaincode/user";


interface IVoteInviteHistory {
    history: Array<IInviteHistory>;
    statistic: IVoteInviteStatistic;
}
interface IInviteHistory {
    userkey: string;
    status: number;
    invitedate?: string;
    actiondate?: string;
}
interface IVoteInviteStatistic {
    sendCount: number;
    acceptCount: number;
    refusalCount: number;
}



export class voteInviteHistory extends basemodel {
    private dbkey: string = "voteInviteHistory"; 
    private static _instance: voteInviteHistory;

    static get Instance(): voteInviteHistory {
        if (!this._instance) {
            this._instance = new voteInviteHistory();
        }
        return this._instance;
    }

    private async getHistory(): Promise<IVoteInviteHistory> {
        let data = await this.getState<IVoteInviteHistory>(this.dbkey);
        if (data == null) {
            data = {
                history: [],
                statistic: {
                    sendCount: 0,
                    acceptCount: 0,
                    refusalCount: 0
                }
            };
        }
        return data;
    }

    public async setInviteAllUser(date: string) {
        let userlist = await userModel.Instance.queryAllUsers();
        for (let i = 0; i < userlist.length; i++) {
            await this.setHistory(userlist[i].publickey, 0, date);
        }
    }
    public async setVoteInvite(userkey: string, status: number, date: string) {
        if (String.IsNullOrEmpty(userkey)) {
            throw new Error('user key is null');
        }
        let userexist = await userModel.Instance.existUser(userkey);
        if (!userexist) {
            throw new Error('user key not exist');
        }
        await this.setHistory(userkey, status, date);
    }
    private async setHistory(userkey: string, status: number, date: string) {
        let data = await this.getHistory();
        let item = data.history.first(a => a.userkey == userkey);

        if (item == null) {
            data.history.push({
                userkey: userkey,
                status: 0,
                invitedate: date
            });
            data.statistic.sendCount -= 1;
            data.statistic.sendCount += 2;
            await this.putState(this.dbkey, data);
        }
        else if (item.status == 0) {
            item.status = status;
            item.actiondate = date;

            data.statistic.sendCount -= 1;
            if (status == 1) {
                data.statistic.acceptCount += 1;
            }
            else if (status == 2) {
                data.statistic.refusalCount += 1;
            }
            await this.putState(this.dbkey, data);
        }






    }

    public async getVoteInvite(userkey: string) {
        let data = await this.getHistory();
        let item = data.history.first(a => a.userkey == userkey);
        let temp = item as any;
        if (temp != undefined) {
            temp.ballotdate = ballotDate
            temp.ballotname = ballotName;
            const ballot: IUserBallot = await ballotChaincode.Instance.queryBallotByElectionDate(userkey, ballotDate);
            if (ballot) {
                temp.ballotno = ballot.ballotno;
            }
        }
        return temp;
    }

    public async getVoteInviteStatus(userkey: string) {
        let data = await this.getHistory();
        let item = data.history.first(a => a.userkey == userkey);
        if (item == null) {
            return -1;
        }
        else {
            return item.status;
        }
    }




    public async getStatistic(): Promise<IVoteInviteStatistic> {
        let data = await this.getHistory();
        return data.statistic;
    }
}
