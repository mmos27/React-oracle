import { executeQuery } from "@/lib/db";

export async function selAllUnit() {
    const sql = `select * from unit order by id`;

    const result = await executeQuery(sql, []);

    return result;
}