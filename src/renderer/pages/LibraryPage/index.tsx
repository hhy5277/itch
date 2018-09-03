import { messages } from "common/butlerd";
import { Profile } from "common/butlerd/messages";
import { Dispatch } from "common/types";
import React from "react";
import FiltersContainer from "renderer/basics/FiltersContainer";
import { hook } from "renderer/hocs/hook";
import { dispatchTabPageUpdate } from "renderer/hocs/tab-utils";
import { withProfile } from "renderer/hocs/withProfile";
import { withTab } from "renderer/hocs/withTab";
import ItemList from "renderer/pages/common/ItemList";
import Page from "renderer/pages/common/Page";
import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
import { makeGameStripe } from "renderer/pages/common/GameStripe";

const OwnedGameStripe = makeGameStripe(messages.FetchProfileOwnedKeys);
const InstalledGameStripe = makeGameStripe(messages.FetchCaves);

class LibraryPage extends React.PureComponent<Props> {
  render() {
    const { profile } = this.props;

    return (
      <Page>
        <FiltersContainer loading={false} />

        <ItemList>
          <OwnedGameStripe
            title={["sidebar.owned"]}
            href="itch://library/owned"
            params={{ profileId: profile.id }}
            getGame={this.ownedGetGame}
          />
          <InstalledGameStripe
            title={["sidebar.installed"]}
            href="itch://library/installed"
            params={{ sortBy: "lastTouched" }}
            getGame={this.installedGetGame}
          />
        </ItemList>
      </Page>
    );
  }

  ownedGetGame = OwnedGameStripe.getGameCallback(x => x.game);
  installedGetGame = InstalledGameStripe.getGameCallback(x => x.game);

  componentDidMount() {
    dispatchTabPageUpdate(this.props, { label: ["sidebar.library"] });
  }
}

interface Props extends MeatProps {
  profile: Profile;
  dispatch: Dispatch;
  tab: string;
}

export default withProfile(withTab(hook()(LibraryPage)));
