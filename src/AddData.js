import axios from 'axios'
import React, { useState} from 'react'
import {Container, Row,Col,  Button, Modal} from 'react-bootstrap'

const AddData = (props) => {
    // const [name, setName] = useState()
    // const [tag, setTag] = useState()
    // const [relation, setRelation] = useState()
    

    const [data, setData] = useState({
        name: '',
        tag: '',
        relation: ''
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        axios.post('https://relation-builder-backend.herokuapp.com/SaveData', {
            name: data.name,
            tag: data.tag,
            relation: data.relation
        })
        .then(res =>{           
            setData(data => {
                data.name = ''
                data.tag = ''
                data.relation = ''
                return data
            }) 
            props.setModalMessage('Relation Added')
            props.setIsOpen(true)
            props.setAddModalOpen(false)
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    
    // useEffect(() => {
    //     setModalOpen(true)
    // }, [])

return(
    <Modal show={props.modalOpen} onHide={() => props.setAddModalOpen(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
            <Container>
                <Row className="formRow">
                    <Col md={6}><label>Name</label></Col>
                    <Col md={6}><input name='name' onChange={(e)=> handleChange(e)} value={data.name} /></Col>                    
                </Row>
                <Row className="formRow">
                    <Col md={6}><label>Tag</label></Col>
                    <Col md={6}><input name='tag' onChange={(e)=> handleChange(e)} value={data.tag}/></Col>                                        
                </Row>
                <Row className="formRow">
                    <Col md={6}><label>Relation</label></Col>
                    <Col md={6}><input name='relation' onChange={(e)=> handleChange(e)} value={data.relation}/></Col>                                        
                </Row>
                <Row className="formRow" style={{ justifyContent: 'center'}}>
                    <Button onClick={handleSubmit}>Add</Button>
                </Row>
            </Container>
        </Modal.Body>
    </Modal>
)
}

export default AddData