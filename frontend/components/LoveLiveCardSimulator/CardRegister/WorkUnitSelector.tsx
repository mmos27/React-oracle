"use client";

import { unit, work } from "@/types/loveLiveCardSimulator";
import { useState } from "react";


type props = {
    workList: work[],
    unitList: unit[],
}

export default function WorkUnitSelector({
    workList,
    unitList,
}: props){
    const [workId, setWorkId] = useState(0); // 作品名
    const [unitId, setUnitId] = useState(0); // ユニット名
    const [characterId, setCharacterId] = useState(0); // キャラクター名

    // 作品名選択
    const selectedWork = (workId: number) => {
        setWorkId(workId);
        setUnitId(0);
        setCharacterId(0);
    }

    // ユニット選択
    const selectedUnit =(unitId: number) => {
        setUnitId(unitId);
        setCharacterId(0);
    }

    return (
        <div
            className="flex gap-10"
        >
            <label>
                <select
                    className="border rounded p-1"
                    id="work"
                    value={workId}
                    onChange={(e) => selectedWork(Number(e.target.value))}
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
                    onChange={(e) => selectedUnit(Number(e.target.value))}
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
        </div>
    );
}