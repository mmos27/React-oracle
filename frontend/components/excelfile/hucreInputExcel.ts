"use client";

import { readXlsx } from "hucre/xlsx";

/**
 * Excelから取得する1行分のデータ
 */
export type ExcelRowData = {
    name: string;
    age: number;
    department: string;
};

/**
 * Excelファイルを読み込み
 */
export const readExcel = async (
    file: File
): Promise<ExcelRowData[]> => {
    // ExcelファイルをArrayBufferとして取得
    const arrayBuffer =
        await file.arrayBuffer();

    // ArrayBufferをUint8Arrayへ変換
    const buffer = new Uint8Array(arrayBuffer);

    // hucreでExcelを読み込む
    const workbook = await readXlsx(buffer);

    // シートの存在を確認
    if (
        !workbook.sheets ||
        workbook.sheets.length === 0
    ) {
        throw new Error(
            "Excelにシートが存在しません。"
        );
    }

    // 先頭シートを取得
    const worksheet =
        workbook.sheets[0];

    // Excelの行データを取得
    const rows =
        worksheet.rows;

    console.log(
        "Excel読み込み結果:",
        rows
    );

    // 1行目はヘッダーなので除外
    const outputData: ExcelRowData[] =
        rows
            .slice(1)
            .filter((row) => {
                // 空行を除外
                return row.some(
                    (value) =>
                        value !== null &&
                        value !== undefined &&
                        value !== ""
                );
            })
            .map((row) => {
                return {
                    name: String(
                        row[0] ?? ""
                    ),

                    age: Number(
                        row[1] ?? 0
                    ),

                    department: String(
                        row[2] ?? ""
                    ),
                };
            });

    // 呼び出し側へ返す
    return outputData;
};