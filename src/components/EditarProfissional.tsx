import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from '../App.module.css'

import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditarProfissional = () => {


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
    const [salario, setSalario] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");

    const [id, setId] = useState<number>();

    const parametro = useParams();

    const atualizarProfissional = (e: FormEvent) => {
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
            salario: salario,
            complemento: complemento

        }

        axios.put('http://127.0.0.1:8000/api/update/profissional',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                if (response.data.status == true) {
                    Swal.fire({
                        title: "Atualizado",
                        text: "O Profissional foi atualizado com sucesso!",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    window.setTimeout(() => {
                        window.location.href = "/listagem/profissional";
                    }, 3600);

                }
                else {
                    Swal.fire({
                        title: "Erro",
                        text: "O Profissional não foi atualizado!",
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
                const response = await axios.get("http://127.0.0.1:8000/api/find/profissional/" + parametro.id);
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
                setSalario(response.data.data.salario)
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
        if (e.target.name === "salario") {
            setSalario(e.target.value);
        }
        if (e.target.name === "complemento") {
            setComplemento(e.target.value);
        }

    }

    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container'>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Profissional</h5>
                            <form onSubmit={atualizarProfissional} className='row g-3'>
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
                                    <input type="text" value={cep} name='cep' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Estado</label>
                                    <input type="text" name='estado' value={estado} className='form-control' required onChange={handleState} />
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
                                    <label htmlFor="salario" className='form-label'>Salario</label>
                                    <input type="text" value={salario} name='salario' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Complemento</label>
                                    <input type="text" value={complemento} name='complemento' className='form-control' required onChange={handleState} />
                                </div>

                                <div className='col-12 '>
                                    <button type='submit' className="cssbuttons-io-button centralizar " >
                                        Atualizar
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="grey" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
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
export default EditarProfissional;