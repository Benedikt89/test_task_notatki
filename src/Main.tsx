import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router";
import {connect} from "react-redux";
import {selectErrorByKey, selectFetchingByKey} from "./redux/app/selectors";
import {AppStateType} from "./redux/store";
import Header from "./components/Header/Header";
import {fetchTickets} from "./redux/data/actions";
import TicketPage from "./views/tickers/TickersView";

interface I_props {}

interface I_connectedProps {
  error: { message: string } | null
  isFetching: boolean
}

interface I_dispatchedProps {
  fetchTickets: () => void
}

interface I_MainProps extends I_props, I_connectedProps, I_dispatchedProps {}

interface I_MainState {
  mounted: boolean
}

class Main extends Component<I_MainProps, I_MainState> {
  constructor(props: I_MainProps) {
    super(props);
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    this.props.fetchTickets();
  }

  render() {
    return (
      <div className={"main-wrapper"}>
        <main>
          <Header/>
          <div className={"content-wrapper"}>
            <Switch>
              <Route exact path="/"
                     render={() => <Redirect to={"/tickets"}/>}/>

              <Route
                path="/tickets"
                component={() => (
                  <TicketPage />
                )}
              />

              <Route path="*" render={() => <div>Error 404</div>}/>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType, props: I_props): I_connectedProps => {
  return {
    error: selectErrorByKey(state, 'fetchTickets'),
    isFetching: selectFetchingByKey(state, 'fetchTickets'),
  }
};

let ComposedComponent = connect(
  mapStateToProps, {fetchTickets}
)(Main);

export default ComposedComponent;