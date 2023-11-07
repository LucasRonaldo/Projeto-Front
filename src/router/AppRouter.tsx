import React from "react";

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import CadastroCliente from "../components/CadastroClientes";
import ListagemCliente from "../components/ListagemCliente";

import CadastroProfissional from"../components/CadastroProfissionais";
import ListagemProfissional from "../components/ListagemProfissionais";


import CadastroServico from"../components/CadastroServico";
import ListagemServico from "../components/ListagemServico";
import EditarCliente from "../components/EditarCliente";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
              
                <Route path="cadastro/cliente" element={<CadastroCliente />} />
                <Route path="listagem/cliente" element={<ListagemCliente />} />
                <Route path="cadastro/profissional" element={<CadastroProfissional />} />
                <Route path="listagem/profissional" element={<ListagemProfissional />} />
                <Route path="cadastro/servico" element={<CadastroServico />} />
                <Route path="listagem/servico" element={<ListagemServico />} />
                <Route path="/editar/:id" element={<EditarCliente/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;