import { ICountOnion, IonionGroup } from "../../common/interfaces/IEntitys";



const onionKeys: Array<ICountOnion> = [
    {
        countnumber: "df",
        oniongroup: [
            {
                key: "one",
                values: [
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEIjstJ13YGk7wEwceq3y2Z6dnIcG3UKkpfsW8nHjChb2UZe3dHsynyNsw9WyH1Mggtsdz20wQiYLlWCMz1+xDyA==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8wguRljKr17vyc+XN10IYS3AiPomuZFV3DsXwxxtOXnv3tcPCHxIEEGEdT0Oed6Tr7XTvjceGivcfb30e1itPg==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEpK/Oy/YOYyOE/BQr4QuARAy7WyZA70gl1jUxpflsFwH8uPwktpYQX02xH64/5Pu4VmehGpqrBCuAoR8snaEhEg=="
                ]
            },
            {
                key: "two",
                values: [
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEjtiFcWa0aU4V2nZ5FqjF6Ej6i885Cjw0o6mE5S0tk45ODMXkuUqtLD6lvSNyIZ7U2dZ+Lapm4gnwbCzEKqQpGQ==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEGl+4G9S5H1QTMiOoljFugJ93xGVgiB+/i88y+GZCqkD9vFAkJDJsbccl+jYAKPLLSF3p1YARScnRZO9qsHP4Fg==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEt46Vq7Quop0K6Caw6nrAx4m0I7iwn8GhBr5rbQn8MfXidOvYyU/DdfRX2Xdc9IqWPDVVIUlnIK4+2H0Y6Y+rKg==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEUgGST0Us8Bkzwafam4SiACLYAcEYjFXx+9De3klR0HCxC2T9wgFOsy/UZnrwCM7Hcrx2Hvj3lWyMjxwrDsuu9w=="
                ]
            },
            {
                key: "three",
                values: [
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWFSO6eb+Uq6i/RtC7VR9rLSvCqvvOKYlIp36AdvGVyYmPoMzoHlZGEWlWBSsUv0OnwmM1I3+B+hdWwNLyvldPQ==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEXPOO57QfEiIT8UOg8ZI263XOIITwnvp3PvdFTbqZfVuMK3MAqGz+UFLt+O4ihCgvJr3hNWlqf33p9KCd2QRfUQ==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEwOx6RDbTmAGv6lB83PQFwaoKp7Ha/pPJLHxh/yDxoR9bRkdNYGeEe2sWHyKExS0R4rjlKBs8rJLtZMbBaxD5OQ=="
                ]
            }
        ]
    },
    {
        countnumber: "12011",
        oniongroup: [
            {
                key: "one",
                values: [
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8wguRljKr17vyc+XN10IYS3AiPomuZFV3DsXwxxtOXnv3tcPCHxIEEGEdT0Oed6Tr7XTvjceGivcfb30e1itPg==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEpK/Oy/YOYyOE/BQr4QuARAy7WyZA70gl1jUxpflsFwH8uPwktpYQX02xH64/5Pu4VmehGpqrBCuAoR8snaEhEg==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEjtiFcWa0aU4V2nZ5FqjF6Ej6i885Cjw0o6mE5S0tk45ODMXkuUqtLD6lvSNyIZ7U2dZ+Lapm4gnwbCzEKqQpGQ=="
                ]
            }
        ]
    }
    ,
    {
        countnumber: "51107",
        oniongroup: [
            {
                key: "one",
                values: [
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEjtiFcWa0aU4V2nZ5FqjF6Ej6i885Cjw0o6mE5S0tk45ODMXkuUqtLD6lvSNyIZ7U2dZ+Lapm4gnwbCzEKqQpGQ==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEt46Vq7Quop0K6Caw6nrAx4m0I7iwn8GhBr5rbQn8MfXidOvYyU/DdfRX2Xdc9IqWPDVVIUlnIK4+2H0Y6Y+rKg==",
                    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWFSO6eb+Uq6i/RtC7VR9rLSvCqvvOKYlIp36AdvGVyYmPoMzoHlZGEWlWBSsUv0OnwmM1I3+B+hdWwNLyvldPQ=="
                ]
            }
        ]
    }
]
export class onionModel {
    static getonionGroup(countnumber: string): Array<IonionGroup> {
        if (countnumber && countnumber.length == 0) {
            countnumber = "df";
        }
        let onion: ICountOnion = onionKeys.first(a => a.countnumber == countnumber);
        if (onion == undefined) {
            onion = onionKeys.first(a => a.countnumber == "df");
        }
        if (onion) {
            return onion.oniongroup;
        }
        else {
            return [];
        }
    }
}
