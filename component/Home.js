import React, {useState, useEffect} from 'react'
// 
import Link from 'next/link';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '@/redux/postsSlice'

// 
import Ripples from 'react-ripples'

// Bootstrap
import { InputGroup, Spinner, Form, Button } from 'react-bootstrap';

// Icons
import { FcCheckmark } from "react-icons/fc";
import { TbExclamationMark } from "react-icons/tb";
import { TfiPencil } from "react-icons/tfi";
import { AiFillGithub } from "react-icons/ai";

export default function Home() {
    const [important, setImportant] = useState(false)
    const handleImportant = () => {
        important ? setImportant(false) : setImportant(true)
    }
    // 
    const [editing, SetEditing] = useState(false)
    const handleEditing = () => {
        editing ? SetEditing(false) : SetEditing(true)
    }
    // Replace later
    const [done, setDone] = useState(false)
    const [loadingChecked, setLoadingChecked] = useState(false)
    const handleDone = () => {
        if(done){
            
            setDone(false)
        }else{
            setLoadingChecked(true)
            setTimeout(() => {
                setLoadingChecked(false)
                setDone(true)
            }, 500)
        }
    }
    // 
    const disPatch = useDispatch()
    const posts = useSelector((state) => state.posts.posts)
    

    return (
        <div className="main-content-container bg-dark text-white vh-100 vw-100 d-flex flex-column justify-content-between align-items-center">
            <main className='main-container my-5 container-fluid d-flex flex-column justify-content-center align-items-center gap-5'>
                <div className='input-container container d-flex flex-column justify-content-center align-items-center gap-2'>
                    <div style={{maxWidth: '800px', height: '60px'}} className="input-group position-relative overflow-hidden">
                        <textarea style={{outline: 'none'}} className='pe-5 h-100 w-100 textarea-container position-relative' placeholder='Do something with my life.' name='input-textarea' minLength='1' maxLength='200' autoFocus autoCorrect='on' />
                        <TbExclamationMark onClick={handleImportant} className={`position-absolute end-0 top-50 translate-middle fs-2 ${important ? 'text-danger' : 'text-secondary'}`} />
                    </div>
                    <Ripples className='w-50'>
                        <Button className='w-100' variant="success">Add</Button>
                    </Ripples>
                </div>

                <div className='container px-0 d-flex flex-column justify-content-center align-items-center'>
                    <div style={{height: '50px'}} className='w-100 options-container bg-white d-flex flex-row justify-content-center align-content-center gap-2 px-1 py-2'>
                        <Form.Control className='w-75 shadow-none' placeholder="Search..." aria-label="Search" />
                        <Form.Select className='w-50 shadow-none' aria-label="Select sorting">
                            <option value="1">Newest</option>
                            <option value="2">Oldest</option>
                            <option value="3">Important</option>
                            <option value="4">Done</option>
                        </Form.Select>
                    </div>

                    <div style={{minHeight: '300px', height: 'auto'}} className='posts-containers w-100 p-3 bg-secondary bg-opacity-10 overflow-auto'>

                        <div style={{containerType: 'size', height: '150px'}} className={`post-container py-1 bg-white text-dark d-flex flex-column justify-content-between align-items-center rounded overflow-hidden shadow`}>
                            <div className='post-top border-bottom border-secondary p-1 w-100 d-flex flex-row justify-content-between align-items-center'>
                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                    <TbExclamationMark className={`text-secondary`} />
                                    <TfiPencil onClick={handleEditing} className={`${editing ? 'text-info' : 'text-secondary'}`} />
                                </div>
                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                    {loadingChecked ? <Spinner variant="success" animation="border" size="sm" /> :
                                    done ?
                                    <FcCheckmark onClick={handleDone} /> :
                                    <input onClick={handleDone} style={{cursor: 'pointer', accentColor: 'green', width: '15px', height: '15px'}} className="" type="checkbox" id="flexCheckDefault" />
                                    }
                                    <Ripples>
                                        <Button style={{fontSize: '5cqws'}} className='p-1' variant="danger">Delete</Button>
                                    </Ripples>
                                </div>
                            </div>

                            <div className={`${done && 'text-decoration-line-through'} post-middle text-dark p-2 overflow-auto align-self-start text-start`}>
                                <span className='text-secondary fw-bold'>ToDo.</span>
                                <p style={{fontSize: '5cqw'}} className='p-0 m-0'>Do something with my fucking life </p>
                            </div>

                            {editing ? 
                            <div className='post-update w-100'>
                                <InputGroup className="">
                                    <Form.Control
                                        style={{fontSize: '4cqw'}}
                                        className='shadow-none'
                                        placeholder="Edit post"
                                        aria-label="Edit post input"
                                        aria-describedby="basic-addon2"
                                    />
                                    <Button style={{fontSize: '4cqw'}} variant="outline-info" id="button-addon2">
                                        Update
                                    </Button>
                                </InputGroup>
                            </div> 
                            : void(0) 
                            }
                        </div>

                    </div>

                </div>

            </main>

            <footer className="bg-black p-1 w-100 d-flex flex-row flex-wrap justify-content-center align-items-center gap-2">
                <div className='mw-25 d-flex flex-row flex-wrap justify-content-center align-items-center gap-2'>
                    <p className='p-0 m-0'>Created By:<span className='ms-2 fw-bold p-0 m-0'>Viper</span></p> |
                    <Link title='GitHub' href='https://github.com/xvpc' target='_blank'><AiFillGithub className='bg-dark fs-3 p-1'/></Link>
                </div>
            </footer>
        </div>
    )
}
