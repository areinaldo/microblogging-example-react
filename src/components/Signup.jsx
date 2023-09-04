import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardTitle } from 'reactstrap';
import {postNewUser} from "../utils/apicalls";

class Signup extends Component {
    constructor(props){
        super(props);
        
        this.state={
            username: '',
            password: '',
            fullname: '',
            email: '',
            role: 'suscriber'
        };
        
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.onSignup= this.onSignup.bind(this);

    }

    handleUsernameChange(e){
        this.setState({username:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value})
    }
    handleFullNameChange(e){
        this.setState({fullname: e.target.value})
    }
    handleEmailChange(e){
        this.setState({email: e.target.value})
    }
    handleRoleChange(e){
        this.setState({role: e.target.value})
    }
    onSignup(e){
        const {
            username,
            password,
            fullname,
            email,
            role
        } = this.state;
        //Crea e inserta un nuevo usuario en la base de datos
        postNewUser(username,password,fullname,email,role).then((res) => this.checkPOSTNewUser(res));
    }
    //Comprueba la respuesta del servidor
    checkPOSTNewUser(res){
        //si la respuesta es oK: crea un nuevo usarip y redirecciona a la página de login
        if(res === "OK")
            this.props.history.push("/");
        else{
            console.log("error no se ha creado el usuario");
        }
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col sm="12" md={{size:6, offset: 3}}>
                        <Card body>
                            <CardTitle tag="h4">Registro de un usuario</CardTitle>
                            <Form>
                                <FormGroup>
                                    <Label for="aUsername">Username</Label>
                                    <Input type="text" name = "username" id="aUsername" placeholder="Introduce tu username" 
                                    onChange={this.handleUsernameChange} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="aPassword">Password</Label>
                                    <Input type="password" name = "password" id="aPassword" placeholder="Introduce tu password" 
                                    onChange={this.handlePasswordChange} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="aFullname">Fullname</Label>
                                    <Input type="text" name = "fullname" id="aFullname" placeholder="Introduce tu nombre completo" 
                                    onChange={this.handleFullNameChange} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="aEmail">Email</Label>
                                    <Input type="email" name = "email" id="aEmail" placeholder="Introduce tu email" 
                                    onChange={this.handleEmailChange} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="aRole">Role</Label>
                                    <Input type="select" name = "role" id="aRole" onChange={this.handleRoleChange}>
                                        <option value="suscriber">Suscriptor</option>
                                        <option value="admin">Administrador</option>
                                    </Input>
                                </FormGroup>
                                <Button onClick={this.onSignup}>Registro</Button>
                            </Form>
                        </Card>
                        <Row>
                            <Col tag="center">
                                <Link to="/"><strong className='text-muted'>Login</strong></Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Signup;

