export class log {
    static info(msg: string) {
        const reg = new RegExp(/data:image\/jpg;base64.+?"/);
        if (reg.test(msg)) {
            msg = msg.replace(reg, "photourl");
        }
        if (msg.length > 5000) {
            msg = msg.substring(0, 5000) + '......';
        }
        console.info(`INFO =====================${msg}====================`);
    }
    static log(msg: any) {
        const reg = new RegExp(/data:image\/jpg;base64.+?"/);
        if (reg.test(msg)) {
            msg = msg.replace(reg, "photourl");
        }
        if (msg.length > 5000) {
            msg = msg.substring(0, 5000) + '......';
        }
        console.log(`LOG : =====================${msg}====================`);
    }
    static error(msg: any) {
        console.error(`ERROR : =====================${msg}====================`)
    }

    private static isdebugger = true;
    static debugger(msg: string) {
        if (this.isdebugger) {
            this.info(`debugger ${msg}`);
        }
    }
}