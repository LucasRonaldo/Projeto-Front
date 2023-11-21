import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from '../App.module.css'

import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ClienteInterface } from '../interfaces/ClienteInterface';


const EditarSenha = () => {


    const [clientes, setClientes] = useState<ClienteInterface[]>([]);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
   
    const [id, setId] = useState<number>();

    const parametro = useParams();
    const handleStatee = (e: ChangeEvent<HTMLInputElement>) => {
           
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        
        
       
        
    }

    const atualizarSenha = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            id: id,
           
            email: email,
            
           
        }



        axios.put('http://127.0.0.1:8000/api/recuperar/senha/Cliente',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                if(response.data.status === true){
                    

                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });

                    Toast.fire({
                        icon: "success",

                        title:  "Sucesso",
                        text: "Senha foi redefinida para o CPF"
                    });
                    
                   
                        

                    


                    window.setTimeout(() => {
                       // window.location.href = "/listagem/Cliente";
                     }, 3600);
    
                }
                else{
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    
                    Toast.fire({
                        icon: "error",

                        title:  "Error",
                        text: response.data.status
                    });
                
                }
               
                
            }).catch(function (error) {
                console.log(error)
               
            });



    }

    
    

    

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/find/Cliente/" + parametro.id);
                if(response.data.status === true){

                    setEmail(response.data.data.email)
                }
               


            } catch (error) {
                console.log("erro ao buscar dados pelo id")
            }

        }
        fetchData();
    }, [])

    
       

        return (
            <div>
            <NavBar/>
            <main className={styles.main}>
                <div className='container'>

                    <div className='card'>
                        <div className='card-body'>
                        <h1 className='card-title display-6 '>Redefinir senha</h1>
                            <form onSubmit={atualizarSenha} className='row g-3'>
                               
                                <div className='col-12'>

                                    
                                    <label htmlFor="email" className='form-label ' >E-mail</label>
                                    <input type="email"   name='email' className='form-control' required onChange={handleStatee} />

                                </div>
                                
                               
                                
                                <div className='col-12 '>
                                    <button  type='submit' className="cssbuttons-io-button centralizar " >
                                        Atualizar
                                        <div className="icon">
                                            <svg
                                                height="24"
                                                width="24"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                <path
                                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13h1v-2z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

        </div>
        )
    }
    export default EditarSenha;