import { PopularTagType } from "src/app/shared/types/popularTag.type"

export interface PopularTagStateInterface {
    isLoading: boolean
    data: null | PopularTagType[]
    error: null | string
}