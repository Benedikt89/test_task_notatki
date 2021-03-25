import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router";
import {connect} from "react-redux";
import TicketList from "./components/TicketList";
import {selectErrorByKey, selectFetchingByKey} from "./redux/app/selectors";
import {AppStateType} from "./redux/store";
import Header from "./components/Header/Header";
import {fetchTickets} from "./redux/tickets/actions";

interface I_props {
}

interface I_connectedProps {
  ticketsIds: string[]
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
    let {ticketsIds} = this.props;
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
                  <TicketList ticketIds={ticketsIds}/>
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

const mapStateToProps = (state: AppStateType): I_connectedProps => {
  return {
    ticketsIds: state.tickets.ticketsIds,
    error: selectErrorByKey(state, 'fetchTickets'),
    isFetching: selectFetchingByKey(state, 'fetchTickets'),
  }
};

let ComposedComponent = connect(
  mapStateToProps, {fetchTickets}
)(Main);

export default ComposedComponent;