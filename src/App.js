import React from 'react'
import './App.css';
import {Route} from "react-router-dom";
import ProductsContainer from "./components/ProductsContainer";
import FullInfo from "./components/FullInfo";

function App() {
  return (
    <div className="App">
        <Route exact path='/'
               render={ () => <ProductsContainer /> }/>
        <Route path='/cat/:id?'
               render={ () => <FullInfo /> }/>
    </div>
  );
}


export default App;






