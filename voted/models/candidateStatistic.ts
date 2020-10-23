import { basemodel } from "../../common/basemodel";
import { ICleartextVotedData } from "../../common/interfaces/IEntitys";
import { log } from "../../common/tools/log";

class ICandidateStatistic {
    static _type = "votedstatistic";
    type: string = ICandidateStatistic._type;
    electionid: number;
    seatid: number;
    candidateid: number;
    votecount: number;

    constructor() {
        this.type = ICandidateStatistic._type;
        this.electionid = 0;
        this.seatid = 0;
        this.candidateid = 0;
        this.votecount = 0;

    }
}

export class candidateStatistic extends basemodel {


    private static formatDbKey(...values: string[]): string {
        return "votedstatistic_{0}_{1}_{2}".format(values);
    }





    static async getStatistic(seatid: number, candidateID: number): Promise<ICandidateStatistic> {

        let data = await this.first<ICandidateStatistic>({
            type: ICandidateStatistic._type,
            seatid: seatid,
            candidateid: candidateID
        });

        if (data == undefined) {
            data = new ICandidateStatistic();
        }
        log.debugger(JSON.stringify(data));
        return data;
    }






    public static async setStatistic(statistic: ICandidateStatistic) {
        const dbkey = this.formatDbKey(statistic.electionid.toString(), statistic.seatid.toString(), statistic.candidateid.toString())
        const _statistic = await this.getStatistic(statistic.seatid, statistic.candidateid);
        _statistic.candidateid = statistic.candidateid;
        _statistic.electionid = statistic.electionid;
        _statistic.seatid = statistic.seatid;
        _statistic.type = statistic.type;
        _statistic.votecount += 1;
        await this.putState(dbkey, _statistic);
    }





    public static async setCandidateStatistic(cleartextVotedData: Array<ICleartextVotedData>) {

        if (cleartextVotedData && cleartextVotedData.length > 0) {
            for (let i = 0; i < cleartextVotedData.length; i++) {
                for (let j = 0; j < cleartextVotedData[i].candidates.length; j++) {
                    log.debugger(JSON.stringify(cleartextVotedData));
                    let item = new ICandidateStatistic();
                    item.electionid = cleartextVotedData[i].electionID;
                    item.seatid = cleartextVotedData[i].seatID;
                    item.candidateid = cleartextVotedData[i].candidates[j].id;
                    await this.setStatistic(item);
                }

            }
        }
    }
}
