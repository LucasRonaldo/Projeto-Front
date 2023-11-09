import React, {Component, useState, ChangeEvent, FormEvent, useEffect} from 'react';

import styles from '../App.module.css'
//footer
//header
import axios from 'axios';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

const CadastroServico = () => {

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao]= useState<string>("");
    const [duracao, setDuracao]= useState<string>("");
    const [preco, setPreco]= useState<string>("");
   

    const cadastrarProfissional =(e: FormEvent) => {
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
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
        ).then(function(response){
            if(response.data.status == true){

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
            else{
               
                Swal.fire({
                    title: "Erro",
                    text: "O cliente não foi cadastrado!",
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false
                });
            }
            
           
        }).catch(function(error){
            console.log(error)
           
        });
}

const handleState = (e: ChangeEvent <HTMLInputElement>)=>{
    if(e.target.name === "nome"){
        setNome(e.target.value);
    }
    if(e.target.name === "descricao"){
        setDescricao(e.target.value);
    }
    if(e.target.name === "duracao"){
        setDuracao(e.target.value);
    } 
    if(e.target.name === "preco"){
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
                            <h5 className='card-title'>Cadastrar Profissionais</h5>
                            <form onSubmit={cadastrarProfissional} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label' >Descrição</label>
                                    <input type="text" name='descricao' className='form-control'required  onChange={handleState}/>
                                    
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Duração</label>
                                    <input type="text" name='duracao' className='form-control' required  onChange={handleState}/>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Preço</label>
                                    <input type="number" name='preco' className='form-control' required  onChange={handleState}/>
                                </div>
                                
                                <div className='col-12'>
                                <button type='submit' className="cssbuttons-io-button centralizar " >
                                       Cadastrar
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

export default CadastroServico;

