
import * as crypto from 'crypto';
import { ChaincodeResponse } from 'fabric-shim';
import { IResult } from '../interfaces/IEntitys';
import { log } from './log';
export class tool {
    static md5(value: string) {
        var md5 = crypto.createHash('md5');
        return md5.update(value).digest('hex');
    }





    static getPartyShort(party: string): string {
        let short = "O";
        if (party) {
            party = party.toString().toLowerCase();
        }

        switch (party) {
            case "d":
            case "democratic":
                short = "D";
                break;
            case "r":
            case "republican":
                short = "R";
                break;
            default:
                short = "O"
                break;
        }
        return short;
    }






    static ConvertChaincodeResponseToResult(respone: ChaincodeResponse): IResult {
        log.debugger(`convert result: ${JSON.stringify(respone)}`)
        let data: IResult = { ret: false };
        if (respone.status == 200) {
            const json = Buffer.from(respone.payload).toString("utf8");
            data = JSON.parse(json);
        }
        else {
            log.error(respone.message);
        }
        return data;
    }

    




     static cloneObject(data: any) {
        return JSON.parse(JSON.stringify(data));
    }
}
