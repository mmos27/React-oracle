"use client";

import { useRouter } from "next/navigation";
import SecondaryButton from "@/components/button/SecondaryButton";
import { work, unit, character } from "@/types/loveLiveCardSimulator";
import WorkUnitSelector from "./WorkUnitSelector";

type props = {
    workList: work[],
    unitList: unit[],
    characterList: character[],
}

export default function MemberCradFrom({
    workList,
    unitList,
    characterList,
}: props){
    const router = useRouter();

    return (
        <form>
            {/* 作品名・ユニット名 */}
            <WorkUnitSelector
                workList={workList}
                unitList={unitList}
            />

            {/* キャラクター名 */}
            {/* <CharacterSelector
                characterList={characterList}
            /> */}

            {/* ブレードハート */}
            {/* <HeartSelector /> */}

            {/* スキル入力 */}
            {/* <SkillInput /> */}

            <div className="absolute right-50 -bottom-30">
                <SecondaryButton
                    id="back"
                    onClick={() =>
                        router.push(
                            "/LoveLiveCardSimulator/LoveLiveCardSimulatorMenu"
                        )
                    }
                    viewName="戻る"
                />
            </div>
        </form>
    );
}