import React from 'react'
const ProductForm=(props)=> {
    return(
        <form onSubmit={props.addTask}>
            <input type="text" value={props.currentTask}
                   onChange={props.changeTask}/>


            <button type="submit">ADD</button>
        </form>
    )
}
export default TodoForm;