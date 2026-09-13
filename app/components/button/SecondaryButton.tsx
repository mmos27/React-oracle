"use client"

import { MouseEventHandler } from "react";

type SecondaryButtonProps = {
    id: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    viewName: string
}

// export default function SecondaryButton(id: string, onClick: any, viewName: string) {
export default function SecondaryButton({
    id,
    onClick,
    viewName
}: SecondaryButtonProps) {

    return (
        <button
            className="bg-purple-500 hover:bg-purple-400 text-white rounded px-4 py-2 active:bg-purple-600"
            type="button"
            id={ id }
            onClick={ onClick }
        >
           { viewName } 
        </button>
    );
}
