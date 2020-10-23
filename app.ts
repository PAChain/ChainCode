import * as fs from "fs"
import * as path from "path";

const common = "common";
const user = "user";
const ballot = "ballot";
const vote = "voted";
const chaincode = "chaincode";
if (fs.existsSync(path.join(__dirname, common))) {
    console.log(true);
}

deleteFolderRecursive(path.join(__dirname, "..", chaincode));
copy(path.join(__dirname, common), path.join(__dirname, "..", chaincode, user, common));

copy(path.join(__dirname, user), path.join(__dirname, "..", chaincode, user, "src"));
copyFile(path.join(__dirname, "..", "packagebak.json"), path.join(__dirname, "..", chaincode, user, "package.json"));
copyFile(path.join(__dirname, "..", "package-lock.json"), path.join(__dirname, "..", chaincode, user, "package-lock.json"));
copyFile(path.join(__dirname, "..", "tslint.json"), path.join(__dirname, "..", chaincode, user, "tslint.json"));



copy(path.join(__dirname, common), path.join(__dirname, "..", chaincode, ballot, common));
copy(path.join(__dirname, "..", "data"), path.join(__dirname, "..", chaincode, ballot, "data"));
copy(path.join(__dirname, ballot), path.join(__dirname, "..", chaincode, ballot, "src"));
copyFile(path.join(__dirname, "..", "packagebak.json"), path.join(__dirname, "..", chaincode, ballot, "package.json"));
copyFile(path.join(__dirname, "..", "package-lock.json"), path.join(__dirname, "..", chaincode, ballot, "package-lock.json"));
copyFile(path.join(__dirname, "..", "tslint.json"), path.join(__dirname, "..", chaincode, ballot, "tslint.json"));





copy(path.join(__dirname, common), path.join(__dirname, "..", chaincode, vote, common));
copy(path.join(__dirname, vote), path.join(__dirname, "..", chaincode, vote, "src"));
copyFile(path.join(__dirname, "..", "packagebak.json"), path.join(__dirname, "..", chaincode, vote, "package.json"));
copyFile(path.join(__dirname, "..", "package-lock.json"), path.join(__dirname, "..", chaincode, vote, "package-lock.json"));
copyFile(path.join(__dirname, "..", "tslint.json"), path.join(__dirname, "..", chaincode, vote, "tslint.json"));







function copy(from, to) {
    const fromPath = path.resolve(from);
    const toPath = path.resolve(to)
    if (!fs.existsSync(toPath)) {
        mkdirsSync(toPath);
    }
    fs.access(toPath, function (err) {
        if (err) {
            fs.mkdirSync(toPath)
        }
    })
    fs.readdir(fromPath, function (err, paths) {
        if (err) {
            console.log(err)
            return
        }
        paths.forEach(function (item) {
            const newFromPath = fromPath + '/' + item
            const newToPath = path.resolve(toPath + '/' + item)

            fs.stat(newFromPath, function (err, stat) {
                if (err) return
                if (stat.isFile()) {
                    copyFile(newFromPath, newToPath)

                }
                if (stat.isDirectory()) {
                    copy(newFromPath, newToPath)
                }
            })
        })
    })
}

function copyFile(from, to) {
    fs.copyFileSync(from, to);
}

function mkdirsSync(dirname, mode?) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname), mode)) {
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
}



function deleteFolderRecursive(url) {
    var files = [];



    if (fs.existsSync(url)) {



        files = fs.readdirSync(url);
        files.forEach(function (file, index) {

            var curPath = path.join(url, file);



            if (fs.statSync(curPath).isDirectory()) { 
                deleteFolderRecursive(curPath);

            } else {
                fs.unlinkSync(curPath);
            }
        });



        fs.rmdirSync(url);
    } else {

    }
}
