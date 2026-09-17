"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import setting from "@/lib/setting";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Login() {
    const router = useRouter();

    const [appName, setAppName] = useState<string>("");

    useEffect(() => {
        // アプリケーション名取得
        const load = async () => {
            const response = await fetch("/api/login");
            
            const body = await response.json();

            const appName: string = body.appName;
            setAppName(appName);
        }

        load();
    }), [];


    // ログイン
    const login = () => {
        router.push("/menu");
    }

    return (
        <div className="relative min-h-screen">

            {/* ツールタイトル */}
            <h3 className="absolute top-10 left-10 text-xl font-bold text-gray-500">
                { appName }
                {/* 旅行管理ツール */}
            </h3>

            {/* ログイン画面 */}
            <main className="flex flex-col items-center pt-28">

                {/* ログインタイトル */}
                <h1 className="w-96 py-5 text-center text-4xl font-bold text-gray-800">
                    ログイン
                </h1>

                {/* 入力欄 */}
                <div className="mt-7 flex flex-col gap-11">

                    <label className="flex items-center">
                        <span className="w-32">
                            ユーザ名：
                        </span>

                        <input
                            type="text"
                            className="w-64 rounded border px-2 py-1"
                        />
                    </label>

                    <label className="flex items-center">
                        <span className="w-32">
                            パスワード：
                        </span>

                        <input
                            type="password"
                            className="w-64 rounded border px-2 py-1"
                        />
                    </label>

                </div>

                {/* ボタン */}
                <div className="mt-14 flex gap-9">
                    <Link
                        className="inline-block w-35 text-center bg-purple-700 hover:bg-purple-600 text-white rounded px-4 py-2 active:bg-purple-800"
                        href="/newAccount"
                    >
                        新規登録
                    </Link>

                    <PrimaryButton
                        id="login"
                        onClick={ login }
                        viewName="ログイン"
                    />
                </div>

            </main>
        </div>
    )
}