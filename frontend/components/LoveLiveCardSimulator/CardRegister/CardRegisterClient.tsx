"use client";

import { useEffect, useState } from "react";
import MemberCradFrom from "./MemberCradFrom";
import { character, unit, work } from "@/types/loveLiveCardSimulator";

export default function CardRegisterClient() {
    const [memberLive, setMemberLive] = useState<"member" | "live">("member"); // メンバー・ライブ切り替え
    const [workList, setWorkList] = useState<work[]>([]); // 作品名リスト
    const [unitList, setUnitList] = useState<unit[]>([]); // ユニットリスト
    const [characterList, setCharacterList] = useState<character[]>([]); // キャラクター
    const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージ
    const [isError,setIsError] = useState(false);

    useEffect(() => {
        const load = async ()  => {
            try {
                const response = await fetch(`/api/loveLiveCardSimulator/CardRegister/load`);

                if (!response.ok) {
                    throw new Error();
                }
                const body = await response.json();
                const {
                    work,
                    unit,
                    character,
                } = body;

                const workList: work[] = work.rows;
                const unitList: unit[] = unit.rows;
                const characterList: character[] = character.rows;

                setWorkList(workList);
                setUnitList(unitList);
                setCharacterList(characterList);

            } catch(error) {
                setErrorMessage("データ取得に失敗しました");
                setIsError(true);
            }
        }

        load();
    }, []);
    
    return (
        <div>
            <h3 className="absolute top-6 left-8 text-xl font-bold text-gray-500">
                ラブカシミュレーター カード情報登録
            </h3>

            <main className="relative flex flex-col items-center pt-28 gap-10">
                <div>
                    {isError ? (
                        <p
                            className="text-red-600"
                        >
                            {errorMessage}
                        </p>
                    ) : (
                        <p></p>
                    )}
                </div>

                <div>
                    <form className="flex gap-10">
                        <label>
                            <input
                                type="radio"
                                name="memberLive"
                                value="member"
                                checked={memberLive === "member"}
                                onChange={(e) => setMemberLive("member")}
                            />
                            メンバー
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="memberLive"
                                value="live"
                                checked={memberLive === "live"}
                                onChange={(e) => setMemberLive("live")}
                            />
                            ライブ
                        </label>
                    </form>
                </div>
                
                {memberLive === "member" ? (
                    <MemberCradFrom
                        workList={workList}
                        unitList={unitList}
                        characterList={characterList}
                    />
                ) : (
                    // <LiveCradFrom />
                    <></>
                )}
            </main>
        </div>
    );
}