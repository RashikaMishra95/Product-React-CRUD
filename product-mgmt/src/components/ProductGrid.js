import React from 'react';

import '../bootstrap/css/style.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const axios=require('axios');


export default class ProductGrid extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pname:"",
            comp:"",
            price:"",
            cat:'',
            subcat:'',
            qty:"",
            subcatdata:[],
            catdata:[],
            edit:{},
            error:'',
            photo:'',
            previewFile:''
        }
    }

    handlepname=(e)=>{
        this.setState({
            pname:e.target.value
        })

    }

    handleprice=(e)=>{
        this.setState({
            price:e.target.value
        })
    }

    handleqty=(e)=>{
        this.setState({
            qty:e.target.value
        })
    }

    handlesubcat=(e)=>{
        this.setState({
            subcat:e.target.selectedOptions[0].value
        })
    }

    getCat=()=>{
        axios.get('http://localhost:2222/catlist').then((cat)=>{
            this.setState({catdata:cat.data})
        }).catch();

    }

    componentDidMount(){
        this.getCat();
    }

    getSubCat=(event)=>{
        this.setState({
            cat:event.target.selectedOptions[0].value
        })
        console.log(event.target.selectedOptions[0].id);
        axios.get(`http://localhost:2222/getsubcat/${event.target.selectedOptions[0].id}`).then((catnm)=>{
            console.log("City :"+catnm.data);
            this.setState({subcatdata:catnm.data})
        }).catch();
    }

    addProducts=(e)=>{
        e.preventDefault();
        var obj = {
            "pname": this.state.pname,
            "comp": this.state.comp,
            "price": this.state.price,
            "cat": this.state.cat,
            "subcat": this.state.subcat,
            "qty": this.state.qty
        }
        this.setState({
            pname:"",
            comp:"",
            price:"",
            cat:'',
            subcat:'',
            qty:"",
            edit:{}
        },()=>{


            if(this.state.edit.pname){

                this.props.editMethod(obj);

            }else{
                this.props.addMethod(obj);

            }
        })



    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.edit.pname !== undefined) {
            console.log("Props : ",nextProps.edit.pname);
            this.setState({
                edit: nextProps.edit,
                pname:nextProps.edit.pname,
                price:nextProps.edit.price,
                cat:nextProps.edit.cat,
                subcat:nextProps.edit.subcat,
                qty:nextProps.edit.qty,

            })
        }

    }

    checkProdFields=()=>{
    if(!(/^[A-Za-z ]\w+$/.test(this.state.pname))){
    this.setState({
        error:"Enter Valid Product Name ",
        pname:(!(/^[A-Za-z]\w+$/.test(this.state.pname)))?'':this.state.pname
    },()=>{
        if(this.state.error){
            alert(this.state.error);
        }
    })

}
else{
    this.setState({
        error:''
    })
}

}

    checkNum=()=>{

    if(!(/^[0-9]*$/.test(this.state.qty)) || !(/^[0-9]*$/.test(this.state.price)) ){
        this.setState({
            error:(!(/^[0-9]*$/.test(this.state.price)))?'Enter Valid Price.':'Enter Valid Qty.',
            qty:(!(/^[0-9]*$/.test(this.state.qty)))?'':this.state.qty,
            price:(!(/^[0-9]*$/.test(this.state.price)))?'':this.state.price
        },()=>{
            if(this.state.error){
                alert(this.state.error);
            }
        })


    }
    else{
        this.setState({
            error:''
        })
    }

}

    nullState=()=>{
        this.setState({
            pname:"",
            comp:"",
            price:"",
            cat:'',
            subcat:'',
            qty:"",
            subcatdata:[],
            edit:{}
        })
    }

    handleUploadFile = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                photo:file,
                previewFile: reader.result
            });
        };
        reader.readAsDataURL(file);
        console.log(`File Upload : ${this.state.previewFile}`);
    }

    render() {
        return (
            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Products</h4>
                        </div>
                        {/* Rendering Form either for Adding or Editing Products into a Modal*/}
                        <div className="modal-body">

                                <Form  className={'jumbotron'}><div align="center" className="labell"><label>{(this.state.edit.pname)?'Edit Products':'Add Products'}</label></div>
                                    <img src={'http://kingshurstmultimedia.com/images/store_box_icon.png'} height="80px"
                                         width="80px" className="profile-img"/>

                                    <FormGroup>
                                        <Input type="text" name="pname" id="pnameid" value={this.state.pname} onChange={this.handlepname} onBlur={this.checkProdFields} placeholder="Product Name" autoFocus={true} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Input type="text" name="price" id="priceid" value={this.state.price} onChange={this.handleprice} placeholder="Product Price" onBlur={this.checkNum}/>
                                    </FormGroup>

                                    <FormGroup>

                                        <Input type="select" name="cat" id="cat" onChange={this.getSubCat} value={this.state.cat}>
                                            <option id={0}>Select Category</option>{
                                            this.state.catdata.map((cat)=>{
                                                return(
                                                    <option id={cat._id} key={cat._id} value={cat.name}>{cat.name}</option>
                                                )
                                            })
                                        }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>

                                        <Input type="select" name="subcat" id="subcat" value={this.state.subcat} onChange={this.handlesubcat}>
                                            <option id={0} key={0}>{!(this.state.subcat)?'Select SubCategory':this.state.subcat}</option>
                                            {
                                                this.state.subcatdata.map((subcat)=>{
                                                    if(subcat.name!=this.state.subcat){
                                                        return(
                                                            <option id={subcat._id} key={subcat._id} value={subcat.name}>{subcat.name}</option>
                                                        )

                                                    }
                                                })
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="text" name="qty" id="qtyid"  value={this.state.qty} onChange={this.handleqty} placeholder="Product Qty" onBlur={this.checkNum}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="file" name="file" onChange={this.handleUploadFile} />
                                    </FormGroup>
                                    <Button className='btn btn-primary' onClick={this.addProducts} data-toggle="modal" data-target="#myModal">Submit</Button>

                                </Form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.nullState}>Close</button>
                            </div>
                            </div>
                        </div>

                    </div>

                </div>


        );
    }
}