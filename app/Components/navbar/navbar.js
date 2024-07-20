import styles from './navbar.css'

export function Navbar(userName,userRole){
    const role=(userRole=="admin")?' (admin)':'';
    const createFlight=(userRole=="admin")?'<button id="createFlight">Crear Vuelo</button>':'';
    return `
        <nav class="${styles.navbar}">
            <p>Bienvenido ${userName}${role}</p>
            <span>
                ${createFlight}
                <button id="logout">Cerrar Sesión</button>
            </span>
        </nav>
    `;
}