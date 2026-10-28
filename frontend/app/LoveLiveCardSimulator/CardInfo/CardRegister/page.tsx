
"use client";

import SecondaryButton from "@/components/button/SecondaryButton";
import { work, unit, character } from "@/types/loveLiveCardSimulator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CardRegister() {
    const router = useRouter();

    const [memberLive, setMemberLive] = useState("member");
    const [workList, setWorkList] = useState<work[]>([]);
    const [unitList, setUnitList] = useState<unit[]>([]);
    const [characterList, setCharacterList] = useState<character[]>([]);
    const [workId, setWorkId] = useState<number>(0);
    const [unitId, setUnitId] = useState<number>(0);
    const [characterId, setCharacterId] = useState<number>(0);

    // DBから作品名を取得するようにする
    useEffect(() => {
        const load = async ()  => {
            const response = await fetch(`/api/loveLiveCardSimulator/CardRegister/load`);

            const body = await response.json();
            const {
                work,
                unit,
                character,
            } = body;

            console.log(">>>work:", work);
            console.log(">>>unit:", unit);
            console.log(">>>character:", character);

            const workList: work[] = work.rows;
            const unitList: unit[] = unit.rows;
            const characterList: character[] = character.rows;

            console.log(">>>workList:", workList);
            console.log(">>>unitList:", unitList);
            console.log(">>>characterList:", characterList);

            setWorkList(workList);
            setUnitList(unitList);
            setCharacterList(characterList);
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

                <div
                    className="flex gap-10"
                >
                    <label>
                        <select
                            className="border rounded p-1"
                            id="work"
                            value={workId}
                            onChange={(e) => setWorkId(Number(e.target.value))}
                        >
                            <option
                                id="work"
                                key="0"
                                value="0"
                            >
                                作品名を選択してください
                            </option>

                            {workList.map((row) => (
                                <option
                                    id="work"
                                    key={row.id}
                                    value={row.id}
                                >
                                    {row.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <select
                            className="border rounded p-1"
                            id="unit"
                            value={unitId}
                            onChange={(e) => setUnitId(Number(e.target.value))}
                        >
                            <option
                                id="unit"
                                key="0"
                                value="0"
                            >
                                ユニット名を選択してください
                            </option>

                            {unitList
                                .filter((row) => {
                                    return (
                                        row.workid === workId
                                        || workId === 0
                                    );
                                })
                                .map((row) => (
                                    <option
                                        id="unit"
                                        key={row.id}
                                        value={row.id}
                                    >
                                        {row.unitname}
                                    </option>
                                ))
                            }
                        </select>
                    </label>

                    <label>
                        <select
                            className="border rounded p-1"
                            id="character"
                            value={characterId}
                            onChange={(e) => setCharacterId(Number(e.target.value))}
                        >
                            <option
                                id="character"
                                key="0"
                                value="0"
                            >
                                キャラクター名を選択してください
                            </option>

                            {characterList
                                .filter((row) => {
                                    return (
                                        (workId === 0 || row.workid === workId) &&
                                        (unitId === 0 || row.unitid === unitId)
                                    );
                                })
                                .map((row) => (
                                    <option
                                        id="character"
                                        key={row.id}
                                        value={row.id}
                                    >
                                        {row.charactername}
                                    </option>
                                ))
                            }
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
