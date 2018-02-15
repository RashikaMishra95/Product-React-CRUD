checkMail=()=>{
    if(!(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.mail))) {
        this.setState({
            error:'Enter a valid email address.',
            mail:''
        })
    }
    else{
        this.setState({
            error:''
        })
    }
}

checkName=()=>{
    if(!(/^[A-Za-z]\w+$/.test(this.state.fnm)) || !(/^[A-Za-z]\w+$/.test(this.state.lnm))){
        this.setState({
            error:(!(/^[A-Za-z]\w+$/.test(this.state.fnm)))?'Enter Valid First Name.':'Enter Valid Last Name.',
            fnm:(!(/^[A-Za-z]\w+$/.test(this.state.fnm)))?'':this.state.fnm,
            lnm:(!(/^[A-Za-z]\w+$/.test(this.state.lnm)))?'':this.state.lnm
        })
    }
    else{
        this.setState({
            error:''
        })

    }
}