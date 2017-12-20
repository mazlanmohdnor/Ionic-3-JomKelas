import { NgModule } from "@angular/core";
import { KeyobjectPipe } from "./keyobject/keyobject";
import { FilterridePipe } from "./filterride/filterride";
import { SortlatestPipe } from "./sortlatest/sortlatest";
import { RatingPipe } from './rating/rating';
@NgModule({
  declarations: [KeyobjectPipe, FilterridePipe, SortlatestPipe,
    RatingPipe],
  imports: [],
  exports: [KeyobjectPipe, FilterridePipe, SortlatestPipe,
    RatingPipe]
})
export class PipesModule {}
