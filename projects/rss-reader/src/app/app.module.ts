import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import {
  MarkedOptions,
  MARKED_OPTIONS,
  MarkedRenderer,
  MarkdownModule,
} from "ngx-markdown";

import { environment } from "../environments/environment";
import { ActionItemsModule } from "./actionitem.service";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { ArticleCardModule } from "./components/article-card/article-card.module";
import { ExpansionPanelComponent } from "./components/expansion-panel/expansion-panel.component";
import { DialogsModule as CoreDialogsModule } from "./core/dialogs/dialogs.module";
import { DialogsModule } from "./dialogs/dialogs.module";
import { FeedComponent } from "./feed/feed.component";
import { GuideItemsService } from "./guide-items";
import { HeadlinesComponent } from "./headlines/headlines.component";
import { HotkeysModule } from "./hotkeys/hotkeys.module";
import { MaterialModule } from "./material.module";
import { OverlayService } from "./overlay.service";
import { OnboardingOverlayComponent } from "./overlays/onboarding-overlay/onboarding-overlay.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DocViewerComponent } from "./pages/doc-viewer/doc-viewer.component";
import { GuidesListComponent } from "./pages/guide-list/guide-list.component";
import { GuideViewerComponent } from "./pages/guide-viewer/guide-viewer.component";
import { PipesModule } from "./pipe/pipes.module";
import { SharedModule } from "./shared.service";

const markedOptionsFactory: () => MarkedOptions = () => {
  const renderer = new MarkedRenderer();

  renderer.link = (href, title, text) =>
    `<a class="anchor-link" href="${href}"${
      typeof title !== "undefined" ? ` title=${title}` : ""
    }>${text}</a>`;

  return {
    renderer,
    gfm: true,
  };
};

const OVERLAYS = [OnboardingOverlayComponent];

@NgModule({ declarations: [
        AppComponent,
        FeedComponent,
        PageNotFoundComponent,
        DocViewerComponent,
        GuideViewerComponent,
        GuidesListComponent,
        ExpansionPanelComponent,
        OVERLAYS,
        HeadlinesComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MarkdownModule.forRoot({
            markedOptions: {
                provide: MARKED_OPTIONS,
                useFactory: markedOptionsFactory,
            },
        }),
        MaterialModule,
        PipesModule,
        SharedModule,
        AppRoutingModule,
        // The scope parameter is specified such that the service worker only
        // applies to the /rss-reader URL.
        // ServiceWorkerModule.register(environment.swLocation, { enabled: environment.production, scope: './' }),
        ServiceWorkerModule.register("./ngsw-worker.js", {
            enabled: environment.production,
            scope: "./",
        }),
        DialogsModule,
        CoreDialogsModule,
        ActionItemsModule,
        ArticleCardModule,
        HotkeysModule], providers: [GuideItemsService, OverlayService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
