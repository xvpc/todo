import React, {useState} from 'react'

// 
import Link from 'next/link';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '@/redux/postsSlice'

// 
import Ripples from 'react-ripples'

// Bootstrap
import { Form, Button } from 'react-bootstrap';

// Icons
import { TbExclamationMark } from "react-icons/tb";
import { AiFillGithub } from "react-icons/ai";
import { TbChecklist } from "react-icons/tb";

// Components
import Posts from './Posts';

export default function Home() {
    const posts = useSelector((state) => state.posts.posts)
    const disPatch = useDispatch()

    // Important
    const [important, setImportant] = useState(false)
    const handleImportant = () => {
        important ? setImportant(false) : setImportant(true)
    }

    // TextArea
    const [textAreaValue, setTextAreaValue] = useState('')
    const handleTextAreaChange = (e) => {
        setTextAreaValue(e.target.value)
    }
    const handleTextAreaSubmit = () => {
        if(textAreaValue){
            disPatch(addPost({
                id: Date.now(),
                description: String(textAreaValue),
                done: false,
                important: important || false,
            }))
            setTextAreaValue('')
            setImportant(false)
        }
    }

    // 
    return (
        <div className="main-content-container bg-dark text-white min-vh-100 d-flex flex-column justify-content-between align-items-center">
            <main className='main-container my-5 container-fluid d-flex flex-column justify-content-center align-items-center gap-5'>
                <div className='input-container container d-flex flex-column justify-content-center align-items-center gap-2'>
                    <div style={{maxWidth: '800px', height: '60px'}} className="input-group position-relative overflow-hidden">
                        <textarea value={textAreaValue} onChange={handleTextAreaChange} style={{outline: 'none'}} className='pe-5 h-100 w-100 textarea-container position-relative' placeholder='Do something with my life.' name='input-textarea' minLength='1' maxLength='200' autoFocus autoCorrect='on' />
                        <TbExclamationMark onClick={handleImportant} className={`position-absolute end-0 top-50 translate-middle fs-2 ${important ? 'text-danger' : 'text-secondary'}`} />
                    </div>
                    <Ripples className='w-50'>
                        <Button onClick={handleTextAreaSubmit} className='w-100' variant="success">Add</Button>
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


                    {
                        posts?.length ?
                        <div style={{minHeight: '300px', height: 'auto'}} className='posts-containers w-100 p-3 bg-secondary bg-opacity-10 overflow-auto'>
                                {posts.map((items, index) => (
                                    <Posts key={items.id || index} items={items} />
                                ))}

                        </div>
                        : 
                        <div style={{minHeight: '300px', height: 'auto'}} className='user-select-none w-100 d-flex justify-content-center align-items-center display-1 text-muted p-3 bg-secondary bg-opacity-10 overflow-auto'>
                            <TbChecklist style={{cursor: 'auto', fontSize: '120px'}} />
                        </div>
                    }

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
