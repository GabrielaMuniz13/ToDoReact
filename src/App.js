import React, { Component } from "react";
import "./App.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import api from "./services/api.js";

export default class App extends Component {
  state = {
    tarefas: [],
    tarefa: "",
    descricao: "",
    responsavel: "",
  };

  novaTarefa() {
    api
      .post("http://localhost:4000/novaTarefa", { tarefa: this.state.tarefa, descricao: this.state.descricao, responsavel: this.state.responsavel })
      .then((resp) => {
        console.log(resp.data);
      });
  }

  deletarTarefa(){
    api
    .delete("http://localhost:4000/delete/tarefa/", { tarefa: this.state.tarefa, descricao: this.state.descricao, responsavel: this.state.responsavel })
    .then((resp) => {
      console.log(resp.data);
    });
  }

  async carregarTarefas() {
    await api.get("http://localhost:4000/tarefas").then((resp) => {
      console.log(resp.data);
      this.setState({ tarefas: resp.data });
    });
  }

  componentDidMount() {
    this.carregarTarefas();
  }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <h3>To do list</h3>
          </div>
          <div>
            <div className="form-row">
              <div className="form-group col-10">
                <input
                  style={{ marginTop: 25 }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Digite o nome da tarefa"
                  value={this.state.tarefa}
                  onChange={(e) => {
                    this.setState({ tarefa: e.target.value });
                  }}
                />
              
              <input
                  style={{ marginTop: 25 }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Digite a descrição tarefa"
                  value={this.state.descricao}
                  onChange={(e) => {
                    this.setState({ descricao: e.target.value });
                  }}
                />
              <input
                  style={{ marginTop: 25 }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Digite o nome do responsavel tarefa"
                  value={this.state.responsavel}
                  onChange={(e) => {
                    this.setState({ responsavel: e.target.value });
                  }}
                />
              </div>
              <div className="form-group col-2" style={{ marginTop: 70 }}>
                <button
                  onClick={() => {
                    this.novaTarefa();
                  }}
                  className="btn btn-success"
                >
                  <FaPlus></FaPlus>
                  Adicionar Tarefa
                </button>
              </div>
            </div>
            <hr style={{ marginTop: 25, marginBottom: 25 }}></hr>
            <div className="titulo2">
              <h4>Tarefas Criadas</h4>
            </div>
            {this.state.tarefas.map((tarefa) => (
              <div className="task" key={tarefa.id}>
                <div className="taskItem">{tarefa.tarefa}</div>
               
                <FaTrash className="trashIcon"  onClick={() => {
                    this.deletarTarefa();
                  }}></FaTrash>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
