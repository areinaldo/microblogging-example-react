import React, {Component} from "react";
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from "reactstrap";
import { postNewPost } from "../../utils/apicalls.js";

class AddPost extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.addPost = this.AddPost.bind(this);
    }

    handleTitleChange(e){
        this.setState({title: e.target.value});
    }
    handleDescriptionChange(e){
        this.setState({description: e.target.value});
    }

    addPost(e){
        e.preventDefault();
        const {
            title,
            description
        } = this.state;
        //Guarda el post en la base de taos llamando a la funcion del apu
        postNewPost(sessionStorage.getItem('iduser'), title, description).then(res => this.checkPOSTNewPost(res));
    }

    checkPOSTNewPost(res){
        if(res==("OK")){
            //TODO muestra un modal cuando el post es añadido
            this.setState({
                title: "",
                description: ""
            });
            this.props.updateMyPosts();
        }else{
            //TODO muestra un modal cuando ocurre un error al añadir el poost
        }
    }

    render(){
        return(
            <div>
                <Card body>
                    <CardTitle tag="h5">Añadir un post nuevo</CardTitle>
                    <Form>
                        <FormGroup>
                            <Label for="aTitulo">Titulo</Label>
                            <Input type="text" name="title" value={this.state.title} id="aTitulo" placeholder="Introduce un titulo" onChange={this.handleTitleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="aDescription">Descripcion</Label>
                            <Input style={{height: '200px'}} type="textarea" name="description" value={this.state.description} id="aDescription" 
                            placeholder="Introduce una descripcion" onChange={this.handleDescriptionChange}/>
                        </FormGroup>
                        <Button onClick={this.addPost}>añadir</Button>
                    </Form>
                </Card>
            </div> 
        )
    }
}

export default AddPost;