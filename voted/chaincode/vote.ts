
import { IVote, IDeCodeVoted, ICleartextVoted } from "../../common/interfaces/IEntitys";
import { baseChaincode, entityType, config, log, IEntityTypeAndDbKey, IStatistic } from "../../common/basechaincode"
import { ballotChaincode } from "../otherchaincode/ballot";

import { couchdb, IHistoryData } from "../../common/tools/db";
import { userChaincode } from "../otherchaincode/user";
import { count } from "console";
import { candidateStatistic } from "../models/candidateStatistic";
import { deCodeProgress } from "../models/deCodeProgress";


interface IUserKeys {
    votedusers: [{
        userkey: string;
        votingdate: string;
    }?]
}



interface IVotedStatistic {
    type: string
    electionid: number;
    seatid: number;
    candidateid: number;
    votecount: number;
}
export class voteChaincode extends baseChaincode implements IEntityTypeAndDbKey {
    type: entityType = "originalvoted";




    originalvoted: entityType = "originalvoted";



    decodevoted: entityType = "decodevoted";




    cleartextvoted: entityType = "cleartextvoted";





    dbvotedlog: string = "votedlog";




    voteDateStatistic: string = "votedatestatistic"

    formatDbKey(...values: string[]): string {
        return config.db_originalvote.format(values);
    }

    static get Instance(): voteChaincode {
        return super.getInstance(new voteChaincode());
    }
    private constructor() {
        super();





    }






    async votelist(userkey: string, votingdate: string, ballotnumber: string, votelist: Array<IVote>): Promise<boolean> {

        const existBallot = await ballotChaincode.Instance.existBallotByBallotNumber(ballotnumber);

        if (!existBallot) {
            throw new Error(`nonexistent ballotnumber:${ballotnumber}`); 
        }
        const isaccept = await ballotChaincode.Instance.isVoteInviteStatusAccept(userkey);

        if(!isaccept){
            throw new Error(`vote invite status not accept`); 
        }
        const existUser = await userChaincode.Instance.existUser(userkey); 

        if (!existUser) {
            throw new Error(`nonexistent user:${userkey}`); 
        }
        const existvote = await this.isvoted(userkey);

        if (existvote) {
            throw new Error(`They've already voted:${userkey}`); 
        }
        if (votelist != undefined && votelist.length > 0) {

            for (let i = 0; i < votelist.length; i++) {
                await this.vote(userkey, votelist[i]);
            }
            await this.insterVoted(userkey, votingdate, votelist[0].votingnumber);
        }

        return true;
    }





    async vote(userkey: string, vote: IVote): Promise<boolean> {

        vote.type = this.type;
        await this.putState(this.formatDbKey(vote.votingnumber, vote.onionkey), vote);
        await this.insterDecodeVoted(vote);
        return true;
    }





    private async insterDecodeVoted(voted: IVote) {
        let item: IDeCodeVoted = voted;

        item.type = this.decodevoted;
        item.encodekey = await this.getEnCodeKey(voted.county, item.onionkey);

        await this.putState(config.db_decodevote.format(item.votingnumber, item.onionkey), item);
    }




    async startDecodeVoted(): Promise<boolean> {

        await this.insterDeCodeVodedStatus(true);
        return true;
    }





    async getDeCodeVoted(publickey: string): Promise<Array<IVote>> {
        const issatrt = await this.getDeCodeVodedStatus();
        if (!issatrt) {
            throw new Error(`voting not start`)
        }
        const votedlist: Array<IVote> = await this.filter<IVote>({
            type: this.decodevoted,
            encodekey: publickey
        });
        return votedlist
    }





    async setDeCodeVoted(deCodeVoted: IDeCodeVoted): Promise<boolean> {

        
        const nextpublickey = await this.getEnCodeKey(deCodeVoted.county, deCodeVoted.onionkey, deCodeVoted.encodekey);

        if (nextpublickey == undefined) {
            deCodeVoted.encodekey = "0000000000"; 
            deCodeVoted.type = this.cleartextvoted;

        }
        else {
            deCodeVoted.type = this.decodevoted;
            deCodeVoted.encodekey = nextpublickey;
        }
        await this.putState(config.db_decodevote.format(deCodeVoted.votingnumber, deCodeVoted.onionkey), deCodeVoted);

        if (nextpublickey == undefined) {

            await this.deCodeVotedOver(deCodeVoted);
        }
        return true;
    }





