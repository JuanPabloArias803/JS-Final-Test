import { emailValidator } from "../../../Helpers/emailValidator";
import { navigateTo } from "../../../Router";
import styles from './login.css';

export function LoginScene(){
    const root=document.querySelector('#root');
    root.innerHTML=`
        <form class="${styles.form}">
            <h2>Iniciar Sesión</h2>
            <input type="email" placeholder="Correo Electrónico" autocomplete="email"></input>
            <input type="password" placeholder="Contraseña" autocomplete="current-password"></input>
            <button type="submit">Iniciar Sesión</button>
            <span>
                <label for="registerBtn">No estás registrado?</label>
                <button id="registerBtn">Registrate!</button>
            </span>
        </form>
        
    `;

    //logica
    const $useremail=root.querySelector('input[type="email"]');
    const $password=root.querySelector('input[type="password"]');
    const $form=root.querySelector('form');
    const $registerBtn=root.querySelector('#registerBtn');
    $form.addEventListener('submit',async (event)=>{
        event.preventDefault();
        if(!$useremail.value || !$password.value){
            alert("Por favor rellena todos los campos");
            return;
        }
        if(!emailValidator($useremail.value)){
            alert("Introduzca un email válido");
            return;
        }
        try{
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            let flag=false;
            users.forEach(user => {
                if(user.email===$useremail.value&&user.password===$password.value){
                    flag=true;
                    $form.reset();
                    localStorage.setItem("token", user.id);
                    navigateTo('/dashboard');
                }
            });
            if(flag==false){
                throw new Error("Usuario o contraseña incorrectos");
            }
        }catch(error){
            alert("Ocurrió un error "+error)
        }
    });
    $registerBtn.addEventListener('click',()=>navigateTo('/register'));
}