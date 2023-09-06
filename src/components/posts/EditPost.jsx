import React, {Component} from "react";
import { Card, CardTitle, Label, Button, Form, FormGroup, Input, CardBody } from "reactstrap";
import { putExistingPost } from "../../utils/apicalls.js";

class EditPost extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: this.props.post.title,
            description: this.props.post.description
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.editPost = this.editPost.bind(this);
    }

    handleTitleChange(e){
        this.setState({title: e.target.value});
    }
    handleDescriptionChange(e){
        this.setState({description: e.target.value});
    }

    editPost(e){
        e.preventDefault();
        const {
            title,
            description
        } = this.state;
        //acttaliza el post en la base de adtos con la llamada a la funcion del api
        putExistingPost(this.props.post._id, title, description).then(res => this.checkPUTPost(res));
    }

    checkPUTPost(res){
        if(res==("OK")){
            //TODO muestra un modal cuando el post es actualizado
            this.setState({
                title: "",
                description: ""
            });
            this.props.updateMyPosts();
        }else{
            //TODO muestra un modal cuando ocurre un error al añadir el poost
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            title: nextProps.post.title,
            description: nextProps.post.description
        })
    }

    render(){
        return(
            <div>
                <Card body>
                    <CardTitle tag="h5">Editar un post</CardTitle>
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
                        <Button onClick={this.editPost}>Actualizar</Button>
                    </Form>
                </Card>
            </div> 
        )
    }
}

export default EditPost;