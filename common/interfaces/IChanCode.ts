import { entityType } from "./enums";




export interface IDbKey {



    type: entityType;



    formatDbKey(...values: Array<string | number>): string;
}




export interface IInVokeChainCode {
    chaincodeName: string
}
