
"use client";

import SecondaryButton from "@/components/button/SecondaryButton";
import { work } from "@/types/loveLiveCardSimulator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CardRegister() {
    const router = useRouter();

    const [memberLive, setMemberLive] = useState("member");
    const [workList, setWorkList] = useState<work[]>([]);
    const [workName, setWorkName] = useState("");

    // DBから作品名を取得するようにする
    useEffect(() => {
        const load = async ()  => {
            const response = await fetch(`/api/loveLiveCardSimulator/CardRegister/load`);

            const body = await response.json();
            console.log(">>>body:" ,body);
        }

        load();
    }, []);

    return (
        <div>
            <h3 className="absolute top-6 left-8 text-xl font-bold text-gray-500">
                ラブカシミュレーター カード情報登録
            </h3>

            <main className="relative flex flex-col items-center pt-28 gap-10">
                <form className="flex gap-10">
                    <label>
                        <input
                            type="radio"
                            name="memberLive"
                            value="member"
                            checked={memberLive === "member"}
                            onChange={(e) => setMemberLive(e.target.value)}
                        />
                        メンバー
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="memberLive"
                            value="live"
                            checked={memberLive === "live"}
                            onChange={(e) => setMemberLive(e.target.value)}
                        />
                        ライブ
                    </label>
                </form>

                <div>
                    <label>
                        <select
                            className=""
                            id="work"
                            value={workName}
                            onChange={(e) => setWorkName(e.target.value)}
                        >
                            {workList.map((row) => (
                                <option
                                id="work"
                                    key={row.id}
                                    value={row.name}
                                >
                                    {row.name}
                                </option>
                            ))}

                        </select>
                    </label>
                </div>

                <div className="absolute right-50 -bottom-30">
                    <SecondaryButton
                        id="logout"
                        onClick={() =>
                            router.push(
                                "/LoveLiveCardSimulator/LoveLiveCardSimulatorMenu"
                            )
                        }
                        viewName="戻る"
                    />
                </div>
            </main>
        </div>
    );
}
