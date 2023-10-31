import React, {Component, useState, ChangeEvent, FormEvent, useEffect} from 'react';

import styles from '../App.module.css'
//footer
//header
import axios from 'axios';

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

        axios.post('http://127.0.0.1:8000/api/cadastrar/Profissional',
        dados,
        {
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
        ).then(function(response){
            window.location.href = "/listagem/Servico"
        }).catch(function(error){
            console.log(error)
        });
}

const handleState = (e: ChangeEvent <HTMLInputElement>)=>{
    if(e.target.name === "nome"){
        setNome(e.target.value);
    }
    if(e.target.name === "email"){
        setDescricao(e.target.value);
    }
    if(e.target.name === "cpf"){
        setDuracao(e.target.value);
    } 
    if(e.target.name === "dataNascimento"){
        setPreco(e.target.value);
    }
    
}


return (
    <div>
     
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
                                    <input type="email" name='descricao' className='form-control'required  onChange={handleState}/>
                                    
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Duração</label>
                                    <input type="text" name='curacao' className='form-control' required  onChange={handleState}/>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Preço</label>
                                    <input type="date" name='preco' className='form-control' required  onChange={handleState}/>
                                </div>
                                
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success btn-sm'>Cadastrar</button>
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

