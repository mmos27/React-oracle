import {
    ExcelRowData,
    outputExcel,
} from "@/components/excelfile/output";

export async function POST(request: Request) {
    const outputData: ExcelRowData[] = [
        {
            name: "name1",
            age: 22,
            department: "test",
        },
        {
            name: "name2",
            age: 25,
            department: "development",
        },
    ];

    const outputResult =
        await outputExcel(outputData);

    return new Response(
        new Uint8Array(outputResult),
        {
            status: 200,
            headers: {
                "Content-Type":
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

                "Content-Disposition":
                    'attachment; filename="output.xlsx"',
            },
        }
    );
}