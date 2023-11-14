import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from "../App.module.css";
import { ServicoInterface } from '../interfaces/ServicoInterface';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';


const ListagemServico = () => {

    const [servicos, setServicos] = useState<ServicoInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/nome/Servico',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if( response.data.status == true){
                        setServicos(response.data.data);
                    }
                    else{
                        
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Não há nenhum registro no sistema",
                                footer: '<a href="/cadastro/Servico">Clique aqui para cadastrar</a>'
                              });
                        
                    }
                }).catch(function (error) {
                    console.log(error)
                });

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/Servico');
                if (true === response.data.status) {
                    
                    setServicos(response.data.data)
                    
                    
                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Não há nenhum registro no sistema",
                        footer: '<a href="/cadastro/Servico">Clique aqui para cadastrar</a>'
                      });

                }
            } catch (error) {
                setError("Ocorreu um erro");
                
                
            }
        }

        fetchData();
    }, []);


    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container  wm-100 w-auto'>

                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    Pesquisar
                                </h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control'
                                            onChange={handleState} />

                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-success'>Pesquisar</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'> Listagem de Profissionais</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Duração</th>
                                        <th>Preço</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicos.map(servicos => (
                                        <tr key={servicos.id}>
                                            <td>{servicos.id}</td>
                                            <td>{servicos.nome}</td>
                                            <td>{servicos.descricao}</td>
                                            <td>{servicos.duracao}</td>
                                            <td>{servicos.preco}</td>


                                            <td>
                                            <Link to={"/servico/editar/" + servicos.id}  className='btn btn-primary btn-sm'>Editar</Link>
                                                <a href="#" className='btn btn-danger btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
export default ListagemServico;

