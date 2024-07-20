import { routes } from "./Helpers/routes";

export async function Router(){
    const path=window.location.pathname;

    if(path==='/'){
        navigateTo('/login');
        return;
    }

    if(path==='/login'||path==='/register'){
        if(localStorage.getItem('token')){
            navigateTo('/dashboard');
            return;
        }
    }

    const publicRoute=routes.public.find(route=>route.path===path);
    const privateRoute=routes.private.find(route=>route.path===path);
    const adminRoute=routes.admin.find(route=>route.path===path);
    
    if(publicRoute){
        publicRoute.scene();
        return;
    }

    if(privateRoute){
        if(localStorage.getItem("token")){
            privateRoute.scene();
            return;
        }
        navigateTo('/login');
    }

    if(adminRoute){
        if(localStorage.getItem("token")){
            const response = await fetch(`http://localhost:3000/users?id=${localStorage.getItem('token')}`);
            const loggedUser = await response.json();
            if(loggedUser[0].role==="admin"){
                adminRoute.scene();
                return
            }
        }
    }

    navigateTo('/not-found');
}

export function navigateTo(path){
    window.history.pushState({},'',window.location.origin+path);
    Router();
}

window.addEventListener('popstate', Router);