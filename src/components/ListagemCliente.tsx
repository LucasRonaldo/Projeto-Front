import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from "../App.module.css";
import Swal from 'sweetalert2';

import { ClienteInterface } from '../interfaces/ClienteInterface';
import { Link } from 'react-router-dom';


const ListagemCliente = () => {

    const [clientes, setClientes] = useState<ClienteInterface[]>([]);
    const [email, setEmail] = useState<ClienteInterface[]>([]);
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
                const response = await axios.post('http://127.0.0.1:8000/api/nome/Cliente',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if (true === response.data.status) {
                        setClientes(response.data.data)
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
                const response = await axios.get('http://127.0.0.1:8000/api/all/Cliente');
                if (response.data.status == true) {
                    setClientes(response.data.data);
                }
                else {

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Não há nenhum registro no sistema",
                        footer: '<a href="/cadastro/Cliente">Clique aqui para cadastrar</a>'
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

                axios.delete('http://127.0.0.1:8000/api/excluir/cliente/' + id)
                    .then(function (response) {
                        window.location.href = "/listagem/Cliente"
                    }).catch(function (error) {
                        console.log("ocorreu um erro")
                    })
            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O Cliente não foi excluido :)",
                    icon: "error"
                });
            }
        });



    }

    

    const recuperarCpf = (e: FormEvent) => {

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/recuperar/senha ',
                    { nome: email },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if (true === response.data.status) {
                        setClientes(response.data.cpf)
                        console.log(response.data.cpf)
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

    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container mw-100 w-auto'>

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
                            <h5 className='card-title'> Listagem de Clientes</h5>
                            <table className='table table-hover '>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>CPF</th>
                                        <th>Data de Nascimento</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>celular</th>
                                        <th>pais</th>
                                        <th>rua</th>
                                        <th>numero</th>
                                        <th>bairro</th>
                                        <th>cep</th>
                                        <th>Complemento</th>



                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {clientes.map(cliente => (
                                        <tr key={cliente.id}>
                                            <td>{cliente.id}</td>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.email}</td>
                                            <td>{cliente.cpf}</td>
                                            <td>{cliente.dataNascimento}</td>
                                            <td>{cliente.cidade}</td>
                                            <td>{cliente.estado}</td>
                                            <td>{cliente.celular}</td>
                                            <td>{cliente.pais}</td>
                                            <td>{cliente.rua}</td>
                                            <td>{cliente.numero}</td>
                                            <td>{cliente.bairro}</td>
                                            <td>{cliente.cep}</td>
                                            <td>{cliente.complemento}</td>


                                            <td>
                                                <Link to={"/cliente/editar/" + cliente.id} className='btn btn-primary btn-sm'>Editar</Link>
                                                <a onClick={e => handleDelete(cliente.id)} className='btn btn-danger btn-sm'>Excluir</a>
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
export default ListagemCliente;
