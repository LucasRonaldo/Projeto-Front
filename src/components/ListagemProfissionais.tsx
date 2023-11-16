import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import styles from "../App.module.css";
import { ProfissionalInterface } from '../interfaces/ProfissionalInterface';
import NavBar from './NavBar';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const ListagemProfissional = () => {

    const [profissionais, setProfissionais] = useState<ProfissionalInterface[]>([]);
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
                const response = await axios.post('http://127.0.0.1:8000/api/nome/Profissional',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if (true == response.data.status) {
                        setProfissionais(response.data.data)
                        console.log(response.data.data)
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
                const response = await axios.get('http://127.0.0.1:8000/api/all/Profissional');
                if( response.data.status == true){
                    setProfissionais(response.data.data);
                }
                else{
                    
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Não há nenhum registro no sistema",
                            footer: '<a href="/cadastro/Profissional">Clique aqui para cadastrar</a>'
                          });
                    
                }


            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);
            }
        }

        fetchData();
    }, []);

    function handleDelete(id: number) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, exclua-o!",
            cancelButtonText: "Não, cancele!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "O cliente foi excluido",
                    icon: "success"
                });

                axios.delete('http://127.0.0.1:8000/api/excluir/profissional/' + id)
                    .then(function (response) {
                        window.location.href = "/listagem/profissional"
                    }).catch(function (error) {
                        console.log("ocorreu um erro")
                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O Profissional não foi excluido :)",
                    icon: "error"
                });
            }
        });



    }


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
                                        <th>CPF</th>
                                        <th>E-mail</th>
                                        <th>Data de Nascimento</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>celular</th>
                                        <th>pais</th>
                                        <th>rua</th>
                                        <th>numero</th>
                                        <th>bairro</th>
                                        <th>cep</th>
                                        <th>Salario</th>
                                        <th>Complemento</th>



                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profissionais.map(Profissional => (
                                        <tr key={Profissional.id}>
                                            <td>{Profissional.id}</td>
                                            <td>{Profissional.nome}</td>
                                            <td>{Profissional.email}</td>
                                            <td>{Profissional.cpf}</td>
                                            <td>{Profissional.dataNascimento}</td>
                                            <td>{Profissional.cidade}</td>
                                            <td>{Profissional.estado}</td>
                                            <td>{Profissional.celular}</td>
                                            <td>{Profissional.pais}</td>
                                            <td>{Profissional.rua}</td>
                                            <td>{Profissional.numero}</td>
                                            <td>{Profissional.bairro}</td>
                                            <td>{Profissional.cep}</td>
                                            <td>{Profissional.salario}</td>
                                            <td>{Profissional.complemento}</td>


                                            <td>
                                                
                                            <Link to={"/profissional/editar/" + Profissional.id}  className='btn btn-primary btn-sm'>Editar</Link>
                                            <a onClick={e => handleDelete(Profissional.id)} className='btn btn-danger btn-sm'>Excluir</a>
                                          
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
export default ListagemProfissional;
