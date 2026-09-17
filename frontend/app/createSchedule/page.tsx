"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
    // 選択タブ
    const [activeTab, setActiveTab] = useState<string>("");
    // タブList
    const [tabList, setTabList] = useState<string[]>(["1"]);

    // タブ切り替え
    const changeTab = () => {

    }

    // タブを増やす
    const addTab = () => {
        console.log("tabList.length:", tabList.length);
        const tabNum: number = tabList.length + 1;

        const newTabList = [...tabList, tabNum.toString()];

        setTabList(newTabList);
    }

    return (
        <div className="relative min-h-screen">

            <h3 className="absolute top-6 left-8 text-xl font-bold text-gray-500">
                旅行管理ツール
            </h3>

            <main className="relative flex flex-col items-center pt-28 gap-10">

                <h1 className="w-96 py-5 text-center text-4xl font-bold text-gray-800">
                    スケジュール登録
                </h1>

                {/* 日付設定 */}
                <div className="flex gap-5">
                    <input
                        className="border rounded"
                        type="date"
                        id=""
                    />
                    <p>
                        ～
                    </p>
                    <input
                        className="border rounded"
                        type="date"
                        id=""
                    />
                </div>

                {/* タブ */}
                <div>
                    {tabList.map(item => 
                        <button
                            className="border rounded"
                            type="button"
                            onClick={ changeTab }
                        >
                            DAY{ item }
                        </button>
                    )}

                    <button
                        className=""
                        type="button"
                        onClick={ addTab }
                    >
                        ＋
                    </button>
                </div>

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