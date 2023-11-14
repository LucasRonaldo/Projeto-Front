import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from '../App.module.css'

import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditarServico = () => {


    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao]= useState<string>("");
    const [duracao, setDuracao]= useState<string>("");
    const [preco, setPreco]= useState<string>("");
    const [id, setId] = useState<number>();

    const parametro = useParams();

    const atualizarServico = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            id: id,
            nome: nome,
            descricao: descricao,
            duracao: duracao,
            preco: preco

        }

        axios.put('http://127.0.0.1:8000/api/update/Servico',
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
                        text: "O Servico foi atualizado com sucesso!",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    window.setTimeout(() => {
                        window.location.href = "/listagem/Servico";
                     }, 3600);
    
                }
                else{
                    Swal.fire({
                        title: "Erro",
                        text: "O Servico não foi atualizado!",
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
                const response = await axios.get("http://127.0.0.1:8000/api/find/servico/" + parametro.id);
                setNome(response.data.data.nome)
                setDescricao(response.data.data.descricao)
                setDuracao(response.data.data.duracao)
                setId(response.data.data.id)
                setPreco(response.data.data.preco)
                console.log(response.data.data)
                


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
            <NavBar/>
            <main className={styles.main}>
                <div className='container'>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Servicos</h5>
                            <form onSubmit={atualizarServico} className='row g-3'>
                            <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" value={nome} name='nome' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="descricao" className='form-label' >Descrição</label>
                                    <input type="text" value={descricao} name='descricao' className='form-control'required  onChange={handleState}/>
                                    
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="duracao" className='form-label'>Duração</label>
                                    <input type="text" value={duracao} name='duracao' className='form-control' required  onChange={handleState}/>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="preco" className='form-label'>Preço</label>
                                    <input type="number" value={preco} name='preco' className='form-control' required  onChange={handleState}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

        </div>
        )
    }
    export default EditarServico;