import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BarraSuperior from './BarraSuperior';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const ProfesoresAgregar = () => {

    const initialState = {
        clave:'',
        nombres:'',
        apellidos:'',
        fnacimiento:'',
        email:'',
        sexo:'',
        estadocivil:'',
        tcasa:'',
        tcelular:'',
        curp:'',
        calle:'',
        colonia:'',
        cp:'',
        municipio:'',
        estado:'',
        //estatus:'',
    }

    const [datos, setDatos] = useState(initialState);

    const {clave, nombres, apellidos, fnacimiento, email, sexo, estadocivil, tcasa, curp, tcelular, calle, colonia, cp, municipio, estado} = datos;

    const navigate = useNavigate();

    const handleChange = (e) => {

        let {name, value} = e.target;
        setDatos({...datos, [name]: value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //variable que solo funcionará en esta const
        const {clave, nombres, apellidos, fnacimiento, email, sexo, estadocivil, tcasa, curp, tcelular, calle, colonia, cp, municipio, estado} = datos;
        
        const formData = new FormData();

        formData.append("clave", clave);
        formData.append("nombres", nombres);
        formData.append("apellidos", apellidos);
        formData.append("fNacimiento", fnacimiento);
        formData.append("email", email);
        formData.append("sexo", sexo);
        formData.append("estadoCivil", estadocivil);
        formData.append("tCasa", tcasa);
        formData.append("curp", curp);
        formData.append("tCelular", tcelular);
        formData.append("calle", calle);
        formData.append("colonia", colonia);
        formData.append("cp", cp);
        formData.append("municipio", municipio);
        formData.append("estado", estado);

        await axios.post('http://localhost:5000/profesores/agregar', formData)
        .then((response) => {

            //va enviar la info de response que se definió en index.js
            // console.log(response);
            notify(response.status);      

        }).catch((err) => {

            console.log(err);

        });

    }

    const handleCancelar = () => {

        setDatos(initialState);
        return 0;

    }

    function notify(num) {

        console.log(num);
        // el agregado fue un exito
        if (num===200) {
            toast.success(
                'Profesor agregado :D',
                {
                    position: toast.POSITION.TOP_CENTER,
                    onClose:() => {
                        handleCancelar();
                        navigate('/profesores');
                    },
                    autoClose:1000, // se cerrará a los 1000 ms aka 1s
                },

            );
        };
    }




    return(
        
        <>
        
            <Container>
                <Row>
                    <Col>
                        {/* de preferencia poner siempre al principio */}
                        <ToastContainer/>
                    </Col>
                </Row>

                <Row>
                    <Col></Col>
                    <Col>
                    
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formClave">
                                <Form.Label>Clave</Form.Label>
                                <Form.Control name='clave' type="text" placeholder="Ingrese su clave" required value={clave} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formNombres">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control name='nombres' type="text" placeholder="Ingrese su(s) nombre(s)" required value={nombres} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formApellidos">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control name='apellidos' type="text" placeholder="Ingrese sus apellidos" required value={apellidos} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formFnacimiento">
                                <Form.Label>Fecha de Nacimiento</Form.Label>
                                <Form.Control name='fnacimiento' type="date" placeholder="Ingrese su fecha de nacimiento" required value={fnacimiento} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name='email' type="email" placeholder="Ingrese su correo electronico" required value={email} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSexo">
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select aria-label="sexo" name='sexo' required value={sexo} onChange={handleChange}>
                                    <option>Seleccionar</option>
                                    <option value="femenino">Femenino</option>
                                    <option value="masculino">Masculino</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEstadocivil">
                                <Form.Label>Estado Civil</Form.Label>
                                <Form.Select aria-label="estadocivil" name='estadocivil' required value={estadocivil} onChange={handleChange}>
                                    <option>Seleccionar</option>
                                    <option value="soltere">Soltere</option>
                                    <option value="casade">Casade</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formTcasa">
                                <Form.Label>Telefono de Casa</Form.Label>
                                <Form.Control name='tcasa' type="tel" pattern='[(][0-9]{3}[)][0-9]{7}' placeholder="Ingrese su telefono de casa" value={tcasa} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formTcelular">
                                <Form.Label>Telefono Celular</Form.Label>
                                <Form.Control name='tcelular' type="tel" pattern='[(][0-9]{3}[)][0-9]{7}' placeholder="Ingrese su telefono celular" required value={tcelular} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCURP">
                                <Form.Label>CURP</Form.Label>
                                <Form.Control name='curp' type="text" pattern='^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$' placeholder="Ingrese su CURP" required value={curp} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCalle">
                                <Form.Label>Calle</Form.Label>
                                <Form.Control name='calle' type="text" placeholder="Ingrese su calle" required value={calle} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formColonia">
                                <Form.Label>Colonia</Form.Label>
                                <Form.Control name='colonia' type="text" placeholder="Ingrese su colonia" required value={colonia} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCP">
                                <Form.Label>Codigo Postal</Form.Label>
                                <Form.Control name='cp' type="text" pattern='[0-9]{5}' placeholder="Ingrese su codigo postal" required value={cp} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMunicipio">
                                <Form.Label>Municipio</Form.Label>
                                <Form.Control name='municipio' type="text" placeholder="Ingrese su minicipio" required value={municipio} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEstado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control name='estado' type="text" placeholder="Ingrese su estado" required value={estado} onChange={handleChange}/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>

                            <Button variant="info" onClick={handleCancelar} className='mb -3'>
                                Cancelar
                            </Button>
                        </Form>
                    
                    </Col>
                    <Col></Col>
                </Row>

            </Container>
        
        </>

    )

}

export default ProfesoresAgregar;