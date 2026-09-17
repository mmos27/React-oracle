"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import setting from "@/lib/setting";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
    const router = useRouter();

    const [appName, setAppName] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        // アプリケーション名取得
        const load = async () => {
            const response = await fetch("/api/login");

            const body = await response.json();

            const appName: string = body.appName;
            setAppName(appName);
        };

        load();
    }, []);

    // ログイン
    const login = async () => {
        // 前回のエラーメッセージをクリア
        setErrorMessage("");

        // ユーザー名またはパスワードが未入力の場合
        if (!name || !password) {
            setErrorMessage("ユーザ名とパスワードを入力してください。");
            return;
        }

        // NextAuthでログイン
        const result = await signIn("credentials", {
            name: name,
            password: password,
            redirect: false,
        });

        // ログイン失敗
        if (!result || result.error) {
            setErrorMessage(
                "ユーザ名またはパスワードが正しくありません。"
            );
            return;
        }

        // ログイン成功
        router.push("/menu");
    };

    return (
        <div className="relative min-h-screen">
            <h3 className="absolute top-10 left-10 text-xl font-bold text-gray-500">
                {appName}
            </h3>

            <main className="flex flex-col items-center pt-28">
                <h1 className="w-96 py-5 text-center text-4xl font-bold text-gray-800">
                    ログイン
                </h1>

                <div className="mt-7 flex flex-col gap-11">
                    <label className="flex items-center">
                        <span className="w-32">
                            ユーザ名：
                        </span>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-64 rounded border px-2 py-1"
                        />
                    </label>

                    <label className="flex items-center">
                        <span className="w-32">
                            パスワード：
                        </span>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-64 rounded border px-2 py-1"
                        />
                    </label>
                </div>

                {/* エラーメッセージ */}
                {errorMessage && (
                    <p className="mt-6 text-red-600">
                        {errorMessage}
                    </p>
                )}

                <div className="mt-14 flex gap-9">
                    <Link
                        className="inline-block w-35 text-center bg-purple-700 hover:bg-purple-600 text-white rounded px-4 py-2 active:bg-purple-800"
                        href="/newAccount"
                    >
                        新規登録
                    </Link>

                    {/* ログイン */}
                    <PrimaryButton
                        id="login"
                        onClick={login}
                        viewName="ログイン"
                    />
                </div>
            </main>
        </div>
    );
}
