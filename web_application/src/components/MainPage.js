import React from "react";
import { Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom'
import Error404 from "./404";
import Home from "./Home";

const MainPage = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/test" component={Error404} /> */}
        {/* <Route path="/Rooms" component={Rooms} /> */}

        {/* // <Route path="/supermasters" component={Supermasters} />
        <Route path="/domains" component={Domains} />
        // <Route path="/records" component={Records} />
        // <Route path="/administration" component={Administration} />
        // <Route path="/changePassword" component={ChangePassword} />
        // <Route path="/history" component={HistoryPanel} />
        // <Route path="/domain/:id" component={Domain}/>
        // <Route path="/privacy-policy" component={LogoutHelper}/>  */}
        <Route component={Error404} />
      </Switch>
    </>
  );
};

// ReactDOM.render(MainPage, document.getElementById('app'))

export default MainPage;
module.hot.accept();
