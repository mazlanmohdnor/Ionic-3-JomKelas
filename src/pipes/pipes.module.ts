import { NgModule } from "@angular/core";
import { KeyobjectPipe } from "./keyobject/keyobject";
import { FilterridePipe } from "./filterride/filterride";
import { SortlatestPipe } from "./sortlatest/sortlatest";
@NgModule({
  declarations: [KeyobjectPipe, FilterridePipe, SortlatestPipe],
  imports: [],
  exports: [KeyobjectPipe, FilterridePipe, SortlatestPipe]
})
export class PipesModule {}
