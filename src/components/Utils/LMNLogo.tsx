import React from "react";
import styled from "styled-components";
import {
  mainDarkBlue,
  mainOrange,
  mainYellow,
  mainTurquoise,
} from "../../styles/StylingVariables";

interface LMNLogoProps {
  width?: string;
  margin?: string;
}

const LMNLogo: React.FC<LMNLogoProps> = ({ width, margin }): JSX.Element => {
  return (
    <SVGContainer margin={margin} width={width}>
      <SVG viewBox="0 0 100 20">
        <text
          textAnchor="middle"
          x="50"
          y="15"
          fontSize="17"
          fill="url(#gradient)"
          fillOpacity="1"
        >
          LA MER NOIRE
        </text>
        <text
          textAnchor="middle"
          x="50"
          y="15"
          fontSize="17"
          fill="url(#wave)"
          fillOpacity="1"
        >
          LA MER NOIRE
        </text>

        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor={mainOrange} />
            <stop offset="95%" stopColor={mainYellow} />
          </linearGradient>
          <pattern
            id="wave"
            x="0"
            y="0"
            width="120"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              id="wavePath"
              d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z"
              mask="url(#mask)"
              fill={mainTurquoise}
            >
              <animateTransform
                attributeName="transform"
                begin="0s"
                dur="1.5s"
                type="translate"
                from="0,0"
                to="40,0"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>
      </SVG>
    </SVGContainer>
  );
};

const SVGContainer = styled.div.attrs(
  (props: { width: string; margin: string }) => ({
    width: props.width,
    margin: props.margin,
  }),
)`
  width: ${(props) => props.width || "200px"};
  max-width: 100%;
  margin: ${(props) => props.margin || 0};
`;

const SVG = styled.svg`
  font-family: "Luckiest Guy", cursive;
  font-weight: bold;
  max-width: 600px;
  height: auto;
`;

export default LMNLogo;
