
import { baseChaincode, log } from "../../common/basechaincode"
import { IUser } from "../../common/interfaces/IEntitys";

import { couchdb } from "../../common/tools/db";
import { IInVokeChainCode } from "../../common/interfaces/IChanCode";





export class userChaincode extends baseChaincode implements IInVokeChainCode {

    static get Instance(): userChaincode {
        return super.getInstance(new userChaincode());
    }
    private constructor() {
        super();
    }

    chaincodeName = "user";








    public async queryUser(userkey: string): Promise<IUser> {
        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "queryUser", userkey);
        if (data.ret) {
            return data.data;
        }

        return undefined;
    }


    async queryUsers(pagesize: number, bookmark: string): Promise<Array<IUser>> {
        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "queryUsers", pagesize.toString(), bookmark)
        if (data.ret) {
            return data.data;
        }

        return [];
    }
    public async queryAllUsers() {
        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "queryAllUsers")
        if (data.ret) {
            return data.data;
        }

        return [];

    }





    public async existUser(username: string): Promise<boolean> {
        const data = await couchdb.Instance.invokeChaincode(this.chaincodeName, "queryAllUsers")
        return data.ret;

    }
} 
