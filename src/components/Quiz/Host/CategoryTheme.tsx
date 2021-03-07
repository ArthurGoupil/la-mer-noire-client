import React from "react";
import styled from "styled-components";

interface CategoryThemeProps {
  categoryName: string;
  categoryColor: string;
  theme: string;
  subTheme: string;
}

export const CategoryTheme: React.FC<CategoryThemeProps> = ({
  categoryName,
  categoryColor,
  theme,
  subTheme,
}): JSX.Element => {
  return (
    <CategoryThemeContainer color={categoryColor} className="d-flex justify-center align-center">
      {categoryName}
      <ThemeContainer className="d-flex">
        {theme}
        <SubThemeContainer>{subTheme}</SubThemeContainer>
      </ThemeContainer>
    </CategoryThemeContainer>
  );
};

const CategoryThemeContainer = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 600;
  margin-bottom: 15px;
`;
const ThemeContainer = styled.div`
  color: white;
  font-weight: 500;
  margin-left: 20px;
`;
const SubThemeContainer = styled.div`
  font-style: italic;
  font-weight: 300;
  margin-left: 20px;
`;
