"use client";

import { character } from "@/types/loveLiveCardSimulator";

type props = {
    characterList: character[],
}

export default function CharacterSelector({
    characterList,
}: props) {
    return (
        <div>
            <div
                className="flex gap-10"
            >
                {/* <label>
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
                </label> */}
            </div>
        </div>
    );
}