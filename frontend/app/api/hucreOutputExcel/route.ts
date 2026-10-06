import { NextResponse } from "next/server";

import {
    outputExcel,
    type ExcelRowData,
} from "@/components/excelfile/output";


export async function POST() {
    try {
        // Excelへ出力するデータ
        const outputData: ExcelRowData[] = [
            {
                name: "name1",
                age: 22,
                department: "test1",
            },
            {
                name: "name2",
                age: 23,
                department: "test2",
            },
        ];

        // Excel作成
        const excelBuffer = await outputExcel(outputData);

        // ブラウザへExcelを返す
        return new NextResponse(
            excelBuffer as BodyInit,
            {
                status: 200,
                headers: {
                    "Content-Type":
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

                    "Content-Disposition":
                        'attachment; filename="output.xlsx"',
                },
            },
        );

    } catch (error) {

        console.error(
            "Excel出力エラー:",
            error,
        );

        return NextResponse.json(
            {
                message:
                    "Excelの出力に失敗しました。",
            },
            {
                status: 500,
            },
        );
    }
}
