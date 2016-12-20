import { SeasonsResolver } from './seasons.resolver';
import { SeasonsListComponent } from './seasonsList.component';
import { TVDetailsPageComponent } from './tvDetailsPage.component';
import { DelayedImageComponent } from './../Reusable/delayedImage.components';
//import reusable components
import { ItemDetailsComponent } from './../Reusable/itemDetails.component';
import { ListPageSidebarComponent } from './../Reusable/listPageSidebar.component';
import { ItemThumbComponent } from './../Reusable/itemThumb.component';
import { ItemListComponent } from './../Reusable/itemList.component';
import { ListPageComponent } from './../Reusable/itemListPage.component';

//import necessary services
import { UserService } from './../User/user.service';
import { TvResolver } from './tv.resolver';
import { TvService } from './tv.service';

//import angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


const routes: Routes = [
    {
        path: 'tv',
        children: [
            {
                path: '',
                component: ListPageComponent,
                data: {
                    title: "Series"
                },
                children: [
                    {
                        path: 'popular',
                        component: ItemListComponent,
                        data: {
                            tvResolver: "popular"
                        },
                        resolve: {
                            items: TvResolver
                        }
                    },
                    {
                        path: 'trending',
                        component: ItemListComponent,
                        data: {
                            tvResolver: "trending"
                        },
                        resolve: {
                            items: TvResolver
                        }
                    },
                    {
                        path: '',
                        redirectTo: 'popular'
                    }
                ]

            },
            {
                path: ':id',
                component: TVDetailsPageComponent,
                data: {
                    tvResolver: "single",
                    seasonsResolver: "list"
                },
                resolve: {
                    show: TvResolver,
                    seasons: SeasonsResolver
                }

            }]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), HttpModule],
    exports: [RouterModule],
    providers: [TvService, TvResolver, SeasonsResolver, UserService]
})
export class TvRoutingModule { }

const TvRoutingComponents = [
    ItemDetailsComponent,
    ListPageComponent,
    ItemListComponent,
    ItemThumbComponent,
    ListPageSidebarComponent,
    DelayedImageComponent,
    TVDetailsPageComponent,
    SeasonsListComponent
];

export const TvModule = {
    routing: TvRoutingModule,
    components: TvRoutingComponents
}