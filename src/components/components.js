import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import { Divider } from "@material-ui/core";

export const SwipeableViewsWithMargin = styled(SwipeableViews)`
  margin: 24px 0;
`;

export const CardDivider = styled(Divider)`
  && {
    margin: 12px 0;
  }
`;
