import React, {useState} from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { deletePost, editPost } from '@/redux/postsSlice'

// 
import Ripples from 'react-ripples'

// Bootstrap
import { InputGroup, Spinner, Form, Button } from 'react-bootstrap';

// Icons
import { FcCheckmark } from "react-icons/fc";
import { TbExclamationMark } from "react-icons/tb";
import { TfiPencil } from "react-icons/tfi";

export default function Posts({items}) {
    // Redux
    const disPatch = useDispatch()

    // Edit Input
    const [postId, setPostId] = useState(null)
    const [editInputValue, setEditInputValue] = useState('')

    const [editing, SetEditing] = useState(false)
    const handleEditing = () => {
        if(editing){
            SetEditing(false)
            setEditInputValue('')
        }else{
            SetEditing(true)
        }
    }

    // Done
    const [loadingChecked, setLoadingChecked] = useState('')
    const handleDone = (item) => {
        if(item.done){
            disPatch(editPost({id: item.id, done: false}))
        }else{
            setLoadingChecked(item.id)
            setTimeout(() => {
                setLoadingChecked('')
                disPatch(editPost({id: item.id, done: true}))
            }, 500)
        }
    }

    // 
    return (
        <div style={{containerType: 'size', height: '150px'}} className={`${items.important ? 'border border-danger' : 'rounded'} post-container pt-1 bg-white text-dark d-flex flex-column justify-content-between align-items-center overflow-hidden shadow`}>
            <div className='post-top border-bottom border-secondary p-1 w-100 d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                    <TbExclamationMark onClick={() => {
                        disPatch(editPost({id: items.id, important: items.important ? false : true}))
                        console.log('dis something')
                    }} className={`${items.important ? 'text-danger' : 'text-secondary'}`} />
                    <TfiPencil onClick={
                        () => {
                            handleEditing()
                            setPostId(items.id)
                        }
                        } className={`${editing && items.id === postId ? 'text-info' : 'text-secondary'}`} />
                </div>
                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                    {loadingChecked === items.id ? 
                    <Spinner variant="success" animation="border" size="sm" /> :
                    items.done ?
                    <FcCheckmark onClick={() => handleDone(items)} /> :
                    <input onClick={() => handleDone(items)} style={{cursor: 'pointer', accentColor: 'green', width: '15px', height: '15px'}} className="" type="checkbox" id="flexCheckDefault" />
                    }
                    <Ripples>
                        <Button onClick={() => {
                            disPatch(deletePost(items))
                        }} style={{fontSize: '5cqws'}} className='p-1' variant="danger">Delete</Button>
                    </Ripples>
                </div>
            </div>

            <div className={`${items.done && 'text-decoration-line-through'} post-middle text-dark p-2 overflow-auto align-self-start text-start`}>
                <span className='text-secondary fw-bold'>ToDo.</span>
                <p style={{fontSize: '5cqw'}} className='p-0 m-0'>{items.description || '??'}</p>
            </div>

            {editing && items.id === postId ? 
            <div className='post-update w-100'>
                <InputGroup className="">
                    <Form.Control
                        value={editInputValue}
                        onChange={(e) => setEditInputValue(e.target.value)}
                        style={{fontSize: '4cqw'}}
                        className='shadow-none'
                        placeholder="Edit post"
                        aria-label="Edit post input"
                        aria-describedby="basic-addon2"
                    />
                    <Button onClick={() => {
                        disPatch(editPost({id: items.id, description: editInputValue || '??'}))
                        handleEditing()
                    }} style={{fontSize: '4cqw'}} variant="outline-info" id="button-addon2">
                        Update
                    </Button>
                </InputGroup>
            </div> 
            : void(0) 
            }
        </div>
    )
}
