import { Route } from "@angular/router";


export const appRoutes: Route [] = [
    {path:'register',
    loadChildren: ()=>import('src/app/auth/auth.routes').then((m)=>m.registerRoutes)}, //lazy loading modules...
    {path:'login',
        loadChildren: ()=>import('src/app/auth/auth.routes').then((m)=>m.loginRoutes)},
   {path:'',
    loadChildren:()=>import('src/app/globalFeed/globalFeed.routes').then((m)=>m.routes)
   },
   {path:'feed',
    loadChildren:()=>import('src/app/yourFeed/yourFeed.routes').then((m)=>m.routes)
   },
   {path:'tags/:slug',
    loadChildren:()=>import('src/app/tagFeed/tagFeed.routes').then((m)=>m.routes)
   },
   {path:'articles/new',
    loadChildren:()=>import('src/app/createArticle/createArticle.routes').then((m)=>m.routes)
   },
   {path:'articles/:slug',
    loadChildren:()=>import('src/app/article/article.routes').then((m)=>m.articleRoutes)
   },
   {path:'articles/:slug/edit',
    loadChildren:()=>import('src/app/editArticle/editArticle.routes').then((m)=>m.routes)
   },
   {path:'setting',
    loadChildren:()=>import('src/app/settings/settings.routes').then((m)=>m.routes)
   },
   {path:'profiles/:slug',
    loadChildren:()=>import('src/app/userProfile/userProfile.routes').then((m)=>m.routes)
   },
   {path:'profiles/:slug/favorites',
    loadChildren:()=>import('src/app/userProfile/userProfile.routes').then((m)=>m.routes)
   }
]