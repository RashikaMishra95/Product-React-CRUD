import React from 'react';
import ReactDOM from 'react-dom';
import {ConnectedRouter} from 'react-router-redux';
import './index.css';
import App from './App';
import Success from './components/success';
import Product from './components/product';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Link, Route, NavLink, Switch} from 'react-router-dom';

import createHistory from 'history/createBrowserHistory'

const history = createHistory();

class Mid extends React.Component {
    render() {
        return (
            <section>
                <div id="hero-image" align="center">
                    <div>
                        <h2><strong>With best of Products</strong><br/>
                        </h2>
                        <a href="#" className="button-1">Lets Shop</a>
                    </div>
                    <div id="demo" className="carousel slide" data-ride="carousel">


                        <ul className="carousel-indicators">
                            <li data-target="#demo" data-slide-to="0" className="active"></li>
                            <li data-target="#demo" data-slide-to="1"></li>
                            <li data-target="#demo" data-slide-to="2"></li>
                        </ul>


                        <div className="carousel-inner ">
                            <div className="carousel-item active">
                                <img className="img"
                                     src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/7390287/vpavic_161031_1256_0075.0.jpg"
                                     alt="Los Angeles"/>
                            </div>
                            <div className="carousel-item">
                                <img className="img"
                                     src="http://www.lg.com/us/images/MC/features/mobile-accessories-hero-11-30-16.jpg"
                                     alt="Chicago"/>
                            </div>
                            <div className="carousel-item">
                                <img className="img"
                                     src="https://i2.wp.com/techarx.com/wp-content/uploads/2014/07/Microsoft-products-wallpaper-desktop-background-1920x1200.jpg"
                                     alt="New York"/>
                            </div>
                        </div>

                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#demo" data-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </a>

                    </div>

                    {/*{*/}
                    {/*true &&*/}
                    {/*<Success*/}
                    {/*/>*/}
                    {/*}*/}

                </div>
            </section>
        );
    }

}

const About = () => (
    <p>About</p>
)

ReactDOM.render(
            <Product history={history}/>
    , document.getElementById('root'));

/*
import {Router,Route,IndexRoute,browserHistory} from 'react-router';

const   routes =(
        <div>
        <Router history={browserHistory}>
            <Route components={Main} path="/">
                <IndexRoute components={BooksList}/>
                <Route path="/admin" components={BookForm}/>
                <Route path="/cart" components={Cart}/>
            </Route>
        </Router>
        </div>
);
export default routes;*/