import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

// PostgreSQLへの接続プールを作成
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// NextAuthの設定
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                name: {
                    label: "ユーザー名",
                    type: "text",
                },
                password: {
                    label: "パスワード",
                    type: "password",
                },
            },

            async authorize(credentials) {
                // ユーザー名またはパスワードが入力されていない場合
                if (
                    !credentials?.name ||
                    !credentials?.password
                ) {
                    return null;
                }

                // PostgreSQLからユーザーを検索
                const result = await pool.query(
                    `
                    SELECT
                        id,
                        name,
                        password
                    FROM public.tool_user
                    WHERE name = $1
                    `,
                    [credentials.name]
                );

                // ユーザーが存在しない場合
                if (result.rows.length === 0) {
                    return null;
                }

                const user = result.rows[0];

                // 入力されたパスワードと
                // DBに保存されているbcryptハッシュを比較
                const passwordMatch = await bcrypt.compare(
                    String(credentials.password),
                    user.password
                );

                // パスワードが一致しない場合
                if (!passwordMatch) {
                    return null;
                }

                // 認証成功
                return {
                    id: String(user.id),
                    name: user.name,
                };
            },
        }),
    ],

    // JWT方式でセッションを管理
    session: {
        strategy: "jwt",
    },

    // NextAuthで使用するログイン画面
    pages: {
        signIn: "/login",
    },
};

// NextAuthのハンドラーを作成
export default NextAuth(authOptions);
