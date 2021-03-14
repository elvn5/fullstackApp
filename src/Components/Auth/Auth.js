import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import swal from "sweetalert";
import querystring from "querystring";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerHandler() {
    axios
      .post(
        "http://localhost:5000/register",
        querystring.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        swal(response.data.message);
      })
      .catch((error) => {
        swal("Такой пользователь уже существует");
      });
  }

  async function loginHandler() {
    await axios
      .post(
        "http://localhost:5000/login",
        querystring.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res)
        localStorage.setItem(
          "userData",
          JSON.stringify({ token: res.data.token })
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((e) =>{
        swal('Логин или пароль неправильные')
      });
  }

  return (
    <Container>
      <h1>Авторизация</h1>
      <Form>
        <FormGroup>
          <Label for="fio">E-Mail</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Ваш E-Mail"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Пароль</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Ваш пароль"
          />
        </FormGroup>
        <Button onClick={() => loginHandler()} color="primary">
          Войти
        </Button>
        <Button
          color="warning"
          style={{ marginLeft: "10px" }}
          onClick={() => registerHandler()}
        >
          Зарегистрироваться
        </Button>
      </Form>
      <Link to="/">
        <Button style={{ marginTop: "10px" }} color="info">
          Назад
        </Button>
      </Link>
    </Container>
  );
}
