import { DelayedImageComponent } from './../Reusable/delayedImage.components';
//import reusable components
import { ItemDetailsComponent } from './../Reusable/itemDetails.component';
import { ListPageSidebarComponent } from './../Reusable/listPageSidebar.component';
import { ItemThumbComponent } from './../Reusable/itemThumb.component';
import { ItemListComponent } from './../Reusable/itemList.component';
import { ListPageComponent } from './../Reusable/itemListPage.component';

//import necessary services
import { UserService } from './../User/user.service';
import { TvResolver  } from './tv.resolver';
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
                data:{
                    title: "Series"
                },
                children: [
                    {
                        path: 'popular',
                        component: ItemListComponent,
                        resolve: {
                            items: TvResolver
                        }
                    },
                    {
                        path: 'trending',
                        component: ItemListComponent,
                        resolve: {
                            items: TvResolver
                        }
                    },
                    {
                        path: '',
                        redirectTo:'popular'
                    }
                ]

            },
            {
                path: ':id',
                component: ItemDetailsComponent,
                resolve: {
                    item: TvResolver
                }
            }]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), HttpModule],
    exports: [RouterModule],
    providers: [TvService, TvResolver, UserService]
})
export class TvRoutingModule { }

const TvRoutingComponents = [ 
    ItemDetailsComponent,   
    ListPageComponent,
    ItemListComponent,
    ItemThumbComponent,
    ListPageSidebarComponent,
    DelayedImageComponent
    ];

export const TvModule = {
    routing: TvRoutingModule,
    components: TvRoutingComponents
}