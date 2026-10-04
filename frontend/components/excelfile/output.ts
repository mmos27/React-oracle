import fs from "fs";
import * as XLSX from "xlsx-js-style";
import path from "path";

// Excelへ出力するデータ
export type ExcelRowData = {
    name: string;
    age: number;
    department: string;
};

/**
 * Excelの空セル
 */
type EmptyExcelCell = {
    t: "z";
    v?: undefined;
};

/**
 * Excelセル
 */
type ExcelCell = XLSX.CellObject | EmptyExcelCell;

/**
 * 空のExcelセルを作成する
 */
const createEmptyCell = (): EmptyExcelCell => {
    return {
        t: "z",
    };
};

/**
 * SheetJSで読み込んだスタイルを
 * xlsx-js-styleで書き込める形式へ変換する
 */
const convertStyle = (sourceStyle: any) => {
    if (!sourceStyle) {
        return undefined;
    }

    const style: any = {};

    // ========================================
    // 背景色・塗りつぶし
    // ========================================

    if (
        sourceStyle.patternType ||
        sourceStyle.fgColor ||
        sourceStyle.bgColor
    ) {
        style.fill = {
            patternType:
                sourceStyle.patternType,
            fgColor:
                sourceStyle.fgColor,
            bgColor:
                sourceStyle.bgColor,
        };
    }

    // ========================================
    // 罫線
    // ========================================

    if (sourceStyle.border) {
        style.border = {
            ...sourceStyle.border,
        };
    }

    // ========================================
    // フォント
    // ========================================

    if (sourceStyle.font) {
        style.font = {
            ...sourceStyle.font,
        };
    }

    // ========================================
    // 文字位置
    // ========================================

    if (sourceStyle.alignment) {
        style.alignment = {
            ...sourceStyle.alignment,
        };
    }

    // ========================================
    // 表示形式
    // ========================================

    if (sourceStyle.numFmt) {
        style.numFmt =
            sourceStyle.numFmt;
    }

    return style;
};

/**
 * Excel出力
 */
export const outputExcel = (
    outputData: ExcelRowData[]
) => {
    // ========================================
    // Excelテンプレートのパス
    // ========================================

    const tempFilePath = path.join(
        process.cwd(),
        "lib",
        "ExcelFile",
        "template.xlsx"
    );

    // ========================================
    // Excelファイルを読み込む
    // ========================================

    const file =
        fs.readFileSync(
            tempFilePath
        );

    // ========================================
    // Excelを読み込む
    // ========================================

    const workbook =
        XLSX.read(file, {
            cellStyles: true,
        });

    // ========================================
    // 先頭シートを取得
    // ========================================

    const worksheet =
        workbook.Sheets[
            workbook.SheetNames[0]
        ];

    // ========================================
    // 行設定
    // ========================================

    // Excelの2行目
    //
    // SheetJSでは0始まりなので「1」
    //
    // この行をデータ用テンプレートとして使用する
    const tempRow = 1;

    // Excelの2行目からデータを書き込む
    //
    // SheetJSでは「1」
    const startRow = 1;

    // ========================================
    // ウィンドウ固定
    // ========================================
    //
    // Excelの1行目を固定する。
    //
    // ySplit = 1
    // → 1行目を固定
    //
    // topLeftCell = A2
    // → スクロール開始位置
    //
    // ========================================

    (worksheet as any)["!freeze"] = {
        xSplit: 0,
        ySplit: 1,
        topLeftCell: "A2",
        activePane: "bottomLeft",
        state: "frozen",
    };

    // ========================================
    // テンプレート行のスタイルを保存
    // ========================================

    const templateCells: ExcelCell[] = [];

    // A～C列
    for (
        let col = 0;
        col <= 2;
        col++
    ) {
        // コピー元セル
        const sourceAddress =
            XLSX.utils.encode_cell({
                r: tempRow,
                c: col,
            });

        const sourceCell =
            worksheet[
                sourceAddress
            ];

        if (sourceCell) {
            // ====================================
            // セルの種類だけ保存
            // ====================================

            const templateCell:
                XLSX.CellObject = {
                    t: sourceCell.t,
                };

            // ====================================
            // スタイルを変換
            // ====================================

            const convertedStyle =
                convertStyle(
                    sourceCell.s
                );

            if (convertedStyle) {
                templateCell.s =
                    convertedStyle;
            }

            templateCells.push(
                templateCell
            );
        } else {
            templateCells.push(
                createEmptyCell()
            );
        }
    }

    // ========================================
    // データを書き込む
    // ========================================

    for (
        let i = 0;
        i < outputData.length;
        i++
    ) {
        // 出力先の行
        const row =
            startRow + i;

        // ====================================
        // テンプレートのスタイルをコピー
        // ====================================

        for (
            let col = 0;
            col <= 2;
            col++
        ) {
            // 出力先セル
            const targetAddress =
                XLSX.utils.encode_cell({
                    r: row,
                    c: col,
                });

            // テンプレートセル
            const templateCell =
                templateCells[col];

            // スタイルをコピー
            worksheet[
                targetAddress
            ] = {
                ...templateCell,
            };
        }

        // ====================================
        // A列：名前
        // ====================================

        const nameAddress =
            XLSX.utils.encode_cell({
                r: row,
                c: 0,
            });

        worksheet[nameAddress] = {
            ...worksheet[nameAddress],
            t: "s",
            v: outputData[i].name,
        };

        // ====================================
        // B列：年齢
        // ====================================

        const ageAddress =
            XLSX.utils.encode_cell({
                r: row,
                c: 1,
            });

        worksheet[ageAddress] = {
            ...worksheet[ageAddress],
            t: "n",
            v: outputData[i].age,
        };

        // ====================================
        // C列：部署
        // ====================================

        const departmentAddress =
            XLSX.utils.encode_cell({
                r: row,
                c: 2,
            });

        worksheet[
            departmentAddress
        ] = {
            ...worksheet[
                departmentAddress
            ],
            t: "s",
            v: outputData[i].department,
        };
    }

    // ========================================
    // Excelの範囲を更新
    // ========================================

    const range =
        XLSX.utils.decode_range(
            worksheet["!ref"] ??
                "A1"
        );

    // データの最終行
    range.e.r =
        startRow +
        outputData.length -
        1;

    // Excelの範囲を更新
    worksheet["!ref"] =
        XLSX.utils.encode_range(
            range
        );

    // ========================================
    // Excelを書き出す
    // ========================================

    return XLSX.write(
        workbook,
        {
            bookType: "xlsx",
            type: "buffer",
            cellStyles: true,
        }
    );
};