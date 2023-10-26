import React from "react";

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import CadastroCliente from "../components/CadastroClientes";
import ListagemCliente from "../components/ListagemCliente";

import CadastroProfissional from"../components/CadastroProfissional";
import ListagemProfissional from "../components/ListagemProfissionais";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
              
                <Route path="cadastro/Cliente" element={<CadastroCliente />} />
                <Route path="listagem/Cliente" element={<ListagemCliente />} />
                <Route path="cadastro/profissional" element={<CadastroProfissional />} />
                <Route path="listagem/profissional" element={<ListagemProfissional />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;