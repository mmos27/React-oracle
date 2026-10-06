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

    // Excel出力
    const outputExcel =async () => {
        // const responce = await fetch("/api/outputExcel");
        const responce = await fetch("/api/outputExcel", {
            method: "POST"
        })

        console.log(">>>responce:", responce);

        if (!responce.ok) {
            throw new Error("Excel出力に失敗しました。");
        }

        // レスポンスをBlobとして取得
        const blob = await responce.blob();

        // ダウンロード用URLを作成
        const url = window.URL.createObjectURL(blob);

        // ダウンロード用aタグ作成
        const link = document.createElement("a");

        link.href = url;

        // ダウンロードファイル名
        link.download = "output.xlsx";

        // ダウンロード実行
        document.body.appendChild(link);
        link.click();

        // 不要になった要素を削除
        link.remove();
        window.URL.revokeObjectURL(url);
    }

    // hucre Excel出力
    const hucreOutputExcel = async () => {
        try {
            // APIを呼び出す
            const response = await fetch(
                "/api/hucreOutputExcel",
                {
                    method: "POST",
                },
            );

            if (!response.ok) {
                throw new Error(
                    "Excelの出力に失敗しました。",
                );
            }

            // ExcelデータをBlobとして取得
            const blob = await response.blob();

            // ダウンロード用URLを作成
            const url = window.URL.createObjectURL(blob);

            // ダウンロードリンクを作成
            const link = document.createElement("a");

            link.href = url;

            link.download = "output.xlsx";

            // ダウンロード実行
            document.body.appendChild(link);
            link.click();

            // 後片付け
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
            alert(
                "Excelのダウンロードに失敗しました。",
            );
        }
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

                {/* Excel出力 */}
                <div>
                    <button
                        className="border rounded bg-red-300"
                        type="button"
                        onClick={ outputExcel }
                    >
                        Excel出力
                    </button>
                </div>

                {/* hucre Excel出力 */}
                <div>
                    <button
                        className="border rounded bg-red-300"
                        type="button"
                        onClick={ hucreOutputExcel }
                    >
                        hucre Excel出力
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