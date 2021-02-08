import EStyles from "constants/Styling.constants";
import React from "react";
import styled from "styled-components";

interface CategoryThemeProps {
  categoryName: string;
  theme: string;
  subTheme: string;
}

const CategoryTheme: React.FC<CategoryThemeProps> = ({
  categoryName,
  theme,
  subTheme,
}): JSX.Element => {
  return (
    <CategoryThemeContainer className="d-flex align-center">
      {categoryName}
      <ThemeContainer className="d-flex">
        {theme}
        <SubThemeContainer>{subTheme}</SubThemeContainer>
      </ThemeContainer>
    </CategoryThemeContainer>
  );
};

const CategoryThemeContainer = styled.div`
  color: ${EStyles.turquoise};
  text-align: center;
  font-weight: bold;
  padding: 15px;
  border-radius: 100px;
  border: 3px solid ${EStyles.blue};
  margin-bottom: 20px;
`;
const ThemeContainer = styled.div`
  color: white;
  text-align: center;
  border-radius: 100px;
  margin-left: 10px;
`;
const SubThemeContainer = styled.div`
  font-style: italic;
  text-align: center;
  font-weight: lighter;
  margin-left: 10px;
`;

export default CategoryTheme;
