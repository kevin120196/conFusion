import { Routes } from "@angular/router";
import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';


export const routes:Routes = [
    {path: 'home',component: HomeComponent},
    {path: 'Menu', component: MenuComponent},
    {path: 'dishDetail/:id', component:DishdetailComponent},
    {path: 'About', component: AboutComponent},
    {path: 'Contact', component: ContactComponent},
    {path: 'Detail', component: DishdetailComponent},
    {path: '', redirectTo: '/home', pathMatch:'full'}
];