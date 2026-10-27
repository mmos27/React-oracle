// 作品名
export type work = {
    id: number,
    name: string,
}

// ユニット名
export type unit = {
    id: number,
    workId: number,
    name: string,
}

// キャラクター名
export type character = {
    id: number,
    workId: number,
    unitId: number,
    name: string,
}