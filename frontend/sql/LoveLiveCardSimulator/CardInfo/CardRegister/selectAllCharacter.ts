import { executeQuery } from "@/lib/db";

export async function selALlCharacter() {
    const sql = `select * from character order by id;`;

    const result = await executeQuery(sql, []);

    return result;
}