import React, {Component} from "react";
import { Container, Row, Col } from "reactstrap";
import HeaderDashboard from './HeaderDashboard';
import MyPostList from './posts/PostList';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: (<PostList />)
        };
        this.handleLogout= this.handleLogout.bind(this);
        this.handleOnShow = this.handleOnShow.bind(this);

    }

    handleLogout(){
        sessionStorage.clear();
        this.props.history.push("/");
    }

    handleOnShow(option){
        if(option == 1){
            this.setState({
                show: (<PostList/>)
            });
        } else if(option == 2){
            this.setState({
                show: (<MyPostList/>)
            });
        }if(option == 3){
            //aqui se puede agregar hasta una tercera opcion
            alert('Usuario: ' + sessionStorage.getItem('username') + "\nRol: "+sessionStorage.getItem('role'));
        }
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col><HeaderDashboard onLogout = {this.handleLogout} onShow = {this.handleOnShow} /></Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {this.state.show}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;