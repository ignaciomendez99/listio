import React from 'react'
import Header from './components/Header';
import Productos from './components/Productos'
import NuevoProducto from './components/NuevoProducto'
import EditarProducto from './components/EditarProducto'

//REDUX
import { Provider } from 'react-redux'
import store from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
function App() {
  return (
    <Router>
      <Provider store={store}>

        {/* //SE MANTIENE EL HEADER EN TODAS LAS PAGINAS PORQUE ESTA FUERA DEL SWITCH  */}
        <Header />

        <div className="container mt-5">
            <Switch>
              <Route exact path="/" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" component={EditarProducto} />

            </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
