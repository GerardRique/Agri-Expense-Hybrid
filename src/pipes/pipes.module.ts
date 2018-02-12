import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { DateFilterPipe } from './date-filter/date-filter';
@NgModule({
	declarations: [FilterPipe,
    DateFilterPipe],
	imports: [],
	exports: [FilterPipe,
    DateFilterPipe]
})
export class PipesModule {}
