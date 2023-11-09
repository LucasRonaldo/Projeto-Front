import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from '../App.module.css'

import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditarCliente = () => {


    const [nome, setNome] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [pais, setPais] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [id, setId] = useState<number>();

    const parametro = useParams();

    const atualizarCliente = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            id: id,
            nome: nome,
            email: email,
            cpf: cpf,
            dataNascimento: dataNascimento,
            cidade: cidade,
            estado: estado,
            celular: celular,
            pais: pais,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            complemento: complemento

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
                setNome(response.data.data.nome)
                setEmail(response.data.data.email)
                setCpf(response.data.data.cpf)
                setId(response.data.data.id)
                setDataNascimento(response.data.data.dataNascimento)
                setCidade(response.data.data.cidade)
                setEstado(response.data.data.estado)
                setCelular(response.data.data.celular)
                setPais(response.data.data.pais)
                setRua(response.data.data.rua)
                setNumero(response.data.data.numero)
                setBairro(response.data.data.bairro)
                setCep(response.data.data.cep)
                setComplemento(response.data.data.complemento)


            } catch (error) {
                console.log("erro ao buscar dados pelo id")
            }

        }
        fetchData();
    }, [])

    
        const handleState = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.name === "nome") {
                setNome(e.target.value);
            }
            if (e.target.name === "email") {
                setEmail(e.target.value);
            }
            if (e.target.name === "cpf") {

                setCpf(e.target.value);

            }
            if (e.target.name === "dataNascimento") {
                setDataNascimento(e.target.value);
            }
            if (e.target.name === "cidade") {
                setCidade(e.target.value);
            }
            if (e.target.name === "estado") {
                setEstado(e.target.value);
            }
            if (e.target.name === "celular") {
                setCelular(e.target.value);
            }
            if (e.target.name === "pais") {
                setPais(e.target.value);
            }
            if (e.target.name === "rua") {
                setRua(e.target.value);
            }
            if (e.target.name === "numero") {
                setNumero(e.target.value);
            }
            if (e.target.name === "bairro") {
                setBairro(e.target.value);
            }
            if (e.target.name === "cep") {
                setCep(e.target.value);
            }
            if (e.target.name === "complemento") {
                setComplemento(e.target.value);
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
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" value={nome} name='nome' id='nome' className='form-control' required onChange={handleState} />

                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label ' >E-mail</label>
                                    <input type="email" value={email} name='email' className='form-control' required onChange={handleState} />

                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>CPF</label>
                                    <input type="text" value={cpf} name='cpf' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Data de Nascimento</label>
                                    <input type="date" value={dataNascimento} name='dataNascimento' className='form-control' required onChange={handleState} />
                                </div>


                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Cep</label>
                                    <input type="text" value={cep} name='cep' className='form-control' required  onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Estado</label>
                                    <input type="text"  name='estado' value={estado} className='form-control' required onChange={handleState} />
                                </div>

                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Cidade</label>
                                    <input type="text" value={cidade} name='cidade' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Celular</label>
                                    <input type="text" value={celular} name='celular' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Pais</label>
                                    <input type="text" value={pais} name='pais' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Rua</label>
                                    <input type="text" value={rua} name='rua' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Numero</label>
                                    <input type="text" value={numero} name='numero' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Bairro</label>
                                    <input type="text" value={bairro} name='bairro' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Complemento</label>
                                    <input type="text" value={complemento} name='complemento' className='form-control' required onChange={handleState} />
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
    export default EditarCliente;