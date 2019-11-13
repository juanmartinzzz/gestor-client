import styled from "styled-components";
import { Card, Avatar, CardHeader } from "@material-ui/core";

const colours = [
  "#019741",
  "#2ed2a7",
  "#9c3c9d",
  "#37acb6",
  "#e2bb81",
  "#b0637e",
  "#a8a8e7",
  "#738def",
  "#5d5393",
  "#05cff6",
  "#96e70e",
  "#d255ec",
  "#03288d",
  "#7d6407",
  "#dac826"
];

export const getColour = phone => {
  const sum = phone
    .split("")
    .reduce((sum, character) => sum + parseInt(character), 0);
  const randomIndex = sum % colours.length;

  return colours[randomIndex];
};

export const OrderCard = styled(Card)`
  margin: 24px 0;
`;

export const UserAvatar = styled(Avatar)`
  && {
    color: rgb(255, 255, 255);
    background-color: ${props => getColour(props.phone)};
  }
`;

export const OrderHeader = styled(CardHeader)`
  && {
    padding-bottom: 0px;
  }
`;
