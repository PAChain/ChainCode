
import * as path from "path"
import * as fs from "fs"

export class fileHelper {




    public static getjsonData<T>(jsonpath: string): Array<T> {
        const tempPath = path.join(__dirname,"../../", jsonpath);
        const electionDataJson = fs.readFileSync(tempPath, 'utf8');
        return JSON.parse(electionDataJson);
    }
}
