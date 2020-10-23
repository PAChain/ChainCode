import { ICountOnion, IonionGroup } from "../../common/interfaces/IEntitys";



const onionKeys: Array<ICountOnion> = [
    {
        countnumber: "df",
        oniongroup: [
            {
                key: "one",
                values: [
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArmyPQs8JZ7o23D1QpgYua3GQtBBAUyAiBYyWJJae1yjRXXMez4CfiPA3czT48NuaZIMwaR3bBDRKOGtNTLKdht0N4BXIj4t2UKuaXRpYKabK31shDdVep+9N7jz0eAMfGQQs3fS2+r/AdLE5JAMpN/cuWIqTEhwOZnIqoTCtv0l7szYYaifV45ymYCmtlJlqI0ExOEIMfmCOtZK1+tlekOoITfBTKMm5Tqzy9kwsESKJ6Gd82q4S6M73Hb1G1RyKkytUdsYc/xDJoR/K07/v5SAZOsRl3LwNBkCsDPxMAaaaaXcVUafrIKADPBQDJqGhMAc/uMPSihiiZoDSQDxPkwIDAQAB",
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiFZJ3fi5Z4Fv5Dppj+ak6zf6L0oOwTarNPq1lvCxzdnGQbtqOCJv3064BX/QILgZShmgRv007IXVlc/qZkAcGSWeGiWD5AQyqjZR2ZrbAl0LtFNh2o91L8CmhCwtlMFD4g9aMTL06qd6sXb53ZZsEGc+jq2xTShrZ54vY331AG+tP1x8mMvxlTanHMcgAv3IGjE3tyK1X3831sKsFdAjzZhoL9gSDYMjhsy5yDs3f/FccnjRkCiwIJi95D9nkDxzaMv8piDOjl9TvFeQz+CTKwzPGuX8SFHHghijOW83F6CAwD13jObdENtblPeYPw43mAdWXs7jlreD+kxxdBV5lwIDAQAB",
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAssEQ0UXV8/2bVk0EaokRyvc6uwcqrLnbz8Xl4gXmVcyd18yNNvJ/cilSIYqW4ENnYWBAFW/+hUHHd0BTrzoSoIGTccUGKRu01b5HEzlrGKMZPKenXbDcqxTnv9lhbVHT/JXTBgvzF8RKw73Y6Ddu44Uv58/s7BcoGoaTHXPES4OLOavB7Gaz573BBH7h9g7PI5XT3cL1/g6SMBig5GIKCddiMfx09TxcJbA2tH2vyYEdRxws18jEsX8Krt0ywYHrAiwibLEN/3wey3l96OPrA1+WRvcKIoEveIO7pNIemRKXwGrTv9qKTSMZQMS6w9pC9cUZB6p64jxee/Jr0ZgYpQIDAQAB"
                ]
            },
            {
                key: "two",
                values: [
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqboOWpJyoxLZAqkIPVcYhLL4BVLW2D/cUl7rwmJBgH/8cBV2rZU6f+5KQh2/BFvg202E+vEhTRdXiYpf0WEB3O+hRs1XNz8PmyLorOdfM6OKosHlXTQ+pWe7jyHYPOjjZBUg4ggd37BGyZG68ArUTy9Kj6dWNto9DWvKtGUyA9fn61skSqdBfZ5KSizPhl4jw5vyW0w/ShSiO10tDQhXppcLS18y1NXiIN3r+Ppz2KjHILXeqxyPp/DaSM7qop1mvA6YgigqNzlMxaAjBUX2BjHtQW8fTbfurduMeMfWUbxEnSwZ2RRXsBNtotKxaakDdNQvMy8ikgHHN0vs4sr09wIDAQAB",
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6tytCt5EI+VCNfsltpjXtxybLBbL7pGuloFdAgtn4i5YsYa+Krf2kkDq8hvBdIj+c/6U5z/z4urM1izfgttxr3Lj1M2og2X3l0g9ArIYKwbs7IW91ojagl0DHHk00/LbiBhyl0L5RfHtMbXSpn0/drX/W5u+QVKQT42lLFtlaC9NYJlGoV/FYN9SwLOu2tqdFj9UhM3Tj+VOBerFkzxBMf73c8Ep0KPiKr91UMwYFduP8GxvSZgstMLyDPAG751E6qypO2jw7JSDga/qZAb73AxbtglQSM7Sqgh4LmZDwfpR5N5M0YtsQyazChzHMfYSBxzqw9f/Pk8VIn9G8MKPQIDAQAB",
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkLgSSS3pz2gZX4ed7CrrQIDrrysUfhR1RUNRvUWzDya98R9CN0iY7inmokbdKnZZSP8QJqTOcjfrq/7APrCdP3QWEfodKoslYqafE+AbHTsOCNf92L4Pty7qGLaRVAH/IbRWHDy1Ib5+Yc8YRAcC8fbt+4SCcKSDJQgHIEnovX5cn/sA0rYKL4u/VvbMjeoMsleA2WBrA7UYnM7aIMnkSvOZtjuYFIK5rIaTt3JjwZegcsiaZc9XHJ/Mmv8zPBYo1/mWwJKpKIiLW/GiwWvFLb+VXvcOY3UrW1GZC0O25MxyLVMccZk0KFqnnH46UPyIxi8ziA7XXoIJk2jsFBWGjQIDAQAB",
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl2SKcxarQcSIi8JXX8h1hTMN/eYlnbGvt1nUVCtHHwiNC2XAkiyVsCNK9Jv1cEtLjlF7t4QAM8JCG2mDCoQlXaDnc24XNIUdQi9Lx70urZ/RByPDD2vMEu9hTSwE+T9AReiX7WaXmdhIVuOzTccK2b+y7ZGYQDafm3azoWTq2V4t8BjYcIs8A7na06OIKPM310VY+RPnfZW04e24PPO7I784Ia0qPMug1xuJkiqTE/WYOSymJVlvSgUwPGR0byhr3wcsXnlzyS+EhA0y80UnOzRi+/Ig9izIDN0FZoHV7Em1Abst6cvNvM/rQzNPLhWlC0DmjXkRxyTuiv2UCzVKlwIDAQAB"
                ]
            },
            {
                key: "three",
                values: [
                  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmv/O7as558xvsw7MDw8EXseC9XDMk1+0/cj4MdyorbShpOJh+aFW4i0WiAH6OklTplGCNpmVndn2SxlqJde+CyzMHF2lQxnRSyPykV7LAQJMhHRjmJWX27Upezq+0fmPLb/1sz2OdJ9fSPw0XwZi8DR3i3sCx+lxBoH0ktDbRhHcu7pdP8A+b3dgISKWK8PHd68ONkSFAO6cauaa69PkLB/ZyPmFr/Q5e0gGFInQ7ypc0acreeTm4GVVvWJ0Fq0LX6cu+waq1brOEUZe4JfqLDDnzlEld5MA8y1BHwU0IYFBn6/LxAm5q/S2uD/LqwXI3Z96M1WCYbwZPfL3+K4DYwIDAQAB",
                  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsGoZ7wr28dLbqVxfJFUZ7jSjhIq+8J7vTeV+GFgRTghL5AqMzI78cEwcGbGh/2F7mvPi77fHKVOi8F7g797Yu77v/9YyRnWZeces+MBdoUfdKhUmLBwpJwGlnjHBxQDR3GrGQ1G8AxLT6e35tqcKkC4KYTe/23v7eRdCH7MxM6hgFuBC7xThIKrWta7J0vR8avPnELO2Y94kcINYFK8ESlL9HQi5oGMLiUTr2fhe3hzfTk3oFOfkHZv4AEVaQzSSTMq6xkzpN3xPMjtCer1xTUWiuAiL3+ddRPrVL6/2q8ktoRuaToEreZpYkMZXs7WBg+seqr3IwnU/cw0gyHHX7QIDAQAB",
                  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx1TZjy2HsbIEvTB3zjfkybujey8z0HjbLnXTfhSH71huS496km68yH3M/yglYUbfK0YgCfEzUBWGpwOPLQ9nMODUFbJTeb42oouIH17RU3GLpQypLAvuM9olhASyMrba8YiiD+RBii2EOQPp6WWfVlL60fRlzW2qHPyqWojMrRhG9lPN1dZcwwpgUiJHL3c9AsdgkIS+XVucuNZW2ISFMvjC2i4uqUAfjNZt1CW1+uiZ2OoixgqfaBOrN6hU4kZD2OZ2n2WJGggYINWasTyaIJnkzOZTP1Bg5c1Q0f8MCwghq6NKHCbGnSEx0p187/+WXIthUzDP2D7N5Qw3oOfUjQIDAQAB"
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
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArmyPQs8JZ7o23D1QpgYua3GQtBBAUyAiBYyWJJae1yjRXXMez4CfiPA3czT48NuaZIMwaR3bBDRKOGtNTLKdht0N4BXIj4t2UKuaXRpYKabK31shDdVep+9N7jz0eAMfGQQs3fS2+r/AdLE5JAMpN/cuWIqTEhwOZnIqoTCtv0l7szYYaifV45ymYCmtlJlqI0ExOEIMfmCOtZK1+tlekOoITfBTKMm5Tqzy9kwsESKJ6Gd82q4S6M73Hb1G1RyKkytUdsYc/xDJoR/K07/v5SAZOsRl3LwNBkCsDPxMAaaaaXcVUafrIKADPBQDJqGhMAc/uMPSihiiZoDSQDxPkwIDAQAB",
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAssEQ0UXV8/2bVk0EaokRyvc6uwcqrLnbz8Xl4gXmVcyd18yNNvJ/cilSIYqW4ENnYWBAFW/+hUHHd0BTrzoSoIGTccUGKRu01b5HEzlrGKMZPKenXbDcqxTnv9lhbVHT/JXTBgvzF8RKw73Y6Ddu44Uv58/s7BcoGoaTHXPES4OLOavB7Gaz573BBH7h9g7PI5XT3cL1/g6SMBig5GIKCddiMfx09TxcJbA2tH2vyYEdRxws18jEsX8Krt0ywYHrAiwibLEN/3wey3l96OPrA1+WRvcKIoEveIO7pNIemRKXwGrTv9qKTSMZQMS6w9pC9cUZB6p64jxee/Jr0ZgYpQIDAQAB",
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6tytCt5EI+VCNfsltpjXtxybLBbL7pGuloFdAgtn4i5YsYa+Krf2kkDq8hvBdIj+c/6U5z/z4urM1izfgttxr3Lj1M2og2X3l0g9ArIYKwbs7IW91ojagl0DHHk00/LbiBhyl0L5RfHtMbXSpn0/drX/W5u+QVKQT42lLFtlaC9NYJlGoV/FYN9SwLOu2tqdFj9UhM3Tj+VOBerFkzxBMf73c8Ep0KPiKr91UMwYFduP8GxvSZgstMLyDPAG751E6qypO2jw7JSDga/qZAb73AxbtglQSM7Sqgh4LmZDwfpR5N5M0YtsQyazChzHMfYSBxzqw9f/Pk8VIn9G8MKPQIDAQAB"
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
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiFZJ3fi5Z4Fv5Dppj+ak6zf6L0oOwTarNPq1lvCxzdnGQbtqOCJv3064BX/QILgZShmgRv007IXVlc/qZkAcGSWeGiWD5AQyqjZR2ZrbAl0LtFNh2o91L8CmhCwtlMFD4g9aMTL06qd6sXb53ZZsEGc+jq2xTShrZ54vY331AG+tP1x8mMvxlTanHMcgAv3IGjE3tyK1X3831sKsFdAjzZhoL9gSDYMjhsy5yDs3f/FccnjRkCiwIJi95D9nkDxzaMv8piDOjl9TvFeQz+CTKwzPGuX8SFHHghijOW83F6CAwD13jObdENtblPeYPw43mAdWXs7jlreD+kxxdBV5lwIDAQAB",
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqboOWpJyoxLZAqkIPVcYhLL4BVLW2D/cUl7rwmJBgH/8cBV2rZU6f+5KQh2/BFvg202E+vEhTRdXiYpf0WEB3O+hRs1XNz8PmyLorOdfM6OKosHlXTQ+pWe7jyHYPOjjZBUg4ggd37BGyZG68ArUTy9Kj6dWNto9DWvKtGUyA9fn61skSqdBfZ5KSizPhl4jw5vyW0w/ShSiO10tDQhXppcLS18y1NXiIN3r+Ppz2KjHILXeqxyPp/DaSM7qop1mvA6YgigqNzlMxaAjBUX2BjHtQW8fTbfurduMeMfWUbxEnSwZ2RRXsBNtotKxaakDdNQvMy8ikgHHN0vs4sr09wIDAQAB",
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkLgSSS3pz2gZX4ed7CrrQIDrrysUfhR1RUNRvUWzDya98R9CN0iY7inmokbdKnZZSP8QJqTOcjfrq/7APrCdP3QWEfodKoslYqafE+AbHTsOCNf92L4Pty7qGLaRVAH/IbRWHDy1Ib5+Yc8YRAcC8fbt+4SCcKSDJQgHIEnovX5cn/sA0rYKL4u/VvbMjeoMsleA2WBrA7UYnM7aIMnkSvOZtjuYFIK5rIaTt3JjwZegcsiaZc9XHJ/Mmv8zPBYo1/mWwJKpKIiLW/GiwWvFLb+VXvcOY3UrW1GZC0O25MxyLVMccZk0KFqnnH46UPyIxi8ziA7XXoIJk2jsFBWGjQIDAQAB"
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
