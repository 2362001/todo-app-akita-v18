import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.routes").then(m => m.AUTH_ROUTES),
  },
  {
    path: "home",
    loadChildren: () => import("./pages/layout/layout.routes").then(m => m.LAYOUT_ROUTES),
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
];
