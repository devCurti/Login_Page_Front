import styles from './Login.module.css';
import userPNG from '../img/user.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import api from '../api/api';
import toast, { Toaster } from 'react-hot-toast'
import {AiOutlineMail} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState();

    useEffect(() => {
        api
            .get("/users")
            .then((response) => setUsers(response.data))
            .catch((err) => {
                console.error(err.data);
            });
    }, []);


    function verifyLogin() {
        const foundUser = users.find((e) => e.email === email);
        if(foundUser){
            return foundUser.password === password;
        }
        return
    }

    function verifyEmptyInput(){
        if(email === "" || password === ""){
            
            toast.error("Os campos não podem ser nulos!", {
                style: {
                    border: '1px solid #fc1303',
                    color: '#fc1303',
                }
            })
            return false;
        }
        return true;
    }


    async function login() {
        if(! await verifyEmptyInput()) return;
        if (! await verifyLogin()){
            toast.error("Usuário ou senha inválida!", {
                style: {
                    border: '1px solid #fc1303',
                    color: '#fc1303',
                }
            })
            return;
        }
        const foundUser = users.find((e) => e.email === email);
        toast.success("Logado com sucesso!")
        setTimeout(() => {
            navigate("/home", {
                state: {
                    name: foundUser.name,
                    email: foundUser.email
                }
            });
        }, 2000)  
    }
    

    return (
        <div className={styles.login_container}>
            <Toaster position='top-right' reverseOrder={false} />
            <div className={styles.login_inner_container}>
            <img src={userPNG} alt='userPNG'></img>
            <form>
                <div className={styles.inputs_container}>
                    <AiOutlineMail className={styles.icons}/>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.inputs_container}>
                    <RiLockPasswordLine className={styles.icons}/>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Senha'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </form>
            <div>
                <button onClick={login}>Login</button>
            </div>
            <div>
                <Link to="/register"><button>Cadastro</button></Link>
            </div>
            <div className={styles.login_container_bottom}>
                <p>Recuperar senha</p>
            </div>
        </div>
        </div>
    )
}

export default Login;