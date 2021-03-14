import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import { Link} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import querystring from 'querystring'




export default function Client() {
  const [fio, setFio] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [inn, setInn] = useState('')

  const sendData = (e) =>{
    e.preventDefault()
    const data={
      fio,
      phone,
      address,
      inn
    }
    if(!data.fio){
      swal('Введите ФИО')
      return
    } 
    if(!data.phone){
      swal('Введите номер')
      return
    }
    if(!data.address){
      swal('Введите адрес')
      return
    }
    if(!data.inn){
      swal('Введите ИНН')
      return
    }
    axios.post('http://localhost:5000/data',
      querystring.stringify({
              FIO: data.fio,
              Phone: data.phone,
              Address: data.address,
              INN: data.inn
      }), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
          console.log(response)
      });
    swal('Успешно добавлено!')
  }

  return (
    <Container>
      <Form>
      <FormGroup>
        <Label for="fio">ФИО</Label>
        <Input onChange={(e)=>setFio(e.target.value)} type="textarea" name="fio" id="fio" placeholder="Ваше ФИО" />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Телефон</Label>
        <Input onChange={(e)=>setPhone(e.target.value)} type="textarea" name="phone" id="phone" placeholder="Ваш телефон" />
      </FormGroup>
      <FormGroup>
        <Label for="Адрес">Адрес</Label>
        <Input onChange={(e)=>setAddress(e.target.value)} type="textarea" name="address" id="address"  placeholder="Ваш адрес"/>
      </FormGroup>
      <FormGroup>
        <Label for="INN">ИНН</Label>
        <Input onChange={(e)=>setInn(e.target.value)} type="textarea" name="INN" id="INN" placeholder="Ваш ИНН" />
      </FormGroup>
      <Button onClick={(e)=>sendData(e)} color="primary">Отправить!</Button>

    </Form>
      <Link  to="/auth"><Button style={{margin:'30px 0'}} color="warning">Авторизация</Button></Link>
    </Container>
    
  )
}
