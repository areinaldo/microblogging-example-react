import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, Badge, Table, Alert} from 'reactstrap';
import { FaFeather } from 'react-icons/fa';
import { getAllPosts } from "../../utils/apicalls";
import { getDateInStrFormat } from "../../utils/utils.js";

class PostList extends Component {
    state = {
        posts: []
    };
    getPost(){
        getAllPosts().then((posts) =>{
            this.setState({
                posts
            });
        });
    }
    componentDidMount(){
        this.getPost();
    }
    render(){
        return(
            <div>
                <CardTitle tag="center"><Alert color="info"><strong>Posts Publicados</strong><Badge pill> 
                {this.state.posts.length} </Badge></Alert></CardTitle>
                <Table>
                    <tbody>
                        {this.state.posts.map((post, index) =>{
                            return(
                                <div>
                                    <Alert color='dark'>
                                        <Row>
                                            <Col>
                                                <CardTitle tag="h5"><FaFeather/> {post.title}</CardTitle>
                                                <Card>
                                                    <CardBody>
                                                        <Row>
                                                            <Col>
                                                                {post.description}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col align="right">
                                                                <small>{getDateInStrFormat(new Date(post.publicationdate))} - {post.user.username} </small>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Alert>
                                </div>
                            );
                        })};
                    </tbody>
                </Table>
            </div>
        )

        
    }
}

export default PostList;