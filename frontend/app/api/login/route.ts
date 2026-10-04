import setting from "@/lib/setting";
import { NextResponse } from "next/server";

export async function GET(recest: Request) {
    const appName = setting.app.name;
    console.log(">>>設定ファイル取得:", appName);
    
    return NextResponse.json({
        appName: appName
    });
}