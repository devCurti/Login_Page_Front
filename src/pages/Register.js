import styles from './Register.module.css'
import userPNG from '../img/user.png'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../api/api"
import { object, string} from 'yup';

function Register() {

    const navigate = useNavigate("");


    async function validate() {

        let userSchema = object({
            confirmPassword: string().required("É necessário preencher o campo de confirmação de senha!"),
            password: string().required("É necessário preencher o campo de senha!"),
            email: string().email("O e-mail deve ser válido!").required("É necessário inserir seu e-mail!"),
            name: string().required("É necessário digitar seu nome!")
        });




        try {
            await userSchema.validate(user);
            return true;
        } catch (err) {
            console.log(err)
            toast.error(err.errors, {
                style: {
                    border: '1px solid #fc1303',
                    color: '#fc1303',
                }
            })
            return false;
        }
    }

    async function submit() {

        let obj = {
            id: null,
            name: name,
            email: email,
            password: password
        }

        if (!(await validate())) return;

        if (!verifyEmail()) return;

        if (!verifyPasswordMatch()) return;


        axios.post("http://localhost:8080/users", obj)
            .then(response => console.log(response.data))
            .catch(error => console.log(error.data))


        setTimeout(() => {
            navigate("/login")
        }, 2000)
        toast.success("Usuário criado com sucesso!")



    }


    useEffect(() => {
        api
            .get("/users")
            .then((response) => setUsers(response.data))
            .catch((err) => {
                console.error(err.data);
            });
    }, []);

    const verifyEmail = () => {
        const emailExist = users.some(e => e.email === email);
        if (emailExist) {
            toast.error("Email já existente!", {
                style: {
                    border: '1px solid #fc1303',
                    color: '#fc1303',
                }
            })
            return false
        } else {
            return true
        }
    }

    const verifyPasswordMatch = () => {
        if (password !== confirmPassword) {
            toast.error("As senhas não são iguais!", {
                style: {
                    border: '1px solid #fc1303',
                    color: '#fc1303',
                }
            })
            return false
        } else {
            return true
        }
    }


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [users, setUsers] = useState("");
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        setUser({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })


    }, [confirmPassword, password, email, name])




    return (
        <div className={styles.register_container}>
            <div className={styles.register_inner_container}>
                <Toaster position='top-right' reverseOrder={false} />
                <img src={userPNG} alt='userPNG'></img>
                <form>
                    <div className={styles.inputs_container}>
                        <input type='text'
                            id='name'
                            name='name'
                            placeholder='Nome'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputs_container}>
                        <input type='email'
                            id='email'
                            name='email'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputs_container}>
                        <input type='password'
                            id='password'
                            name='password'
                            placeholder='Senha'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputs_container}>
                        <input type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder='Confirmar senha'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                </form>
                    <button onClick={submit}>Cadastro</button>
            </div>
        </div>
    )
}

export default Register;