import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { PopularTagType } from "src/app/shared/types/popularTag.type";

export const tagsActions = createActionGroup({
  source: "tags",
  events: {
    'Get popular tags' : emptyProps(),
    'Get popular tags success': props<{tags: PopularTagType[]}>(),
    'Get popular tags failure': emptyProps()
  }
})