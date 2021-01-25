/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";

interface ItemsListProps {
  list: Record<string, any>[];
  labelKey: string;
  linkBase?: string;
  linkParamKey?: string;
  className?: string;
  margin?: string;
  maxWidth?: string;
  show?: boolean;
}

const ItemsList: React.FC<ItemsListProps> = ({
  list,
  labelKey,
  linkBase,
  linkParamKey,
  className = "",
  margin = "0",
  maxWidth = "auto",
  show = true,
}): JSX.Element => {
  return (
    <List className={className} margin={margin} maxWidth={maxWidth} show={show}>
      {list.map((item: Record<string, any>, index: number) =>
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

const List = styled.ul<{ margin: string; maxWidth: string; show: boolean }>`
  margin: ${(props) => props.margin};
  max-width: ${(props) => props.maxWidth};
  display: ${(props) => (props.show ? "flex" : "none")};
`;

const Item = styled.li`
  background-color: ${EStyles.darkBlue};
  color: white;
  text-align: center;
  padding: 10px 15px;
  margin: 7px;
  border-radius: 100px;
  border: 3px solid ${EStyles.blue};
  cursor: default;

  &:hover {
    filter: brightness(1.2);
  }

  & a:visited {
    color: white;
  }
`;

export default ItemsList;
