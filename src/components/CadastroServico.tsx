import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import styles from '../App.module.css'
//footer
//header
import axios from 'axios';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

const CadastroServico = () => {

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [duracao, setDuracao] = useState<string>("");
    const [preco, setPreco] = useState<string>("");


    const cadastrarProfissional = (e: FormEvent) => {
        e.preventDefault();


        const dados = {
            nome: nome,
            descricao: descricao,
            duracao: duracao,
            preco: preco

        }

        axios.post('http://127.0.0.1:8000/api/cadastrar/Servico',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        ).then(function (response) {
            if (response.data.status == true) {

                Swal.fire({
                    title: "Cadastrado",
                    text: "O cliente foi cadastrado com sucesso",
                    icon: "success",
                    timer: 6000,
                    showConfirmButton: false
                });

                window.setTimeout(() => {
                    window.location.href = "/listagem/Servico";
                }, 3600);
            }
            else {

                Swal.fire({
                    title: "Erro",
                    text: "O cliente não foi cadastrado!",
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false
                });
            }


        }).catch(function (error) {
            console.log(error)

        });
    }

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "nome") {
            setNome(e.target.value);
        }
        if (e.target.name === "descricao") {
            setDescricao(e.target.value);
        }
        if (e.target.name === "duracao") {
            setDuracao(e.target.value);
        }
        if (e.target.name === "preco") {
            setPreco(e.target.value);
        }

    }


    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                        <h1 className='card-title display-6 '>Cadastrar Serviços</h1>
                        <hr />
                            <form onSubmit={cadastrarProfissional} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" placeholder='Digite o nome' name='nome' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label' >Descrição</label>
                                    <input type="text" placeholder='Digite a descrição' name='descricao' className='form-control' required onChange={handleState} />

                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cpf" className='form-label'>Duração</label>
                                    <input type="text" placeholder='Ex: 12' name='duracao' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cpf" className='form-label'>Preço</label>
                                    <input type="number" name='preco' placeholder='Ex: 20.50' className='form-control' required onChange={handleState} />
                                </div>

                                <div className='col-12'>
                                    <button type='submit' className="cssbuttons-io-button centralizar " >
                                        Cadastrar
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9e9e9e" className="bi bi-scissors" viewBox="0 0 16 16">
                                                <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
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

export default CadastroServico;

