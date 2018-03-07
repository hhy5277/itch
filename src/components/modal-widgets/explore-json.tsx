import * as React from "react";

import { ModalWidgetDiv } from "./modal-widget";

import JSONTree from "react-json-tree";
import theme from "./json-tree-theme";
import { IModalWidgetProps } from "./index";
import styled from "../styles";

class ExploreJson extends React.PureComponent<IProps> {
  render() {
    const params = this.props.modal.widgetParams;
    const { data } = params;

    return (
      <ModalWidgetDiv>
        <JSONTreeContainer>
          <JSONTree data={data} theme={theme} invertTheme={false} />
        </JSONTreeContainer>
      </ModalWidgetDiv>
    );
  }
}

const JSONTreeContainer = styled.div`
  width: 100%;
  min-height: 350px;
  overflow-y: auto;
`;

// props

export interface IExploreJsonParams {
  data: any;
}

export interface IExploreJsonResponse {}

interface IProps
  extends IModalWidgetProps<IExploreJsonParams, IExploreJsonResponse> {}

export default ExploreJson;
