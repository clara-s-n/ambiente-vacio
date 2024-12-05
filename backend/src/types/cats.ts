import { Static, Type } from "@sinclair/typebox";

export const CatPostSchema = Type.Object({
    raze: Type.String(),
    name: Type.String(),
    birthdate: Type.String(),
})

export const CatsSchema = Type.Object({
    cat_id: Type.Number(),
    raze: Type.String(),
    name: Type.String(),
    birthdate: Type.String(),
})

export type CatPostType = Static<typeof CatPostSchema>;
export type CatsType = Static<typeof CatsSchema>;