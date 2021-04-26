import React, { Component } from 'react';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
    Modal, ModalBody, ModalFooter, ModalHeader,
    Col, Form, FormGroup, Label, Input
} from 'reactstrap';


const url = "http://127.0.0.1:8000/api/empresas/";


class ComponentePrincipal extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            id: '',
            nombre: '',
            numero_trabajadores: '',
            tipo_empresa: '',
            fecha_creacion : '',
            tipoModal: ''
        }
    }

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {
        delete this.state.form.id; //del formulario
        this.state.form.fecha_creacion = this.obtenerFecha();
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put(url + this.state.form.id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        })
    }

    peticionDelete = () => {
        axios.delete(url + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        })
    }

    seleccionarEmpresa = (empresa) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: empresa.id,
                nombre: empresa.nombre,
                numero_trabajadores: empresa.numero_trabajadores,
                tipo_empresa: empresa.tipo_empresa,
                fecha_creacion: empresa.fecha_creacion,
                tipoModal: ''
            }
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
                

            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }

    obtenerFecha(){
        var n = new Date();
        //Año
        var y = n.getFullYear();
        //Mes
        var m = n.getMonth() + 1;
        //Día
        var d = n.getDate();

        var date = y + "-" + m + "-" + d;
        
        return date;
    }

    render() {
        const { form } = this.state; //=> const form = this.state.form;
        return (
            <div>
                <br /><br /><br />
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Empresa</button>

                <br /><br />
                <table className="table ">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Numeros de Trabajadores</th>
                            <th>Tipo de Empresa</th>
                            <th>Fecha Creación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((empresa, i) => {
                            return (
                                <tr Key={i} >
                                    <td>{empresa.id}</td>
                                    <td>{empresa.nombre}</td>
                                    <td>{empresa.numero_trabajadores}</td>
                                    <td>{empresa.tipo_empresa}</td>
                                    <td>{empresa.fecha_creacion}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(empresa); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        Registro
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Label for="nombre" sm={8}>ID: </Label>
                            <FormGroup row>
                                <Col sm={12}>
                                    <Input type="text" className="form-control" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : ''} />
                                </Col>
                            </FormGroup>

                            <Label for="nombre" sm={8}>Nombre: </Label>
                            <FormGroup row>
                                <Col sm={12}>
                                    <Input type="text" className="form-control" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
                                </Col>
                            </FormGroup>


                            <Label for="numero_trabajadores" sm={8}>Numero total de Trabajadores: </Label>
                            <FormGroup row>
                                <Col sm={12}>
                                    <Input type="text" className="form-control" name="numero_trabajadores" id="numero_trabajadores" onChange={this.handleChange} value={form ? form.numero_trabajadores : ''} />
                                </Col>
                            </FormGroup>


                            <FormGroup>
                                <Label for="tipo_empresa" sm={8}>Tipo de Empresa:</Label>
                                <Input type="select" name="select" name="tipo_empresa" id="tipo_empresa" onChange={this.handleChange} value={form ? form.tipo_empresa : ''}>
                                    <option>Seleccionar:</option>
                                    <option>Retail</option>
                                    <option>Software</option>
                                </Input>
                            </FormGroup>
                        
                        <Label for="nombre" sm={8}>Fecha Creación: </Label>
                            <FormGroup row>
                                <Col sm={12}>
                                    <Input type="text" className="form-control" name="fecha_creacion" id="fecha_creacion" readOnly onChange={this.handleChange} value={form ? form.fecha_creacion : this.obtenerFecha()} />
                                </Col>
                            </FormGroup>

                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal === 'insertar' ?
                            <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                Insertar
                            </button> :
                            <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                Actualizar
                            </button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar a la empresa <b>{form && form.nombre}</b>
                    </ModalBody>
                    
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default ComponentePrincipal;