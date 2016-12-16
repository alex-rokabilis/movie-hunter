//import reusable components
import { ItemDetailsComponent } from './../Reusable/itemDetails.component';
import { ListPageSidebarComponent } from './../Reusable/listPageSidebar.component';
import { ItemThumbComponent } from './../Reusable/itemThumb.component';
import { ItemListComponent } from './../Reusable/itemList.component';
import { ListPageComponent } from './../Reusable/itemListPage.component';

//import necessary services
import { UserService } from './../User/user.service';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';

//import angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


const routes: Routes = [
    {
        path: 'movie',
        children: [
            {
                path: '',
                component: ListPageComponent,
                children: [
                    {
                        path: 'popular',
                        component: ItemListComponent,
                        resolve: {
                            items: MovieResolver
                        }
                    },
                    {
                        path: 'trending',
                        component: ItemListComponent,
                        resolve: {
                            items: MovieResolver
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
                    item: MovieResolver
                }
            }]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), HttpModule],
    exports: [RouterModule],
    providers: [MovieService, MovieResolver, UserService]
})
export class MovieRoutingModule { }

const MovieRoutingComponents = [ 
    ItemDetailsComponent,   
    ListPageComponent,
    ItemListComponent,
    ItemThumbComponent,
    ListPageSidebarComponent
    ];

export const MovieModule = {
    routing: MovieRoutingModule,
    components: MovieRoutingComponents
}