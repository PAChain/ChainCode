require("../common/extend/jsextend");
import { Contract, Context } from "fabric-contract-api";
import { userChaincode } from "./chaincode/user";
import { baseChaincode, log } from "../common/basechaincode";
import { IUser, IResult, IPaging } from "../common/interfaces/IEntitys";
import { couchdb } from "../common/tools/db";
import { baseapp } from "../common/baseapp";




export class app extends baseapp {
    constructor() {
        super();
    }
    result: IResult;
    chainlist: Array<baseChaincode> = [];



    public async initLedger(ctx: Context) {
        this.chainlist = [
            userChaincode.Instance,
        ];
        this.updateCtx(ctx);
        console.log("========================= User ============================")
    }

    async init(ctx: Context) {
        this.updateCtx(ctx);


        return true;
    }







    public async verifyUser(ctx: Context, username: string): Promise<IResult> {
        this.updateCtx(ctx);
        const exist = await userChaincode.Instance.existUser(username);
        return {
            ret: exist
        }
    }



    public async registerUser(ctx: Context, userjson: string): Promise<IResult> {
        this.updateCtx(ctx);
        try {
            log.debugger(userjson);
            const useritem: IUser = JSON.parse(userjson);
            const data: boolean = await userChaincode.Instance.registerUser(useritem);
            this.result.ret = true;
        }
        catch (error) {
            this.result.msg = error.message;
        }
        return this.result;
    }






    public async queryUser(ctx: Context, userkey: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: IUser = await userChaincode.Instance.queryUser(userkey);
        return {
            ret: true,
            data: data
        }
    }






    public async queryUsers(ctx: Context, pagesize: number, bookmark: string): Promise<IResult> {
        this.updateCtx(ctx);
        const data: { page: IPaging, data: Array<IUser> } = await userChaincode.Instance.queryUsers(pagesize, bookmark);
        return {
            ret: true,
            data: data
        };
    }




    public async queryAllUsers(ctx: Context): Promise<IResult> {
        this.updateCtx(ctx);
        const data: Array<IUser> = await userChaincode.Instance.queryAllUsers();
        return {
            ret: true,
            data: data
        }
    }





    public async getUserStatistic(ctx: Context): Promise<IResult> {
        this.updateCtx(ctx);
        const data = await userChaincode.Instance.getUserStatistic();
        return {
            ret: true,
            data: data
        }
    }



    private updateCtx(ctx: Context) {
        couchdb.Instance.ctx = ctx;
        for (let i = 0; i < this.chainlist.length; i++) {
            this.chainlist[i].result = { ret: false };
        }
        log.log("update ctx");
        this.result = { ret: false }
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

}
process.on('uncaughtException', function (err) {

    log.error(err);

    log.error(err.stack);
});
