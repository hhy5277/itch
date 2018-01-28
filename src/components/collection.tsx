import * as React from "react";

import Games from "./games";
import GameFilters from "./game-filters";
import TitleBar from "./title-bar";
import IconButton from "./basics/icon-button";

import { IMeatProps } from "./meats/types";

import styled, * as styles from "./styles";
import { connect } from "./connect";

import * as actions from "../actions";
import { dispatcher } from "../constants/action-types";
import { Space } from "../helpers/space";
import urls from "../constants/urls";
import { injectIntl, InjectedIntl } from "react-intl";

const CollectionDiv = styled.div`${styles.meat()};`;

export class Collection extends React.PureComponent<IProps & IDerivedProps> {
  render() {
    const { tab } = this.props;

    return (
      <CollectionDiv>
        <TitleBar tab={tab} />
        <GameFilters tab={tab}>
          <IconButton icon="repeat" onClick={this.onRepeat} />
          <IconButton
            icon="redo"
            hint={this.props.intl.formatMessage({ id: "browser.popout" })}
            hintPosition="bottom"
            onClick={this.popOutBrowser}
          />
        </GameFilters>
        <Games tab={tab} />
      </CollectionDiv>
    );
  }

  onRepeat = () => {
    this.props.tabReloaded({ tab: this.props.tab });
  };

  popOutBrowser = () => {
    const { tabData } = this.props;
    const sp = Space.fromData(tabData);
    const c = sp.collection();
    if (c) {
      // fill in a dummy slug, the app will redirect
      let url = `${urls.itchio}/c/${c.id}/hello`;
      this.props.openUrl({ url });
    }
  };
}

interface IProps extends IMeatProps {}

interface IDerivedProps {
  tabReloaded: typeof actions.tabReloaded;
  openUrl: typeof actions.openUrl;

  intl: InjectedIntl;
}

export default connect<IProps>(injectIntl(Collection), {
  dispatch: dispatch => ({
    tabReloaded: dispatcher(dispatch, actions.tabReloaded),
    openUrl: dispatcher(dispatch, actions.openUrl),
  }),
});
