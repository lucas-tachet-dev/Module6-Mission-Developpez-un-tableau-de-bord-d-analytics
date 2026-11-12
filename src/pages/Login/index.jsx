import { useState } from "react";
import styles from "./login.module.css"
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useUser();

    const navigate = useNavigate();
    
    //fonction de gestion du form login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(username, password);
            navigate("/dashboard", {replace : true})
        } catch (error) {
            console.error("erreur de co", error)
        }
    }
    
    return(
            <main className={styles.mainLogin}>
                <section className={styles.sectionContainer}>
                    <img 
                        src="./public/logo.png"
                        alt="Logo Sportsee"
                        />
                    <div className={styles.loginContainer}>
                        <h1>Transformez<br />vos stats en résultats</h1>
                        <h2>Se connecter</h2>
                        <form onSubmit={handleSubmit} className={styles.formContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="user">Nom d'utilisateur</label>
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <button type="submit" className={styles.loginButton}>Se connecter</button>
                        </form>
                        <p>Mot de passe oublié ?</p>
                    </div>
                </section>
                <span>Analysez vos performances en un clin d’œil,<br />
                    suivez vos progrès et atteignez vos objectifs.
                </span>
            </main>
    )
}

export default Login