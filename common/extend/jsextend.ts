


interface Array<T> {

    addexists(item: T): Array<T>;

    removeIndex(index: number): Array<T>;

    remove(item: T): Array<T>;
    remove(callbackfn: (value: T, index: number, array: T[]) => any): Array<T>;
    clear();

    first(params: any): T;





    first(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T;

    where(params: any): Array<T>;

    getParam(params: any, char: string): string;

    exists(params: any): boolean;

    groupBy<T>(params: any): Array<{ Key: string, Value: any }>;
    removeParam(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T;
    removeArrayParam(params: any): Array<T>;


    replace(callbackfn: (value: T, index: number, array: T[]) => any, newItem: T);
}



interface String {
    ToString(fmt: string): string;
    toDate(): Date;
    IsNullOrEmpty(): boolean;
    toXmlEncoding(): string;
    toXmlDecoding(): string;
    format(...args: Array<string | number>): string;
    format(args: Array<string | number>): string;
}
interface StringConstructor {
    IsNullOrEmpty(value: string): boolean;
}

interface Date {
    Format(fmt: string): string;

    ToString(fmt: string): string;

    addSeconds(value: number): Date;
    addMinutes(value: number): Date;
    addHours(value: number): Date;
    addDays(value: number): Date;
    addMonths(value: number): Date;
    addYears(value: number): Date;
}






String.prototype.ToString = function (fmt) {
    var date = this.toDate();
    return date.Format(fmt);
}

String.prototype.toDate = function () {
    var jsondate = this;
    jsondate = jsondate.replace("/Date(", "").replace(")/", "");
    if (jsondate.indexOf("+") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("+"));
    }
    else if (jsondate.indexOf("-") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("-"));
    }
    var date = new Date(parseInt(jsondate, 10));
    return date;
}
String.IsNullOrEmpty = function (value) {
    if (value == undefined)
        return true;
    return value.IsNullOrEmpty();
}

String.prototype.IsNullOrEmpty = function () {
    var bool = false;
    var s = this;
    if (s == undefined) {
        bool = true;
    }
    s = s.replace(/^\s+|\s+$/gm, '');
    if (s.length == 0) {
        bool = true;
    }
    return bool;
}


Date.prototype.Format = function (fmt: string) {
    var d: Date = this;

    let zeroize = function (value: number | string, length?: number) {

        if (!length) length = 2;

        value = String(value);

        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }

        return zeros + value;

    };
    return fmt.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\/1?|[lLZ])\b/ig, ($0) => {

        let value: string | number = "";
        switch ($0) {

            case 'd':
                value = d.getDate();

            case 'dd':
                value = zeroize(d.getDate());

            case 'ddd':
                value = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];

            case 'dddd':
                value = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];

            case 'M':
                value = d.getMonth() + 1;

            case 'MM':
                value = zeroize(d.getMonth() + 1);

            case 'MMM':
                value = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];

            case 'MMMM':
                value = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];

            case 'yy':
                value = String(d.getFullYear()).substr(2);

            case 'yyyy':
                value = d.getFullYear();

            case 'h':
                value = d.getHours() % 12 || 12;

            case 'hh':
                value = zeroize(d.getHours() % 12 || 12);

            case 'H':
                value = d.getHours();

            case 'HH':
                value = zeroize(d.getHours());

            case 'm':
                value = d.getMinutes();

            case 'mm':
                value = zeroize(d.getMinutes());

            case 's':
                value = d.getSeconds();

            case 'ss':
                value = zeroize(d.getSeconds());

            case 'l':
                value = zeroize(d.getMilliseconds(), 3);

            case 'L':
                var m = d.getMilliseconds();

                if (m > 99) m = Math.round(m / 10);

                value = zeroize(m);

            case 'tt':
                value = d.getHours() < 12 ? 'am' : 'pm';

            case 'TT':
                value = d.getHours() < 12 ? 'AM' : 'PM';

            case 'Z':
                value = d.toUTCString().match(/[A-Z]+$/)[0];



            default:
                value = $0.substr(1, $0.length - 2);

        }
        return value.toString();
    });
}
Date.prototype.ToString = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(), 
        "H+": this.getHours(), 
        "m+": this.getMinutes(), 
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds() 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Date.prototype.addSeconds = function (value) {
    this.setSeconds(this.getSeconds() + value);
    return this;
}
Date.prototype.addMinutes = function (value) {
    this.setMinutes(this.getMinutes() + value);
    return this;
}
Date.prototype.addHours = function (value) {
    this.setHours(this.getHours() + value);
    return this;
}
Date.prototype.addDays = function (value) {
    this.setDate(this.getDate() + value);
    return this;
}
Date.prototype.addMonths = function (value) {
    this.setMonth(this.getMonth() + 1 + value);
    return this;
};
Date.prototype.addYears = function (value) {
    this.setFullYear(this.getFullYear() + 1 + value);
    return this;
};





Array.prototype.addexists = function (a) {
    if (this.indexOf(a) == -1) {
        this.push(a);
    }
    return this;
}

