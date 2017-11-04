import { NgModule } from '@angular/core';

import { ParallaxHeaderDirective } from './../directives/parallax-header/parallax-header';
import { TextareaDirective } from './textarea/textarea';

export const directives = [
	TextareaDirective,
	ParallaxHeaderDirective
];


@NgModule({
	declarations: [directives],
	imports: [],
	exports: [directives]
})
export class DirectivesModule {}
