import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainDarkBlue, mainBlue } from "../../styles/StylingVariables";

interface ItemsListProps {
  list: Record<string, React.ReactNode>[];
  labelKey: string;
  linkBase?: string;
  linkParamKey?: string;
  className?: string;
  margin?: string;
  maxWidth?: string;
}

const ItemsList: React.FC<ItemsListProps> = ({
  list,
  labelKey,
  linkBase,
  linkParamKey,
  className = "",
  margin = "0",
  maxWidth = "auto",
}): JSX.Element => {
  return (
    <List className={className} margin={margin} maxWidth={maxWidth}>
      {list.map((item: Record<string, React.ReactNode>, index: number) =>
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

const List = styled.ul.attrs((props: { margin: string; maxWidth: string }) => ({
  margin: props.margin,
  maxWidth: props.maxWidth,
}))`
  margin: ${(props) => props.margin};
  max-width: ${(props) => props.maxWidth};
`;

const Item = styled.li`
  background-color: ${mainDarkBlue};
  color: white;
  text-align: center;
  padding: 10px 15px;
  margin: 10px;
  border-radius: 100px;
  border: 3px solid ${mainBlue};
  cursor: default;

  &:hover {
    filter: brightness(1.2);
  }

  & a:visited {
    color: white;
  }
`;

export default ItemsList;
