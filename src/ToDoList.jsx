import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './ToDoList.css'
import Icone from "./assets/icon.png"
import IconeReact from "./assets/react.svg"
import IconeVite from "./assets/vite.svg"


function ToDoList() {

    const listaStorage = localStorage.getItem('Lista');
    const initialLista = listaStorage ? JSON.parse(listaStorage) : [];
    const [lista, setLista] = useState(initialLista);
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista])

    function adicionarItem(form) {
        form.preventDefault();
        if (!novoItem) {
            return;
        }
        setLista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem("");
        document.getElementById('txt').focus();
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deletar(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletarTudo() {
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>

            <form onSubmit={adicionarItem}>
                <input
                    value={novoItem}
                    onChange={(e) => { setNovoItem(e.target.value) }}
                    type="text"
                    name="txt"
                    id="txt"
                    placeholder="Digite uma tarefa!"
                />
                <button className="add" type="submit">Adicionar</button>
            </form>

            <div className="listaTarefas">
                <div style={{ textAlign: 'center' }}>

                    {
                        lista.length < 1
                            ?
                            <img id="icone-central" src={Icone} alt="to-do list" width={300} />
                            :
                            lista.map((item, index) => (
                                <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                                    <span onClick={() => { clicou(index) }}>{item.text}</span>
                                    <button onClick={() => { deletar(index) }} className="del">Deletar</button>
                                </div>
                            ))

                    }

                    {
                        lista.length > 0 &&
                        <button onClick={() => { deletarTudo() }} className="deleteAll">Limpar</button>
                    }
                    <div className="iconesReactVite">
                        <img id="iconereact" src={IconeReact} alt="Icone React" />
                        <img id="iconevite" src={IconeVite} alt="Icone Vite" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoList