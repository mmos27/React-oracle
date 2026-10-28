// 作品名
export type work = {
    id: number,
    name: string,
}

// ユニット名
export type unit = {
    id: number,
    workid: number,
    unitname: string,
}

// キャラクター名
export type character = {
    id: number,
    workid: number,
    unitid: number,
    charactername: string,
}