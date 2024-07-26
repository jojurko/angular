import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { tagsActions } from "./store/actions";
import { combineLatest } from "rxjs";
import { selectError, selectIsLoading, selectPopularTagsData } from "./store/reducers";
import { LoadingComponent } from "../loading/loading.component";
import { ErrorMessageComponent } from "../errorMessage/errorMessage.component";


@Component({
    selector: "mc-popular-taglist",
    templateUrl: "./popularTagList.component.html",
    standalone: true,
    imports: [RouterLink, CommonModule, LoadingComponent,ErrorMessageComponent]
})
export class PopularTagList implements OnInit {
  apiUrl: string = '/tags'
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    tags: this.store.select(selectPopularTagsData)
  })

  constructor(private store: Store){}
  ngOnInit(): void {
      this.store.dispatch(tagsActions.getPopularTags());
  }

}