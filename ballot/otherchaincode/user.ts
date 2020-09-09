
import { baseChaincode, log } from "../../common/basechaincode"
import { IUser, IResult } from "../../common/interfaces/IEntitys";

import { couchdb } from "../../common/tools/db";
import { RESPONSE_CODE, ChaincodeResponse } from "fabric-shim";
import { tool } from "../../common/tools/tool";





export class userModel extends baseChaincode {

    static get Instance(): userModel {
        return super.getInstance(new userModel());
    }
    private constructor() {
        super();
    }

    private chaincodeName = "user";








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
