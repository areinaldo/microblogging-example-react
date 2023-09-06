import React, {Component} from 'react';
import classnames from 'classnames';
import { Row, Col, Card, CardTitle, Badge, UncontrolledCollapse, CardBody, Table, Alert,
Button, Nav, NavItem, Navbar, NavbarBrand, TabContent, TabPane, Modal, ModalHeader, ModalBody,
ModalFooter } from 'reactstrap';
import { FaEdit, FaFeatherAlt, FaTrashAlt } from 'react-icons/fa';
import {getMyPosts, deletePost} from "../../utils/apicalls.js";
import AddPost from './AddPost';
import EditPost from './EditPost';
import { getDateInStrFormat } from '../../utils/utils';
import { NavLink } from 'react-router-dom';

class MyPostList extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            edit: (<Alert color='warning'>Seleccione editar un post de la lista</Alert>),
            activeTab: '1',
            showDeleteModal: null
        }
        this.handleUpdateMyPosts = this.handleUpdateMyPosts.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }
    getPosts(){
        getMyPosts(sessionStorage.getItem('iduser')).then((posts) =>{
            this.setState({
                posts
            });
        });
    }
    toggleTab(tab){
        if(this.state.activeTab !== tab){
            this.setState({
                activeTab: tab
            });
        }
    }
    handleUpdateMyPosts(){
        this.getPosts();
    }
    
    askForDelete(post){
        this.setState({
            showDeleteModal: (
                <Modal isOpen="true" className={this.props.className}>
                    <ModalHeader>Eliminar Post</ModalHeader>
                    <ModalBody>
                        Está seguro que desea eliminar el post <strong>{post.title}</strong>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={() => this.deletePost(post)}> Eliminar</Button> {' '}
                        <Button color='secondary' onClick={() => this.setState({showDeleteModal: null})}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            )
        });
    }
    //Borrado de un post
    deletePost(post){
        deletePost(post._id).then((res) => this.checDELETEPost(res));
    }
    //comprueba la respuesta del servidor
    checDELETEPost(res){
        //si es satisfactoria (ok), quita el "modal" y reinicia el edir con el componente correspondiente
        if(res == "OK"){
            this.setState({
                showDeleteModal: null,
                edit:(<Alert color='warning'>Seleccione editar un post de la lista</Alert>)
            });
        }else{
            this.setState({
                showDeleteModal: (
                    <Modal isOpen="true" className={this.props.className}>
                        <ModalHeader>Error con el servidor</ModalHeader>
                        <ModalBody>
                            Ha ocurrido un error y no ha podido realizarse la eliminacion del post
                        </ModalBody>
                        <ModalFooter>
                            <Button color='secondary' onClick={() => this.setState({showDeleteModal: null})}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                )
            });
        }
    }

    handleShowEdit(post){
        this.setState({
            edit: (<EditPost post = {post} updateMyPosts = {this.handleUpdateMyPosts}/>)
        });
    }
    componentDidMount(){
        this.getPosts();
    }
    render() {
        <div>
            {this.state.showDeleteModal}
            <Row>
                <Col xs="7">
                    <CardTitle tag="center"><Alert color='info'><strong>Mis Post Publicados</strong></Alert><Badge pill>
                        {this.state.props.length}</Badge></CardTitle>
                    <Table>
                        <tbody>
                            {this.state.posts.map((post, index) => {
                                
                                return(
                                    <div>
                                        <Row>
                                            <Col>
                                                <NavBar expand="md">
                                                    <NavbarBrand href='#' id={"toggler" + index}> <h5><FaFeatherAlt/> {post.title}</h5></NavbarBrand>
                                                    <Nav className='ml-auto' navbar>
                                                        <NavItem>
                                                            <NavLink>
                                                                <Button outline onClick={this.handleShowEdit.bind(this,post)}><FaEdit/></Button>
                                                                {' '}
                                                                <Button outline onClick={this.askForDelete.bind(this.post)}><FaTrashAlt/></Button>
                                                            </NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </NavBar>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <UncontrolledCollapse toggler={"#toggler" + index}>
                                                    <Card>
                                                        <CardBody>
                                                            <Row><Col>{post.description}</Col></Row>
                                                            <Row><Col align="right"><small>{getDateInStrFormat(new Date(post.publicationdate))} - {post.user.username}</small></Col></Row>
                                                        </CardBody>
                                                    </Card>
                                                </UncontrolledCollapse>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col xs="5">
                    <Nav tabs>
                        <NavItem>
                            <NavLink href="#" className={classnames({active: this.state.activeTab == '1'})} onClick={() => {this.toggleTab('1')}}>
                                Añadir
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" className={classnames({active: this.state.activeTab == '2'})} onClick={() => {this.toggleTab('2')}}>
                                Editar
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <AddPost updateMyPosts = {this.handleUpdateMyPosts}/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm = "12">
                                    {this.state.edit}
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        </div>
    }
}

export default MyPostList;
