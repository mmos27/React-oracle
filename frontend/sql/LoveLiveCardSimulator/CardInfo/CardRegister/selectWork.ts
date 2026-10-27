import { executeQuery } from "@/lib/db";

export async function selWork() {
    const sql = `select * from work order by id`;

    const result = await executeQuery(sql, []);

    return result;
}