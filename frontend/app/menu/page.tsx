"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Menu() {
    const router = useRouter();

    // ログアウト
    const logout = () => {
        router.push("/login");
    }

    return (
        <div className="relative min-h-screen">

            <h3 className="absolute top-6 left-8 text-xl font-bold text-gray-500">
                旅行管理ツール
            </h3>

            <main className="relative flex flex-col items-center pt-28 gap-10">

                <h1 className="w-96 py-5 text-center text-4xl font-bold text-gray-800">
                    メニュー
                </h1>

                <Link
                    className="inline-block w-35 text-center bg-purple-700 hover:bg-purple-600 text-white rounded px-4 py-2 active:bg-purple-800"
                    href="/createSchedule"
                >
                    新規作成
                </Link>

                <Link
                    className="inline-block w-35 text-center bg-purple-700 hover:bg-purple-600 text-white rounded px-4 py-2 active:bg-purple-800"
                    href="/check"
                >
                    確認
                </Link>

                <div className="absolute right-50 -bottom-30">
                    <SecondaryButton
                        id="logout"
                        onClick={logout}
                        viewName="ログアウト"
                    />
                </div>
            </main>
        </div>
    )
}