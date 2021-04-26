import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/css/login.css'
import axios from "axios";

import {
    Col, Form, FormGroup, Label, Input
} from 'reactstrap';


const url = "http://127.0.0.1:8000/api/auth/login/";

class Login extends Component {
    state = {
        data: [],
        form: {
            email: '',
            password: ''
        }
    }


    iniciarSesion = async () => {
        await axios.post(url, this.state.form).then(response => {
            window.location.href="../empresas"
        }).catch(error => {
            console.log(error.message);
        })


        console.log(this.state.form);
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }



    render() {
        return (
            <div className="containerPrincipal">

                <div className="containerSecundario">
                    <h4>Inicio Sesion</h4>
                    <br></br>

                    <Form>
                        <Label for="nombre" sm={8}>Email: </Label>
                        <FormGroup row>
                            <Col sm={12}>
                                <Input type="text" className="form-control" name="email" id="email" onChange={this.handleChange} />
                            </Col>
                        </FormGroup>

                        <Label for="nombre" sm={8}>Password: </Label>
                        <FormGroup row>
                            <Col sm={12}>
                                <Input type="text" className="form-control" name="password" id="password" onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                    </Form>

                    <button className="btn btn-primary" onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>
                </div>
            </div>
        );
    }
}

export default Login;