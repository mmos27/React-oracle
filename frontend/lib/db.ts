
import { Pool, type QueryResult, type QueryResultRow } from "pg";

const globalForPg = globalThis as unknown as {
    pgPool?: Pool;
};

const pool =
    globalForPg.pgPool ??
    new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
    });

if (process.env.NODE_ENV !== "production") {
    globalForPg.pgPool = pool;
}

// SQLとバインド変数を受け取り、SQLを実行する
export async function executeQuery<T extends QueryResultRow>(
    sql: string,
    params: unknown[] = []
): Promise<QueryResult<T>> {
    try {
        return await pool.query<T>(sql, params);
    } catch (error) {
        console.error("SQL実行エラー:", error);
        throw error;
    }
}
