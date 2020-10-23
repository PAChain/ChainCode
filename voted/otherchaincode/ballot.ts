
import { baseChaincode, log } from "../../common/basechaincode"

import { couchdb } from "../../common/tools/db";
import { IonionGroup } from "../../common/interfaces/IEntitys";
import { IInVokeChainCode } from "../../common/interfaces/IChanCode";






export class ballotChaincode extends baseChaincode implements IInVokeChainCode {

    static get Instance(): ballotChaincode {
        return super.getInstance(new ballotChaincode());
    }
    private constructor() {
        super();
    }

    chaincodeName = `ballot`;








    public async queryBallotByBallotNumber(ballotnumber: string) {
        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "queryBallotByBallotNumber", ballotnumber)
        if (data.ret) {
            return data.data;
        }
        return undefined;
    }






    public async existBallotByBallotNumber(ballotnumber: string): Promise<boolean> {
        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "existBallotByBallotNumber", ballotnumber)
        if (data.ret) {
            return data.data;
        }
        return false;
    }





    public async isVoteInviteStatusAccept(userkey: string): Promise<boolean> {
        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "getVoteInviteStatus", userkey)
        if (data.ret) {
            if (data.data && data.data == 1) {
                return true;
            }
        }
        return false;
    }





    public async getOnionKeys(countnumber: string): Promise<Array<IonionGroup>> {

        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "getOnionKeys", countnumber)
        if (data.ret) {
            return data.data;
        }
        return undefined;
    }






    public async getOnionKeyOrderDesc(countnumber: string, onionkey: string, publickey: string = ""): Promise<string> {
        const OnionKeys: Array<IonionGroup> = await this.getOnionKeys(countnumber);
        if (OnionKeys && OnionKeys.length > 0) {

            const okeys = OnionKeys.first(a => a.key == onionkey);
            if (okeys) {
                let newkeys: Array<string> = this.cloneObject(okeys.values);
                newkeys = newkeys.reverse();
                let index = -1;
                if (publickey == undefined || publickey.length == 0) {
                    index = 0;
                }
                else if (newkeys.indexOf(publickey) > -1) {
                    index = newkeys.indexOf(publickey) + 1;
                }
                if (index > -1 && index < newkeys.length) {
                    return newkeys[index];
                }
            }
        }
        return undefined;
    }






    public async voted(userkey: string, date: string) {

        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "voted", userkey, date);
        if (data.ret) {
            return data.data;
        }
        return undefined;
    }





    private cloneObject(data: any) {
        return JSON.parse(JSON.stringify(data));
    }
} 
