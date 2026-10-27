import { selWork } from "@/sql/LoveLiveCardSimulator/CardInfo/CardRegister/selectWork";
import { serializeWorkbook } from "hucre";
import { NextResponse } from "next/server";

export async function GET(recest: Request) {
    // console.log(">>>設定ファイル取得:", appName);
    
    // return NextResponse.json({
    //     appName: appName
    // });

    const selWorkResult = await selWork();

    return NextResponse.json({
        work: selWorkResult,
    });
}