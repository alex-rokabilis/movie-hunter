import { HttpModule } from '@angular/http';
import { UserService } from './../User/user.service';
import { MovieResolver } from './movie.resolver';
import { MovieDetailsComponent } from './movieDetails.component';
import { MovieService } from './movie.service';
import { MovieListComponent } from './movieList.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'movie',
        children: [{
            path: '', redirectTo: 'popular'
        }, {
            path: 'popular',
            component: MovieListComponent,
            resolve: {
                movies: MovieResolver
            }
        }, {
            path: 'trending', 
            component: MovieListComponent,
            resolve: {
                movies: MovieResolver
            }
        }, {
            path: ':id', 
            component: MovieDetailsComponent,
            resolve: {
                movie: MovieResolver
            }
        }]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes),HttpModule],
    exports: [RouterModule],
    providers: [MovieService, MovieResolver, UserService]
})
export class MovieRoutingModule { }

const MovieRoutingComponents = [MovieListComponent, MovieDetailsComponent];

export const MovieModule = {
    routing: MovieRoutingModule,
    components: MovieRoutingComponents
}