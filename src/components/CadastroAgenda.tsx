import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '../App.module.css'
import '../components/style.css'
import NavBar from './NavBar';
import Swal from 'sweetalert2';

import { ProfissionalInterface } from "../interfaces/ProfissionalInterface";
import { ServicoInterface } from "../interfaces/ServicoInterface";


import axios from 'axios';
import { Link } from 'react-router-dom';

const CadastroAgenda = () => {



    const [profissional_id, setProfissional_id] = useState<string>("");
    const [dataHora, setDataHora] = useState<string>("");
    
    const [profissional, setProfissional] = useState<ProfissionalInterface[]>([]);
    const [servico, setServico] = useState<ServicoInterface[]>([]);
   

    const cadastrarAgenda = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            profissional_id: profissional_id,
            data_hora: dataHora,


        }
        console.log(dados)
        axios.post('http://127.0.0.1:8000/api/cadastrar/agenda', dados,

            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (true === response.data.status) {
                    Swal.fire({
                        title: "Cadastrado com sucesso",
                        text: "redirecionando para Listagem...",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 3000
                    });

                    window.setTimeout(() => {
                        window.location.href = "/agendamento/profissional"
                    }, 3600);
                    console.log(response.data)
                }
                else {
                    Swal.fire({
                        title: "Erro",
                        text: "não foi agendado",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 3000
                    });

                }
            }).catch(function (error) {
                console.log(error)
            })
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/Profissional  ');
                if (true == response.data.status) {
                    setProfissional(response.data.data)
                    console.log(profissional);
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Ocorreu um erro",
                    text: "XXXXXXXXXXXXXXXX ",
                    icon: "error"
                });
            }
        }

        fetchData();
    }, []);

   
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/servico  ');
                if (true == response.data.status) {
                    setServico(response.data.data)
                    console.log(servico);
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Ocorreu um erro",
                    text: "XXXXXXXXXXXXXXXX ",
                    icon: "error"
                });
            }
        }

        fetchData();
    }, []);

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {

     
        if (e.target.name === "data_hora") {
            setDataHora(e.target.value);
        }   
       
       
    }

    const handleProfissional = (e: ChangeEvent<HTMLSelectElement>) => {
       
            setProfissional_id(e.target.value);
       
    }
    


  
    return (
        <div>
            <NavBar />


            <main>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Agenda</h5>
                            <form onSubmit={cadastrarAgenda} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Profissional_Id</label>
                                    <select name='profissional_id' id='profissional_id ' className='form-control' required onChange={handleProfissional}  >
                                        <option value="0">Selecione um Profissional</option>
                                        {profissional.map(profissional => (
                                            <option key={profissional.id} value={profissional.id}>
                                                {profissional.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='col-6'>
                                    <label htmlFor="data_hora" className='form-label' >Data e hora</label>
                                    <input type="datetime-local" name='data_hora' className='form-control' required onChange={handleState} />
                                </div>                
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success btn-sm'>Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <nav className="navbar fixed-bottom ">
                <div className="container-fluid">
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/cadastro/agenda/"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg></Link>

                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/cadastro/profissional/"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg></Link>
                </div>

            </nav>
        </div>
    )
}

export default CadastroAgenda;

