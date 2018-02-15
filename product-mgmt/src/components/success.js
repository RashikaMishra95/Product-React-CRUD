import React from 'react';
import Grid from './ProductGrid';
import './../index.css';
import '../bootstrap/css/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
const axios=require('axios');

// class List1 extends React.Component{
//     constructor(){
//         super();
//         this.state={
//             alldata:[]
//         }
//     }
//     componentWillMount(){
//         this.fetchAll()
//     }
//     fetchAll=()=>{
//         axios.get('http://localhost:2222/list').then((success)=>{
//             console.log("Data : ",success.data);
//             if(!success)
//             {
//                 console.log("No Record Found");
//             }
//             this.setState({alldata:success.data});
//             console.log(`Data : ${this.state.alldata}`);
//         }).catch((e)=>{
//             console.log(`Error : ${e.messagee}`);
//         });
//     }
//     addData=(obj)=>{
//         axios.post(
//             'http://localhost:2222/add',obj
//         ).then((res)=>{
//             console.log(`Response ${res.data}`);
//             if(!res)
//             { console.log("No Record Added");
//             }
//         }).catch((e)=>{
//             console.log(`Error : ${e.message}`);
//         });
//         console.log("Form Data ::"+this.state.pname,this.state.comp,this.state.price,this.state.cat,this.state.subcat,this.state.qty);
//     }
//     render(){
//         return(
//             <div>
//                 <table className="table table-bordered table-hover">
//                     <thead>
//                     <tr>
//                         <th>Product</th>
//                         <th>Price</th>
//                         <th>Category</th>
//                         <th>Subcategory</th>
//                         <th>Qty</th>
//                         <th>Operations</th>
//
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {
//                         this.state.alldata.map((prod,index)=>{
//                             return(
//                                 <tr key={index}>
//                                     <td>{prod.pname}</td>
//                                     <td>{prod.price}</td>
//                                     <td>{prod.cat}</td>
//                                     <td>{prod.subcat}</td>
//                                     <td>{prod.qty}</td>
//                                     <td><button data-toggle='modal' data-target='#myModal' id={prod._id}  className="btn btn-info">Edit</button>
//                                         <button id={prod._id}  className="btn btn-danger">Delete</button></td>
//                                 </tr>
//                             )
//                         })
//                     }
//                     </tbody>
//                 </table>
//             </div>
//
//
//         )}
// }
class Success extends React.Component{
    constructor(){
        super();
        //alert('cons')
        this.state={
            alldata:[],
            editData:[],
            searchText:'',
            currPage:1,
            limit:3,
            found:false,
            searchArr:[]
        }
    }
    // Method to logout and destroy token generated
    logout=()=>{
        console.log("User :: "+localStorage.getItem('user'));
        this.props.history.push('/');
        if(localStorage.getItem('user')){
            localStorage.removeItem('user');
        }

    }

    // check if token doesn't exist then redirect to home page else Fetch all products details
    componentWillMount(){
    //    console.log('in mount');
        //alert('coimponment wil modj');
        if(!(localStorage.getItem('user'))){
            alert('null');
            this.props.history.push('/');
        }
        this.setState({
            edit:{}
        })
        this.fetchAll();
    }

    // get all records
    fetchAll=()=>{
     //   alert('fetch');
        axios.get('http://localhost:2222/list').then((success)=>{
            console.log("Data : ",success.data);
            if(!success)
            {
                console.log("No Record Found");
            }
            this.setState({alldata:success.data});
            console.log(`allData :`, this.state.alldata);
        }).catch((e)=>{
            console.log(`Error : ${e.messagee}`);
        });
    }

   // add products to DB and also to local array
    addData=(obj)=>{
        console.log('Add called');
        axios.post(
            'http://localhost:2222/add',obj
        ).then((res)=>{
            console.log(`Response ${res.data}`);
            if(!res)
            { console.log("No Record Added");
            }
            else{
                var dt=this.state.alldata;
                dt.splice(0,0,obj);
                this.setState({
                    alldata:dt
                })
            }
        }).catch((e)=>{
            console.log(`Error : ${e.message}`);
        });
        console.log("Form Data ::"+this.state.pname,this.state.comp,this.state.price,this.state.cat,this.state.subcat,this.state.qty);
    }

    // Update data 1. first remove edited from array and add new edited into it
    updData=(obj)=>{
        console.log('update called');
        console.log(this.state.editData._id);
        axios.post(`http://localhost:2222/edit/${this.state.editData._id}`,obj)
            .then((res)=>{
            console.log("Updated : "+res.data);
                    var index=this.state.alldata.findIndex(x=>
                        x._id===this.state.editData._id
                    );
                console.log(index);
                var data=this.state.alldata.filter((d)=>
                        this.state.editData._id!==d._id);
                console.log("Data : ",data);
                    data.splice(index,0,res.data);
                console.log("Data : ",data);
                this.setState({
                        alldata:data,
                        editData:{}
                    },()=>{
                        console.log(this.state.alldata);
                    })
            })
            .catch((err)=>{
            console.log("Error in Update "+err);
            });
    }

    // called at Delete as alert which in turn calls Deletedata()
    deleteDataAlert=(e)=>{
        //alert("in del alert");
    var id=e.target.id;
        confirmAlert({
          //  title: 'Delete Data',                        // Title dialog
            message: 'Are you sure to do Delete ?',               // Message dialog
           // childrenElement: () => <div>Confirm Box</div>,       // Custom UI or Component
            confirmLabel: 'Delete',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => {
                this.deleteData(id);
            },
            onCancel: () => {//alert('b')
            }
        })
    }

    // deleteData=(e)=>{
    //     var did=e.target.id;
    //     console.log(e.target.id);
    //
    //     axios.post(
    //         `http://localhost:2222/del/${did}`)
    //             .then((res)=>{
    //                 console.log(`Response`, res.data);
    //
    //             }).catch((e)=>{
    //         console.log(`Error : ${e.message}`);
    //     });
    // }
    // to delete from array and DB
    deleteData=(did)=>{
        axios.post(
            `http://localhost:2222/del/${did}`)

    .then((res)=>{
            console.log("Delete :" , res.data);

            var data=this.state.alldata.filter((d)=>{return(
                    res.data._id!==d._id)
                    }
                )
                console.log("After delete",data);
                this.setState({
                    alldata:data
                })
            console.log(`Response `,res.data);

        }).catch((e)=>{
            console.log(`Error : ${e.message}`);
        });
    }

    // checks for index of key passed and set a new Searched array
    seacrchData=(key,arr)=>()=>{
        console.log('in search data',key);
        console.log('Array :',arr);
        var isFiltered=false;
        if(key !== ''){
            isFiltered=true;
            var fileteredArr=[];
            for(var i=0;i<arr.length;i++){
                if(arr[i].pname.indexOf(key)>0 || arr[i].price.indexOf(key)>0 || arr[i].cat.indexOf(key)>0 || arr[i].subcat.indexOf(key)>0 ){
                    fileteredArr.push(arr[i]);

                }
            }
        }
        this.setState({
            searchArr:fileteredArr,
            found:isFiltered
        })
        console.log("Search Array :",this.state.searchArr);
    }

    // passing seacrh key and arr to searchData()
    handleSearchData=(arr)=>(e)=>{
        console.log("handled Data : ",e.target.value)
        this.setState({
            searchText:e.target.value
        },()=>{
            this.seacrchData(this.state.searchText,arr)(e);
        })

    }

  // per column sorting
    sortData=(e)=>{
        console.log('in sorting :: ',e.target.id);
        e.preventDefault();
        var col=e.target.id;
        console.log(col);
        var myData = [].concat(this.state.alldata)
            .sort((a, b) => a[col] > b[col]);

        this.setState({
            alldata:myData
        })
        console.log('sorted : ',this.state.alldata);
    }
    // to change the current page no
    handleClick=(e)=>{
        console.log(e.target.id);
        this.setState({
            currPage:Number(e.target.id)
        })
    }

    render(){
        console.log("Found ::",this.state.found);
        var myArr=(this.state.found)?this.state.searchArr:this.state.alldata;
        console.log("My arr ::",this.state.alldata);
        var end=this.state.currPage*this.state.limit;
        var start=end-this.state.limit;
        console.log("start",start);
        console.log("end",end);
        var currentRec=(this.state.found)?myArr.slice(0,this.state.limit):myArr.slice(start,end);
        var allPages=[];
        var pageList;
        // To get no. of Pages according to limit
        console.log("Curr Rec ::",currentRec);
        for(var pg=1;pg<=Math.ceil(this.state.alldata.length/this.state.limit);pg++){
            allPages.push(pg);
        }

        return(
            <div>
                <div align="center">
                    <p className='log'>Logged in Successfully...</p><br/>
                    {/*<button className='btn btn-primary' data-toggle="modal" data-target="#myModal">+</button><br/><br/>*/}

                    {/*<Grid addMethod={this.addData} edit={this.state.editData} editMethod={this.updData}/>*/}
                </div>
                <div>
                    <div>
                        <table className="table table-bordered  table-hover bg-title">
                            <tbody>
                                <tr>
                                    <td align='right'>
                                        <button className='btn btn-primary' data-toggle="modal" data-target="#myModal" onClick={()=>{
                                            this.setState({
                                                editData:{}
                                            })
                                        }}>+</button><br/><br/>
                                        <Grid addMethod={this.addData} edit={this.state.editData} editMethod={this.updData}/>
                                    </td>
                                    <td>
                                        {/*To push page numbers in Array using MAP()*/}
                                        {
                                          pageList=allPages.map((pg,index)=>{
                                                    return(
                                                            <ul className="pagination display">
                                                                <li className="page-item"><a className="page-link" href="#" key={index} id={index+1} onClick={this.handleClick}>{pg}</a></li>

                                                            </ul>
                                                    )
                                                })
                                        }
                                    </td>

                                    <td>
                                        <div className="form-inline navbar navbar-expand-sm bg-dark navbar-dark float-right">
                                            <input className="form-control" type="text" placeholder="Search Products"  value={this.state.searchText} onChange={this.handleSearchData(this.state.alldata)} />
                                            <button className="btn btn-warning" type="submit">Search</button>
                                        </div>                                    </td>
                                    <td colspan='6' align="right">
                                        <button className='btn btn-dark' onClick={this.logout}>Logout</button>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                        <table className="table table-bordered  table-hover" >

                            <thead>
                            <tr className='phead' align="center">
                                <th onClick={this.sortData}  id="pname">Product</th>
                                <th onClick={this.sortData}  id="price">Price</th>
                                <th onClick={this.sortData}  id="cat">Category</th>
                                <th onClick={this.sortData}  id="subcat">Subcategory</th>
                                <th onClick={this.sortData}  id="qty">Qty</th>
                                <th onClick={this.sortData}  id="pname">Operations</th>
<th>Multi Delete</th>
                            </tr>
                            </thead>
                            <tbody align="center">
                            {

                                currentRec.map((prod,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{prod.pname}</td>
                                            <td>{prod.price}</td>
                                            <td>{prod.cat}</td>
                                            <td>{prod.subcat}</td>
                                            <td>{prod.qty}</td>
                                            <td  align="center"><button data-toggle='modal' data-target='#myModal' id={prod._id} onClick={()=>{
                                                this.setState({
                                                     btn:true,
                                                     editData:prod
                                                })
                                            }} className="btn btn-info" >Edit</button>

                                                <button id={prod._id}  className="btn btn-danger" onClick={this.deleteDataAlert}>Delete</button></td>
                                        <td align="center"><input
                                            type="checkbox"
                                        /></td></tr>
                                    )
                                })

                            }
                            <tr><td colSpan='7' align="right">  <button  className="btn btn-danger " >Delete ALL</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}
export default Success;