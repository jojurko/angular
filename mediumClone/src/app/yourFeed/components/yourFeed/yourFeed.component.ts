import { Component } from "@angular/core"
import { BannerComponent } from "src/app/shared/components/banner/banner.component";
import { ErrorMessageComponent } from "src/app/shared/components/errorMessage/errorMessage.component";
import { FeedComponent } from "src/app/shared/components/feed/feed.component";
import { FeedTogglerComponent } from "src/app/shared/components/feedToggler/feedToggler.component";
import { PopularTagList } from "src/app/shared/components/popularTagList/popularTagList.component";

@Component({
    selector: 'mc-your-feed',
    templateUrl: './yourFeed.component.html',
    standalone: true,
    imports:[FeedComponent, BannerComponent, 
        ErrorMessageComponent, PopularTagList,
        FeedTogglerComponent]

})
export class YourFeedComponent{
    apiUrl: string = "/articles/feed"
}