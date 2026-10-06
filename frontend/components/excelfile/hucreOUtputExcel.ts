import fs from "fs/promises";
import path from "path";
import {
    insertRows,
    copyRange,
} from "hucre";

import {
    openXlsx,
    saveXlsx,
} from "hucre/xlsx";

type ExcelRowData = {
    name: string;
    age: number;
    department: string;
};

// Excelテンプレートの指定行を指定行数コピーして出力
export const outputExcel = async (
    data: ExcelRowData[],
) => {
    // テンプレートファイルを読み込み
    const tempPath = path.join(
            process.cwd(),
            "lib",
            "ExcelFile",
            "template.xlsx"
        );

    const templateBuffer = await fs.readFile(tempPath);
    const workBook = await openXlsx(templateBuffer);

    // 1つ目のシートを使用
    const sheet = workBook.sheets[0];

    if (!sheet) {
        throw new Error("Excelシート取得に失敗しました。");
    }

    // コピー元行以降に行を追加
    const sourceRow = 1; // 2行目をコピー元行として指定
    const copyCount = data.length; // コピー行数

    if (copyCount > 1) {
        insertRows(
            sheet,
            sourceRow + 1,
            copyCount - 1,
        );
    }

    // コピー元行を各行へコピー(A列からC列)
    for (let i = 1; i < copyCount; i++) {
        const targetRow = sourceRow + i;

        copyRange(
            sheet,
            `A${sourceRow + 1}:C${sourceRow + 1}`,
            `A${targetRow + 1}:C${targetRow + 1}`,
        );
    }

    // データを設定
    for (let i = 0; i < data.length && i < copyCount; i++) {
        const row = sourceRow + i;

        sheet.rows[row][0] = data[i].name;
        sheet.rows[row][1] = data[i].age;
        sheet.rows[row][2] = data[i].department;
    }

    // Excelとして保存
    const outputBuffer = await saveXlsx(workBook);

    return outputBuffer;
}
