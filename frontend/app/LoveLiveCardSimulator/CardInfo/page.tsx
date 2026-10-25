"use client";

import SecondaryButton from "@/components/button/SecondaryButton";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function CardInfo() {
    const router = useRouter();

    return (
        <div>
            <h3 className="absolute top-6 left-8 text-xl font-bold text-gray-500">
                ラブカシミュレーター カード情報
            </h3>
            
            <main className="relative flex flex-col items-center pt-28 gap-10">
                <Link
                    className="inline-block w-35 text-center bg-purple-700 hover:bg-purple-600 text-white rounded px-4 py-2 active:bg-purple-800"
                    href="/LoveLiveCardSimulator/CradInfo/Insert"
                >
                    登録
                </Link>

                <Link
                    className="inline-block w-35 text-center bg-purple-700 hover:bg-purple-600 text-white rounded px-4 py-2 active:bg-purple-800"
                    href="/LoveLiveCardSimulator/CradInfo/DataCheck"
                >
                    登録済み確認
                </Link>

                <div className="absolute right-50 -bottom-30">
                    <SecondaryButton
                        id="logout"
                        onClick={() => router.push("/LoveLiveCardSimulator/LoveLiveCardSimulatorMenu")}
                        viewName="戻る"
                    />
                </div>
            </main>
        </div>
    )
}