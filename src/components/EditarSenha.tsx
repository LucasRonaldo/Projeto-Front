import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from '../App.module.css'

import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


const EditarSenha = () => {


   
    const [email, setEmail] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
   
    const [id, setId] = useState<number>();

    const parametro = useParams();

    const atualizarCliente = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            id: id,
           
            email: email,
            cpf: cpf,
           
        }

        axios.put('http://127.0.0.1:8000/api/update/Cliente',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                if(response.data.status == true){
                    Swal.fire({
                        title: "Atualizado",
                        text: "O cliente foi atualizado com sucesso!",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    window.setTimeout(() => {
                        window.location.href = "/listagem/Cliente";
                     }, 3600);
    
                }
                else{
                    Swal.fire({
                        title: "Erro",
                        text: "O cliente não foi atualizado!",
                        icon: "error",
                        timer: 3000,
                        showConfirmButton: false
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
                
                setEmail(response.data.data.email)
               


            } catch (error) {
                console.log("erro ao buscar dados pelo id")
            }

        }
        fetchData();
    }, [])

    
        const handleState = (e: ChangeEvent<HTMLInputElement>) => {
           
            if (e.target.name === "email") {
                setEmail(e.target.value);
            }
           
            
        }

        return (
            <div>
            <NavBar/>
            <main className={styles.main}>
                <div className='container'>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Clientes</h5>
                            <form onSubmit={atualizarCliente} className='row g-3'>
                               
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label ' >E-mail</label>
                                    <input type="email" value={email} name='email' className='form-control' required onChange={handleState} />

                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>CPF</label>
                                    <input type="text" value={cpf} name='cpf' className='form-control' required onChange={handleState} />
                                </div>
                               
                                
                                <div className='col-12 '>
                                    <button type='submit' className="cssbuttons-io-button centralizar " >
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
                                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
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