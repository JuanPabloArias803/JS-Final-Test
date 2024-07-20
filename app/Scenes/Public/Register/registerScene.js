import { emailValidator } from "../../../Helpers/emailValidator";
import { navigateTo } from "../../../Router";
import styles from './register.css';

export function RegisterScene(){
    const root=document.querySelector('#root');
    root.innerHTML=`
        <form class="${styles.form}">
            <h2>Registrate</h2>
            <input type="text" placeholder="Tu nombre completo"></input>
            <span>
                <label for="birthday">Fecha de Nacimiento</label>
                <input id="birthday" type="date"></input>
            </span>
            <input type="email" placeholder="Tu Email" autocomplete="email"></input>
            <input type="password" placeholder="Tu contraseña"></input>
            <button type="submit">Registrarse</button>
        </form>
    `;

    //logica
    const $username=root.querySelector('input[type="text"]');
    const $useremail=root.querySelector('input[type="email"]');
    const $password=root.querySelector('input[type="password"]');
    const $birthday=root.querySelector('#birthday');
    const $form=root.querySelector('form');
    $form.addEventListener('submit',async (event)=>{
        event.preventDefault();
        if(!$username.value||!$useremail.value || !$password.value || !$birthday.value){
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
            users.forEach(user => {
                if(user.email===$useremail.value){
                    throw new Error("El email ya ha sido registrado");
                }
            });
            await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name': $username.value,
                    'email': $useremail.value,
                    'birthday':$birthday.value,
                    'password': $password.value,
                    'role':'user',
                })
            });
            $form.reset();
            alert("Te registraste exitosamente!");
            navigateTo('/login');
        }catch(error){
            alert("Ocurrió un error "+error)
        }
    });
}