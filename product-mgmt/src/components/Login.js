import React,{Component} from "react";
import ReactDOM from 'react-dom'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import "../bootstrap/css/style.css"
import history from '../history';
import {LOGIN_URL} from '../constant_url/const';
import  { Redirect } from 'react-router-dom'
import {LOGIN_PASSPORT} from '../constant_url/const';
import "../React_Bootstrap/login_boot.css";
import Success from './success';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        };
    }
    emailHandle=(e)=>{
        e.preventDefault();
        this.setState({
            email:e.target.value
        });
    }

    pwdHandle=(e)=>{
        e.preventDefault();
        this.setState({
            password:e.target.value
        });
    }
    loginHandler=(event)=>{

        event.preventDefault();

        let logUser=this.state;
        console.log(logUser);

        axios.post(LOGIN_PASSPORT,{
            email: this.state.email,
            password: this.state.password,
            mode:'cors'
        }).then((res)=>{
            console.log("In Then "+res.data);

            if(res.data.message==='Success'){
                console.log("Res success : ",res);
                let token=jwt.sign(logUser,'Rashika'); //object,privatekey
                console.log("Token :",token);
                localStorage.setItem('user',token);
                this.props.history.push('/success');
            }
            else{
                console.log("Failed to Login",res);
            }
        }).catch((err)=>{
            console.log(err);
        });



    };

    render(){
        //debugger;
        return(
            <div className={'col-md-5 offset-4 container'}>
                    <form className={'jumbotron'}>
                        <div className="container" align="center">
                                    <img src={'http://www.pvhc.net/img148/lonxyevkaadnagagquxa.png'} height="80px"
                                         width="80px" className="profile-img"/>

                                    <div className="form-group">

                                        <input type="email" className="form-control totwidth" id="email"
                                               placeholder="Enter email" required autoFocus onChange={this.emailHandle}
                                               value={this.state.email}/>
                                    </div>
                                    <div className="form-group">

                                        <input type="password" className="form-control totwidth" id="pwd"
                                               placeholder="Enter password" required onChange={this.pwdHandle}
                                               value={this.state.password}/>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" name="remember"/>
                                            <label className="mr-chk"> Remember me</label>
                                        </label>
                                    </div>

                                    <div> <button type="submit" className="btn btn-primary"
                                                  data-dismiss="modal" onClick={(event) => this.loginHandler(event)}>Sign in
                                    </button> </div>
                            <div><a href='http://localhost:5555/auth/google'><img className="google" src="https://vignette.wikia.nocookie.net/shopkin/images/d/d1/Google_Plus.png/revision/latest?cb=20141124022257"/></a></div>

                                    {/*<button className="btn btn-block btn-social btn-google totwidth" type="button"
                                            onClick="location.href = '/auth/google'">
                                        <span className="fa fa-google"></span>
                                        Google
                                    </button>*/}

                                    <button className="btn btn-block btn-social btn-facebook totwidth" type="button"
                                            onClick={this.loginHandler}>
                                        <span className="fa fa-facebook"></span>
                                        Facebook
                                    </button>


                                </div>



                    </form>
            </div>

        );
    }

}

// export default class Login extends Component{
//
//     validateForm(){
//         return this.state.email.length>0 && this.state.password.length>0;
//     }
//     render(){
//         return(
//
//             <div className="modal fade" id="myModal">
//                 <div className="modal-dialog " >
//                     <div className="modal-content ">
//                         <div className="modal-header">
//                             <h3 className="modal-title">Sign In</h3>
//                             <button type="button" className="close" data-dismiss="modal">&times;</button>
//
//                         </div>
//                         <div className="modal-body wall">
//                             <Login1/>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="submit" className="btn btn-danger" data-dismiss="modal">Close</button>
//                         </div>
//
//                     </div>
//                 </div>
//             </div>
//
//
//         );
//     }
//
// }