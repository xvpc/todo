import React, {useEffect, useRef, useState} from 'react'

// 
import Link from 'next/link';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addPost, deleteAll } from '@/redux/postsSlice'

// 
import Ripples from 'react-ripples'

// Bootstrap
import { Form, Button, Spinner } from 'react-bootstrap';

// Icons
import { TbExclamationMark } from "react-icons/tb";
import { TbChecklist } from "react-icons/tb";

// Components
import Posts from './Posts';
import Image from 'next/image';

export default function Home() {
    const posts = useSelector((state) => state.posts.posts)
    const disPatch = useDispatch()

    // Loading
    const [loaded, setLoaded] = useState(false)
    const textAreaRefs = useRef()
    useEffect(() => {
        setLoaded(true)
        if(textAreaRefs) textAreaRefs.current.focus()
    }, [])

    // Date
    const postD = new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })

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
                date: postD || '',
                description: String(textAreaValue),
                done: false,
                important: important || false,
            }))
            setTextAreaValue('')
            setImportant(false)
        }
    }

    // Compare sorting Algorithm
    const compareImportant = (a, b) => {
        if(a.important === b.important){
            return 0
        }else{
            if(a.important){
                return -1
            }else{
                return 1
            }
        }
    }
    const compareDone = (a, b) => {
        if(a.done === b.done){
            return 0
        }else{
            if(a.done){
                return -1
            }else{
                return 1
            }
        }
    }
    const compareNewest = (a, b) => 1
    const compareOldest = (a, b) => -1

    // 
    const [compareFunction, setCompareFunction] = useState({
        type: 'newest',
        function: compareNewest
    })

    // Search Algorithm
    const keys = ['description', 'date']
    const handleSearchInput = (event) => {
        const eventValue = event.target.value.trim().toLowerCase()
        console.log(eventValue)
        if(eventValue){
            setCompareFunction({
                type: 'search',
                function: (a, b) => {
                    if(a.description === b.description){
                        return 0
                    }else{
                        if(keys.some((key) => String(a[key]).trim().toLowerCase().includes(eventValue))){
                            return -1
                        }else{
                            return 1
                        }
                    }
                }
            })
        }else{
            setCompareFunction({
                type: 'newest',
                function: compareNewest
            })
        }
    }

    const handleChangeOptions = (event) => {
        const eventType = String(event.target.value).toLowerCase()
        if(eventType === 'newest'){
            setCompareFunction({
                type: 'newest',
                function: compareNewest
            })
        }
        if(eventType === 'oldest'){
            setCompareFunction({
                type: 'oldest',
                function: compareOldest
            })
        }
        if(eventType === 'important'){
            setCompareFunction({
                type: 'important',
                function: compareImportant
            })
        }
        if(eventType === 'done'){
            setCompareFunction({
                type: 'done',
                function: compareDone
            })
        }
    }

    // 
    return (
        <div style={{backgroundImage: 'url(./images/wave-haikei.svg)'}} className="main-content-container bg-dark text-white min-vh-100 d-flex flex-column justify-content-between align-items-center">
            <main className='main-container my-5 container-fluid d-flex flex-column justify-content-center align-items-center gap-5'>
                <div className='input-container container d-flex flex-column justify-content-center align-items-center gap-2'>
                    <div style={{height: '80px'}} className="input-group position-relative overflow-hidden shadow">
                        <textarea ref={textAreaRefs} value={textAreaValue} onChange={handleTextAreaChange} style={{outline: 'none'}} className='pe-5 h-100 w-100 textarea-container position-relative rounded overflow-auto' placeholder='Do something with my life.' name='input-textarea' minLength='1' maxLength='150' autoFocus autoCorrect='on' />
                        <TbExclamationMark title='Make it As Important' onClick={handleImportant} className={`position-absolute end-0 top-50 translate-middle fs-2 ${important ? 'text-danger' : 'text-secondary'}`} />
                    </div>
                    <div className='w-75 d-flex flex-row justify-content-between align-items-center align-self-center'>
                        <Ripples className='w-50'>
                            <Button onClick={handleTextAreaSubmit} className='w-100' variant="success">Add</Button>
                        </Ripples>
                        <span style={{fontSize: '14px'}} className={`${textAreaValue.length <= 120 ? 'text-secondary' : 'text-danger'}`}>{textAreaValue.length}/150</span>
                    </div>
                </div>
                
                <div className='posts-main-container container px-0 d-flex flex-column justify-content-center align-items-center'>
                    <div style={{height: '50px'}} className='w-100 options-container bg-white d-flex flex-row justify-content-center align-content-center gap-2 px-1 py-2'>
                        <Form.Control onChange={handleSearchInput} className='w-50 shadow-none' maxLength='65' placeholder="Search..." aria-label="Search" />
                        <Form.Select onChange={handleChangeOptions} className='w-25 shadow-none' aria-label="Select sorting">
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Important">Important</option>
                            <option value="Done">Done</option>
                        </Form.Select>
                        <Button onClick={() => {
                            disPatch(deleteAll())
                        }} style={{fontSize: '12px'}} className='w-25 px-0' variant="outline-danger">Delete All</Button>
                    </div>

                    {
                        loaded ?
                        posts?.length ?
                        <div style={{minHeight: '300px', height: 'auto'}} className='posts-containers w-100 p-3 bg-secondary bg-opacity-50 overflow-auto'>
                            {[...posts].sort(compareFunction.function).map((items, index) => {
                                
                                return(
                                    <Posts key={items.id || index} items={items} />
                                )
                            })}
                        </div>
                        : 
                        <div style={{minHeight: '300px', height: 'auto'}} className='user-select-none w-100 d-flex justify-content-center align-items-center display-1 text-muted p-3 bg-secondary bg-opacity-50 overflow-auto'>
                            <TbChecklist style={{cursor: 'auto', fontSize: '120px'}} />
                        </div>
                        :
                        <div style={{minHeight: '300px', height: 'auto'}} className='w-100 p-3 bg-secondary bg-opacity-50 overflow-auto d-flex justify-content-center align-items-center'>
                            <Spinner animation="border" variant="secondary" />
                        </div>
                    }

                </div>
            </main>

            <footer className="bg-black p-1 w-100 d-flex flex-row flex-wrap justify-content-center align-items-center gap-2">
                <div className='mw-25 d-flex flex-row flex-wrap justify-content-center align-items-center gap-2'>
                    <p className='p-0 m-0'>Created By:<span className='ms-2 fw-bold p-0 m-0'>Viper</span></p> |
                    <Link style={{width: '30px', height: '30px'}} className='bg-dark overflow-hidden rounded-1' title='Portfolio' href='https://xvpc.dev' target='_blank'><Image className='img-fluid' src={'https://i.ibb.co/9WxCSdZ/android-chrome-512x512.png'} width={512} height={512} alt='Portfolio Icon'/></Link>
                </div>
            </footer>
        </div>
    )
}
