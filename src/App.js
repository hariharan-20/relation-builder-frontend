import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import './App.css'

const App = () => {

  const [data, setData] = useState()
  const [findRelation, setFindRelation] = useState([])
  const [result, setResult] = useState()
  
  const [isOpen, setIsOpen] = useState(false)
  const [ modalMessage, setModalMessage] = useState('')

  const handleDataClick = (e,i) => {
      
    if(findRelation.length < 2) {
      if(findRelation.includes(e.target.textContent)) {
        setModalMessage('select different persons')
        setIsOpen(true)  
      } else{
        if(e.target.id === 'NameCol') {
          document.getElementById('table').childNodes[i].childNodes[0].style.backgroundColor = '#F2F4FF'  
        }else if( e.target.id === 'RelationCol') {
          document.getElementById('table').childNodes[i].childNodes[2].style.backgroundColor = '#F2F4FF'
        }
  
        setFindRelation(arr => [...arr, e.target.textContent])
      }
    } else {      
      setModalMessage('select only two persons to find Relationship')
      setIsOpen(true)      
    }
    console.log(findRelation)
  }

  const getRelation = (e) => {
    e.preventDefault()
    if (findRelation.length === 2) {
      axios.post('http://localhost:8080/GetRelation', { findRelation })
        .then(res => {
          console.log(res)
          setResult(res.data)
        })
        .catch(err => {
          console.log(err.message)
        })
    } else {
      setModalMessage('select any two persons to find Relationship')
      setIsOpen(true)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8080/GetData')
      .then(res => {
        console.log(res.data.data)
        setData(res.data.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  return (
    <>
      {data &&
        <Container id="table">
          <h3>Select any Two persons to find Reltionship degree</h3>
          {data.map((ele, i) => {
            return (
              <Row  key={i}>
                <Col id='NameCol' className='nameCol' onClick={(e) => handleDataClick(e, i)}>{ele.name}</Col>
                <Col >{ele.tag}</Col>
                <Col id='RelationCol' className='nameCol' onClick={(e) => handleDataClick(e, i)}>{ele.relation}</Col>               
              </Row>
            )
          })
          }
          <div>
            <Button onClick={(e) => getRelation(e)}>Find relation</Button>
          </div>          
          <div>
            {result && 
            <>
              <div>
                <span>{result.person1+' > '}</span>
                <span>
                  {result.commonData && result.commonData.map(ele => {
                    
                    return ele+' > '
                  })} 
                </span>                
                <span>{result.person2}</span>
              </div>
              <div>or</div>
              <div>
              <span>{result.person1+' > '}</span>
              <span>
                {result.diffData && result.diffData.map(ele => {
                    return ele+' > ' 
                  })} 
                </span>
                <span>{result.person2}</span>
              </div>
            </>
            }
          </div>
        </Container>
      }
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)}>Ok</Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    </>
  )
}

export default App;
