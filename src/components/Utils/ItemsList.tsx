import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainDarkBlue, mainOrange } from "../../styles/StylingVariables";

interface ItemsListProps {
  list: any[];
  labelKey: string;
  linkBase?: string;
  linkParamKey?: string;
  margin?: string;
}

const ItemsList: React.FC<ItemsListProps> = ({
  list,
  labelKey,
  linkBase,
  linkParamKey,
  margin,
}): JSX.Element => {
  return (
    <List margin={margin}>
      {list.map((item: any, index: number) =>
        linkBase ? (
          <Link
            key={`item_${index}`}
            to={linkBase + `${linkParamKey ? `/${item[linkParamKey]}` : ""}`}
          >
            <Item>{item[labelKey]}</Item>
          </Link>
        ) : (
          <Item key={`item_${index}`}>{item[labelKey]}</Item>
        ),
      )}
    </List>
  );
};

const List = styled.ul.attrs((props: { margin: string }) => ({
  margin: props.margin,
}))`
  margin: ${(props) => props.margin || 0};
`;

const Item = styled.li`
  width: 200px;
  background-color: ${mainDarkBlue};
  color: white;
  text-align: center;
  padding: 10px;
  margin: 10px;
  border-radius: 100px;
  border: 5px solid ${mainOrange};

  &:hover {
    filter: brightness(1.2);
  }

  & a:visited {
    color: white;
  }
`;

export default ItemsList;
