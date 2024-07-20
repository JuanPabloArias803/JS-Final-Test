import { Router } from "./Router";

export function App(){
    const root = document.querySelector("#root");
    if(!root){
        throw new Error("Ocurrió un error inesperado...");
    }
    Router();
}