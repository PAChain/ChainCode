
import { baseChaincode, IEntityTypeAndDbKey, entityType, config, Context, log, IStatistic } from "../../common/basechaincode"
import { IUser } from "../../common/interfaces/IEntitys";
import { isNumber } from "util";
import { tool } from "../../common/tools/tool";
import { fileHelper } from "../../common/tools/fileHelper";


interface IUserStatistic extends IStatistic {
    usercount: number;
    party: { [key: string]: number }
}



export class userChaincode extends baseChaincode implements IEntityTypeAndDbKey {
    dbStatistic = "statistic";
    static get Instance(): userChaincode {
        return super.getInstance(new userChaincode());
    }
    private constructor() {
        super();
    }
    total: string = "statistic";
    type: entityType = "user"
    formatDbKey(...values: Array<string>): string {
        return config.db_user.format(values);
    }








    public async registerUser(user: IUser): Promise<boolean> {

        const isexist = await this.existUser(user.publickey)
        if (isexist) {
            log.debugger(`fail to register,  ${user.publickey} exist`);
            throw new Error(`fail to register,  ${user.publickey} exist`);
        }
        const ret = await this.verifyUser(user);
        if (!ret.ret) {
            throw new Error(ret.msg);
        }
        user.type = this.type;
        await this.putState(this.formatDbKey(user.publickey), user);


        await this.setUserCount(user);
        return true
    }





    public async queryUser(userkey: string) {
        const data: IUser = await this.first<IUser>(
            {
                type: this.type,
                publickey: userkey
            }
        )
        return data
    }







    public async queryUsers(pagesize: number, bookmark: string) {
        const data = await this.queryResultWithPagination({
            type: this.type,
        }, {
            pageCount: pagesize,
            bookMark: bookmark
        });
        return data;
    }
    public async queryAllUsers() {
        const queryJson = {
            type: this.type,
        }
        const data = await this.filter<IUser>(queryJson)
        return data;

    }






    public async verifyUser(user: IUser): Promise<{ ret: boolean, msg: string }> {
        let ret: { ret: boolean, msg: string } = { ret: false, msg: "" }
        if (String.IsNullOrEmpty(user.publickey)) {
            ret.msg = "publickey not null";
        }
        else if (String.IsNullOrEmpty(user.voterid)) {
            ret.msg = "voterid not null";
        }
        else if (String.IsNullOrEmpty(user.precinctid.toString()) || user.precinctid == 0) {
            ret.msg = "precinctid not null";
        }
        else {
            ret.ret = true;
        }
        return ret;
    }




    public async existUser(publickey: string) {
        return await this.exist({
            $and: [
                {
                    type: this.type,
                },
                {
                    publickey: publickey
                }
            ]
        });
    }


    public async voted(userkey: string, ballotdate: string) {

    }




    public async getUserStatistic(): Promise<IUserStatistic> {

        let data = await this.first<IUserStatistic>({
            "_id": this.dbStatistic
        });
        if (data == undefined) {
            data = {
                usercount: 0, party: {
                    "D": 0, "R": 0, "O": 0
                }
            };
        }
        return data;
    }




    private async setUserCount(user: IUser) {
        const statistic = await this.getUserStatistic();
        log.debugger(`userCount ${JSON.stringify(statistic)}`);
        statistic.usercount += 1;
        const partyshort = tool.getPartyShort(user.party);
        let partyCount = statistic.party[partyshort];
        if (partyCount == undefined || !isNumber(partyCount)) {
            partyCount = 1
        }
        else {
            partyCount += 1
        }
        statistic.party[partyshort] = partyCount;
        await this.putState(this.dbStatistic, statistic);
    }
}
