import { baseChaincode, log } from "../../common/basechaincode";
import { couchdb } from "../../common/tools/db";
import { IInVokeChainCode } from "../../common/interfaces/IChanCode";

export class voteChaincode extends baseChaincode implements IInVokeChainCode {
    chaincodeName = "voted";

    static get Instance(): voteChaincode {
        return super.getInstance(new voteChaincode());
    }
    private constructor() {
        super();
    }





    public async isvoted(userkey: string): Promise<boolean> {
        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "isvoted", userkey);
        if (data.ret) {
            return data.data;
        }
        return false;
    }





    public async getDeCodeVodedStatus() {
        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "getDeCodeVodedStatus");
        if (data.ret) {
            return data.data;
        }
        return false;
    }

}
