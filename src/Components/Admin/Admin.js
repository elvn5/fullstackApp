import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import { BsPeopleCircle, BsGeoAlt, BsPhone } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";
import "./Admin.css";
import { Link } from "react-router-dom";
export default function Admin() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios
      .get("http://localhost:5000/admin")
      .then((response) => response);
    setData(response.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  function refreshHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    axios.get("http://localhost:5000/admin").then((response) => {
      fetchData();
    });
  }

  function logoutHandler() {
    localStorage.removeItem("userData");
    window.location.reload();
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      <h2>Все регистрации</h2>
      <Button
        style={{ marginRight: "10px" }}
        color="primary"
        onClick={refreshHandler}
      >
        Обновить
      </Button>
      <ul className="admin__list">{
        data.map((item, index)=>{
          return <li className="admin__list-item" key={index}>
            <span><BsPeopleCircle/> {item.FIO}</span>
            <span><BsPhone/> Телефон: {item.Phone}</span>
            <span><BsGeoAlt/> Адрес: {item.Address}</span>
            <span><FaShieldAlt/> {item.INN}</span>
          </li>
        })
      }</ul>
      
      <Button color="danger" onClick={(e) => logoutHandler(e)}>
        Выйти
      </Button>
      <Button style={{marginLeft:'10px'}} color="info" onClick={(e) => logoutHandler(e)}>
        <Link to="/"/>Главная
      </Button>
    </Container>
  );
}
