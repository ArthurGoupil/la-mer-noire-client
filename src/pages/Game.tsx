import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Id } from "../models/Game";

const Home: React.FC<{}> = (): JSX.Element => {
  const { id } = useParams<Id>();
  return <div>{id}</div>;
};

export default Home;
