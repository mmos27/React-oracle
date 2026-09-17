import { readFileSync } from "fs";

type Config = {
    app: {
        name: string;
        port: number;
    };
    oracle: {
        host: string;
        port: number;
        serviceName: string;
        user: string;
    };
}

// 設定ファイルパス
const SETTINGFILEPATH = "/config/setting.json";

function loadSetting(): Config {
    const file = readFileSync(SETTINGFILEPATH, "utf-8");

    return JSON.parse(file) as Config;
}

const setting = loadSetting();

export default setting;
