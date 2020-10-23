import { entityType, party } from "./enums";
import { Interface } from "readline";

export interface IAction {
    chaincode: string;
    action: string;
    params: any[]
}

export interface IEntityBase {
    type: entityType;
}



export interface IResult {
    ret: boolean;
    msg?: string;
    data?: any;
}

export interface IPaging {



    pageCount: number;



    bookMark: string;
}




export interface IUser extends IEntityBase {
    voterid: string;
    publickey: string;
    precinctid: number;
    name: string;
    state?: string;
    county?: string;
    city?: string;
    party: string;
}





export interface ICandidate extends IEntityBase {
    candidateid: number;
    name: string;
    party: party;
    photo: string;
}
export interface ICandidateshort {
    id: number;
    name: string;
}





export interface IElection extends IEntityBase {
    electionid: number;
    electionyear: number;
    electiondate: string;
    electionname: string;
    electionstate: string;
}

export interface ISeat extends IEntityBase {
    seatid: number;
    number: string;
    name: string;
    office: string;
    state: string;
    county: string;
    city: string;



    level: string;
    candidateids: Array<number>;
}

export interface IElectionSeat extends IEntityBase {
    electionid: number;
    seatids: Array<number>;
}

export interface IPrecinct extends IEntityBase {
    precinctid: number;
    state: string;
    county: string;
    precinctno: string;
    name: string;
    congress: string;
    house: string;
    senate: string;
    countycommission: string;
    schoolboard: string;
    municipality: string;
}

export interface IPrecinctSeats extends IEntityBase {
    seatid: number;
    precinctids: Array<number>;
}

export interface IBallotSeats {
    seat?: ISeat,
    candidates?: Array<ICandidate>
}

export interface IBallotElection {
    election?: IElection,
    seats?: Array<IBallotSeats>
}




export interface IBallot extends IEntityBase {
    ballotname?: string;
    ballotdate?: string;
    elections?: Array<IBallotElection>;
}

export interface IUserBallot extends IBallot {
    userkey: string;
    ballotno: string;
    isvoted: boolean,
    votingdate: string;
    isopenvoting: boolean,
    isconfirm: boolean,
    confirmdate: string
}




export interface IVote extends IEntityBase {



    votingnumber: string;



    county?: string;



    onionkey: string;



    packages: string;
}





export interface IVotedPackage {



    userkey: string;



    onionkey: string;



    ballotnumber: string;



    originalpackage: string;




    decodepackages: Array<string>;

}





export interface ICountOnion {
    countnumber: string;
    oniongroup: Array<IonionGroup>
}



export interface IonionGroup {
    key: string;
    values: string[]
}






export interface IDeCodeVoted extends IVote {



    encodekey?: string;
}





export interface ICleartextVoted {

    publicKey: string;
    verificationCode: string;
    votingData: Array<ICleartextVotedData>,
    votingDate: string;
}



export interface ICleartextVotedData {
    electionID: number;
    seatID: number;
    candidates: Array<ICandidateshort>;
}




export interface IStatistic {


}
