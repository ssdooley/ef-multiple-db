import { NgModule } from '@angular/core';

import { CoreService } from './services/core.service';
import { SnackerService } from './services/snacker.service';
import { ThemeService } from './services/theme.service';

import { SanitizeUrlPipe } from './pipes/sanitize-url.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
    providers: [
        CoreService,
        SnackerService,
        ThemeService
    ],
    declarations: [
        SanitizeUrlPipe,
        TruncatePipe
    ],
    exports: [
        SanitizeUrlPipe,
        TruncatePipe
    ]
})
export class ServicesModule { }
