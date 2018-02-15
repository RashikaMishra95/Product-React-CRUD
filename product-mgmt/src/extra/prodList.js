import React from 'react';
const axios=require('axios');
export default class List1 extends React.Component{
    constructor(){
        super();
        this.state={
            alldata:[]
        }
    }
    componentWillMount(){
        this.fetchAll()
    }
    fetchAll=()=>{
        axios.get('http://localhost:2222/list').then((success)=>{
            console.log("Data : ",success.data);
            if(!success)
            {
                console.log("No Record Found");
            }
            this.setState({alldata:success.data});
            console.log(`Data : ${this.state.alldata}`);
        }).catch((e)=>{
            console.log(`Error : ${e.messagee}`);
        });
    }
    addData=(obj)=>{
        axios.post(
            'http://localhost:2222/add',obj
        ).then((res)=>{
            console.log(`Response ${res.data}`);
            if(!res)
            { console.log("No Record Added");
            }
        }).catch((e)=>{
            console.log(`Error : ${e.message}`);
        });
        console.log("Form Data ::"+this.state.pname,this.state.comp,this.state.price,this.state.cat,this.state.subcat,this.state.qty);
    }
    render(){
        return(
            <div>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Qty</th>
                        <th>Operations</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.alldata.map((prod,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{prod.pname}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.cat}</td>
                                    <td>{prod.subcat}</td>
                                    <td>{prod.qty}</td>
                                    <td><button data-toggle='modal' data-target='#myModal' id={prod._id}  className="btn btn-info">Edit</button>
                                    <button id={prod._id}  className="btn btn-danger">Delete</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>


        )}
}