import { NgModule } from '@angular/core';
import { StripHtmlTagsPipe } from './strip-html-tags.pipe';
import { TruncatePipe } from './truncate.pipe';
import { OrderByPipe } from './orderby.pipe';

const PIPES = [
  OrderByPipe,
  StripHtmlTagsPipe,
  TruncatePipe
];

@NgModule({
  declarations: [PIPES],
  exports: [PIPES]
})
export class PipesModule { }
