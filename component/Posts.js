import React, {useState} from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { deletePost, editPost } from '@/redux/postsSlice'

// 
import Ripples from 'react-ripples'

// Bootstrap
import { Spinner, Form, Button, Modal } from 'react-bootstrap';

// Icons
import { FcCheckmark } from "react-icons/fc";
import { TbExclamationMark } from "react-icons/tb";
import { TfiPencil } from "react-icons/tfi";

// Components
import Tooltips from '@/utils/Tooltips';

export default function Posts({items}) {
    // Redux
    const disPatch = useDispatch()

    // Edit Modal
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
                    <Tooltips placement='top' text='Important'>
                        <div>
                            <TbExclamationMark onClick={() => {
                                disPatch(editPost({id: items.id, important: items.important ? false : true}))
                            }} className={`${items.important ? 'text-danger' : 'text-secondary'}`} />
                        </div>
                    </Tooltips>

                    <Tooltips placement='top' text='Edit'>
                        <div>
                            <TfiPencil onClick={() => {
                                    handleEditing()
                                    setPostId(items.id)
                                }} 
                            className={`${editing && items.id === postId ? 'text-info' : 'text-secondary'}`} />
                        </div>
                    </Tooltips>

                </div>
                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                    {loadingChecked === items.id ? 
                    <Spinner variant="success" animation="border" size="sm" /> :
                    items.done ?
                    <FcCheckmark onClick={() => handleDone(items)} /> :
                    <Tooltips placement='top' text='Done'>
                        <input onClick={() => handleDone(items)} style={{cursor: 'pointer', accentColor: 'green', width: '15px', height: '15px'}} className="" type="checkbox" id="flexCheckDefault" />
                    </Tooltips>
                    }
                    <Ripples>
                        <Button onClick={() => {
                            disPatch(deletePost(items))
                        }} style={{fontSize: '5cqws'}} className='p-1' variant="danger">Delete</Button>
                    </Ripples>
                </div>
            </div>

            <div className={`${items.done && 'text-decoration-line-through'} opacity-hover post-middle w-100 text-dark p-2 overflow-auto align-self-start text-start`}>
                <span className='text-secondary fw-bold'>ToDo.</span>
                <p style={{fontSize: '5cqw'}} className='p-0 m-0'>{items.description || '??'}</p>
            </div>

            {items.date && <span style={{fontSize: '12px'}} className='text-secondary text-start align-self-start ps-2'>{items.date}</span>}

            {editing && items.id === postId ? 
            <Modal show={editing} onHide={handleEditing}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Control 
                        defaultValue={items.description || ''} 
                        onChange={(e) => setEditInputValue(e.target.value)}
                        className='shadow-none'
                        placeholder="Edit post"
                        minLength='1'
                        maxLength='150' 
                        as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditing}>
                        Close
                    </Button>
                    <Button onClick={() => {
                        editInputValue && disPatch(editPost({id: items.id, description: editInputValue || '??'}))
                        handleEditing()
                    }} variant="primary">
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            : void(0)
            }
        </div>
    )
}
