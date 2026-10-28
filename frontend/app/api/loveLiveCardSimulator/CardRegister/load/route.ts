import { selALlCharacter } from "@/sql/LoveLiveCardSimulator/CardInfo/CardRegister/selectAllCharacter";
import { selAllUnit } from "@/sql/LoveLiveCardSimulator/CardInfo/CardRegister/selectAllUnit";
import { selAllWork } from "@/sql/LoveLiveCardSimulator/CardInfo/CardRegister/selectAllWork";
import { NextResponse } from "next/server";

export async function GET(recest: Request) {
    const selWorkResult = await selAllWork();
    const selUnitResult = await selAllUnit();
    const selCharacterResult = await selALlCharacter();

    return NextResponse.json({
        work: selWorkResult,
        unit: selUnitResult,
        character: selCharacterResult,
    });
}