    async deCodeVotedOver(deCodeVoted: IDeCodeVoted) {

        try {
            const data: ICleartextVoted = JSON.parse(deCodeVoted.packages); 
            if (data.votingData) {

                const isexist = await deCodeProgress.Instance.isDeCodeVotedOver(deCodeVoted.votingnumber, true);
                if (!isexist) {
                    await candidateStatistic.setCandidateStatistic(data.votingData);
                }
            }

            await deCodeProgress.Instance.deCodeVotedOver(deCodeVoted.votingnumber); 
        }
        catch (error) {
            log.error(error.message);
        }
    }






    async getCleartextVotedList(pagesize: number, bookmark: string): Promise<any> {
        pagesize = pagesize == undefined || pagesize == 0 ? 10 : pagesize;
        const votedlist = await this.queryResultWithPagination<IVote>({
            type: "cleartextvoted"
        }, {
            pageCount: pagesize,
            bookMark: bookmark
        });
        return votedlist;
    }





    async getCleartextVoted(votingnumber: string): Promise<IVote> {
        if (String.IsNullOrEmpty(votingnumber)) {
            throw new Error("votingnumber not null");
        }
        const voted = await this.first<IVote>({
            type: "cleartextvoted",
            votingnumber: votingnumber
        });
        return voted;
    }





    async queryOriginalVotedByVotingNumber(votingnumber: string): Promise<IVote[]> {
        return this.filter({
            type: this.originalvoted,
            votingnumber: votingnumber
        })
    }






    async queryDeCodeVotedByVotingNumber(votingnumber: string, countnumber: string): Promise<any> {
        const listOniconHistrory: [{
            key: string;
            histroryData: Array<IHistoryData>
        }?] = []

        const keys = await ballotChaincode.Instance.getOnionKeys(countnumber);
        for (let i = 0; i < keys.length; i++) {
            const onionkey = keys[i].key;
            const dbkey = config.db_decodevote.format(votingnumber, onionkey);
            const historylist: Array<IHistoryData> = await couchdb.Instance.getHistoryForKey<IDeCodeVoted>(dbkey);
            listOniconHistrory.push({
                key: onionkey,
                histroryData: historylist
            })
        }
        return listOniconHistrory;

    }








    public async isvoted(userkey: string) {
        const isexist = await this.exist({
            _id: this.dbvotedlog,
            votedusers: {
                $elemMatch: {
                    userkey: userkey
                }
            }
        });

        return isexist;
    }







    private async insterVoted(userkey: string, votingdate: string, votingnumber: string): Promise<boolean> {


        let data = await this.getVotedLog();

        data.votedusers.push({
            userkey: userkey,
            votingdate: votingdate
        });
        await this.putState(this.dbvotedlog, data);

        await deCodeProgress.Instance.setvVotednumber(votingnumber); 
        await ballotChaincode.Instance.voted(userkey, votingdate);

        return true;
    }




    public async getVotedLog(): Promise<IUserKeys> {
        let data = await this.first<IUserKeys>({
            _id: this.dbvotedlog
        });

        if (data == undefined) {
            data = {
                votedusers: []
            }
        }
        else if (data.votedusers == undefined) {
            data.votedusers = [];
        }
        return data;
    }





    public async getDecodeProgress() {
        const data = await deCodeProgress.Instance.getVotednumberList();
        if (data && data.votingnumberlist) {
            return data.votingnumberlist;
        }
        return [];
    }







    private async getEnCodeKey(countnumber: string, onionkey: string, publickey: string = "") {
        return await ballotChaincode.Instance.getOnionKeyOrderDesc(countnumber, onionkey, publickey)
    }







    public async getDeCodeVodedStatus(): Promise<boolean> {
        const data = await this.first<{ isstart: boolean }>({
            _id: "decodeType"
        });
        if (data != undefined) {
            return data.isstart;
        }
        return false;

    }



    async insterDeCodeVodedStatus(isstart: boolean) {
        await this.putState("decodeType", { isstart: isstart })
    }

}
