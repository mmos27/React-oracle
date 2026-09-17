"use client";

import { MouseEventHandler } from "react";

type PrimaryButtonProps = {
    id: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    viewName: string
}

// export default function SecondaryButton(id: string, onClick: any, viewName: string) {
export default function PrimaryButton({
    id,
    onClick,
    viewName
}: PrimaryButtonProps) {

    return (
        <button
            className="bg-purple-700 hover:bg-purple-600 text-white rounded px-4 py-2 active:bg-purple-800"
            type="button"
            id={ id }
            onClick={ onClick }
        >
           { viewName } 
        </button>
    );
}
