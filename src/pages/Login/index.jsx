import { useState } from "react";
import { loginUser } from "../../../data/authService";
import "./login.css"
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    //fonction de gestion du form login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(username, password);
            console.log(response);
            onLogin(response.token);
            navigate("/dashboard", {replace : true})
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
            <main>
                <section className="sectionContainer">
                    <img 
                        src="./public/logo.png"
                        alt="Logo Sportsee"
                        className="logoLogin"/>
                    <div className="loginContainer">
                        <h1>Transformez<br />vos stats en résultats</h1>
                        <h2>Se connecter</h2>
                        <form onSubmit={handleSubmit} className="formContainer">
                            <div className="inputContainer">
                                <label htmlFor="user">Nom d'utilisateur</label>
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <button type="submit" className="loginButton">Se connecter</button>
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