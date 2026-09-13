"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import Link from "next/link";

export default function Menu() {

    // ログアウト
    const logout = () => {

    }

    return (
        <div className="relative min-h-screen">

            <h3 className="absolute top-6 left-8 text-xl font-bold text-gray-500">
                旅行管理ツール
            </h3>

            <main className="relative flex flex-col items-center pt-28 gap-10">

                <h1 className="w-96 py-5 text-center text-4xl font-bold text-gray-800">
                    作成済みスケジュール確認
                </h1>

                <div className="absolute right-50 -bottom-30">
                    <Link
                        className="inline-block w-35 text-center bg-purple-700 hover:bg-purple-600 text-white rounded px-4 py-2 active:bg-purple-800"
                        href="/menu"
                    >
                        戻る
                    </Link>
                </div>
            </main>
        </div>
    )
}