Array.prototype.removeIndex = function (index) {
    var temp = this.slice(0, this.length);
    temp.splice(index, 1);
    return temp;
}

Array.prototype.remove = function (a) {
    if (a == undefined) {
        return false;
    }
    var index = -1;
    var type = typeof (a);
    if (type === 'function') {
        for (var i = 0, item; item = this[i], i < this.length; i++) {
            if (a(item, i, this)) {
                index = i;
            }
        }
    } else {
        index = this.indexOf(a);

    }
    if (index > -1) {
        this.splice(index, 1);
    }
    return this;
}

Array.prototype.clear = function () {
    this.splice(0, this.length);
}

Array.prototype.removeParam = function (params) {
    this.remove(this.first(params));
}

Array.prototype.removeArrayParam = function (params) {
    var list = this.getArray(params);
    for (var i = 0; i < list.length; i++) {
        this.remove(list[i]);
    }
    return this;
}

Array.prototype.first = function (a) {
    if (a == undefined) {
        return false;
    }
    var type = typeof (a);
    var _item = undefined;
    var params = [];
    var fun: Function = function () { };
    var bool = false;
    for (var i = 0, item; item = this[i], i < this.length; i++) {
        if (type === "function") {
            fun = a;
            if (fun(item, i, this)) {
                _item = item;
                break;
            }
        }
        else {
            params = a;
            for (var pm in params) {
                if (item[pm] == params[pm]) {
                    bool = true;
                }
                else {
                    bool = false;
                    break;
                }
            }
            if (bool == true) {
                _item = item;
                break;
            }
        }
    }
    return _item;
}




Array.prototype.where = function (params) {
    if (params == undefined) {
        return [];
    }
    var temp = new Array();
    var bool = false;
    for (var i = 0, item; item = this[i], i < this.length; i++) {
        if (typeof (params) == "function") {
            bool = params(item);
        }
        else {
            for (var pm in params) {

                if (item[pm] == params[pm]) {
                    bool = true;
                }
                else {
                    bool = false;
                    break;
                }
            }
        }
        if (bool == true) {
            temp.push(item);
        }
    }
    return temp;
}


Array.prototype.replace = function (fun, newitem) {
    if (fun == undefined || newitem == undefined) {
        return;
    }
    var index = -1;
    for (var i = 0, item; item = this[i], i < this.length; i++) {
        if (fun(item, i, this)) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        this.splice(index, 1, newitem);
    }
}


Array.prototype.getParam = function (pm, char) {
    if (pm == undefined || pm.length <= 0) {
        return '';
    }
    var listpm = new Array();
    for (var i = 0, item; item = this[i], i < this.length; i++) {
        listpm.push(item[pm]);
    }
    char = char == undefined ? ',' : char;
    return listpm.join(char);
}

Array.prototype.exists = function (params) {
    var tmp = this.first(params);
    if (tmp != undefined) {
        return true;
    }
    else {
        return false;
    }
}




Array.prototype.groupBy = function (f) {
    var groups = {};
    this.forEach(function (o) {
        var group = "";
        if (typeof (f) == "function") {
            group = f(o);
        }
        else {
            group = o[f];
        }
        var type = typeof (group);
        switch (type) {
            case 'number':
                group = group.toString();
                break;
            case 'boolean':
                group = group.toString();
                break;
        }
        group = String.IsNullOrEmpty(group) ? '' : group;
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return {
            Key: group,
            Value: groups[group]
        };
    });
}





String.prototype.toXmlEncoding = function () {
    var value = this;
    if (value == undefined || value.length <= 0 || typeof (value) != "string") {
        return "";
    }
    value = value.replace("\v", "&#xb;");
    value = value.replace("\f", "&#xc;");
    value = value.replace("\a", "&#x7;");
    value = value.replace("\b", "&#x8;");
    value = value.replace("&", "&amp;");
    value = value.replace("<", "&lt;");
    value = value.replace(">", "&gt;");
    value = value.replace("'", "&apos;");
    value = value.replace('"', "&quot;");
    return value;
}

String.prototype.toXmlDecoding = function () {
    var value = this;
    if (value == undefined || value.length <= 0 || typeof (value) != "string") {
        return "";
    }
    value = value.replace("&lt;", "<");
    value = value.replace("&gt;", ">");
    value = value.replace("&apos;", "'");
    value = value.replace("&quot;", '"');
    value = value.replace("&amp;", "&");
    value = value.replace("&#xb;", "\v");
    value = value.replace("&#xc;", "\f");
    value = value.replace("&#x7;", "\a");
    value = value.replace("&#x8;", "\b");
    return value;
}


String.prototype.format = function (args: any) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && !Array.isArray(args) && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key].toString());
                }
            }
        }
        else {
            let tempargs: Array<any> = [];
            if (Array.isArray(args)) {
                tempargs = args;
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    tempargs.push(arguments[i])
                }
            }

            if (Array.isArray(args)) {
                tempargs = args;
            }
            for (var i = 0; i < tempargs.length; i++) {
                if (tempargs[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, tempargs[i]);
                }
            }
        }
    }
    return result;
}


