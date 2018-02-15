import React from 'react';
import {BrowserRouter as Router,Link,Route,NavLink,Switch} from 'react-router-dom'
import history from '../history';
import ProductGrid from './ProductGrid';
import Login from './Login';
import Success from './success';
import '../bootstrap/css/reset.css';
import '../bootstrap/css/style.css';
const axios =require('axios');

class Links extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (

            <section>
                <ul className="mr-10">
                    <li className="display text"><Link activeClassName="selected" to="/"><i
                        className="fa fa-home"></i>Home</Link>
                    </li>
                    <span></span>
                    <li className="display"><NavLink activeClassName="selected" to="/login" ><i class="fa fa-user"></i>Login</NavLink></li>
                    <li className="display"><NavLink activeClassName="selected" to="/reg"><i className="fa fa-edit"></i>Register</NavLink>
                    </li>
                    <li className="display"><NavLink activeClassName="selected" to="/prod"><i className="fa fa-edit"></i>Products</NavLink>
                    </li>

                </ul>




            </section>
        )
    }
};

const About=()=>(
    <p>About</p>
)


 class Mid extends React.Component{
    render(){
        return(
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
                                <img className="img" src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/7390287/vpavic_161031_1256_0075.0.jpg" alt="Los Angeles"/>
                            </div>
                            <div className="carousel-item">
                                <img className="img" src="http://www.lg.com/us/images/MC/features/mobile-accessories-hero-11-30-16.jpg" alt="Chicago"/>
                            </div>
                            <div className="carousel-item">
                                <img className="img" src="https://i2.wp.com/techarx.com/wp-content/uploads/2014/07/Microsoft-products-wallpaper-desktop-background-1920x1200.jpg" alt="New York"/>
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

export default class Product extends React.Component{
     constructor(props){
         super(props);
         this.state={
             toggle:false
         }
     }
    render() {
        return (
            <section>
                <div>
                    {/* 1. Header */}
                    <div  className='bg-info hd1'>
                    <h1 align="center">Product Management System</h1>
                    </div>
                    <div className={'row'}>
                        <div className={'col-md-12'}>

                        {/*<ul className="nav navbar-nav display ">*/}

                        <Router history={history}>
                            <div>
                                <nav className="navbar navbar-inverse col-md-12  display">
                                    {/* 2. Links*/}
                                    <Links newProps={this.props}/>
                                </nav>

                                    <Route exact path={"/login"} component={Login}/>
                                    <Route exact path={"/success"} component={Success}/>
                                    <Route exact path={"/prod"} component={ProductGrid}/>

                                    { /* 3. Mid */ }
                                    <Route exact path={"/"} component={Mid}/>

                            </div>

                        </Router>
                        </div>
                    </div>

                </div>
                { /* 4. Footer */ }
                <div>
                <footer>
                    <div className="wrapper">
                        <div id="footer-info">
                            <p>Copyright 2018 LAnet. All rights reserved.</p>
                            <p><a href="#">Terms of Service</a> I <a href="#">Privacy</a></p>
                        </div>
                        <div id="footer-links">
                            <ul>
                                <li><h5>Company</h5></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Meet The Team</a></li>
                                <li><a href="#">What We Do</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                            <ul>
                                <li><h5>Products</h5></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Meet The Team</a></li>
                                <li><a href="#">What We Do</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                            <ul>
                                <li><h5>Services</h5></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Meet The Team</a></li>
                                <li><a href="#">What We Do</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>
                        <div className="clear"></div>
                    </div>
                </footer>
                </div>
            </section>
        );
    }
}
