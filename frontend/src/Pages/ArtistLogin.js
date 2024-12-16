import React,{useEffect, useState} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import MainScreen from '../Components/MainScreen'
import './ArtistLogin.css'
import Error from '../Components/Error'
import Loading from '../Components/Loading'
import { artistLogin } from '../Fetures/ArtistSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ArtistLogin = () => {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigate()

    const dispatch = useDispatch()
    const {loading,error,artist} = useSelector((state)=> state.artist)

    const submitHandler = async(e)=>{
        e.preventDefault()

        if(!email && !password){
            return(<Error variant="danger">Please fill all the fields</Error>)
        }
        else{
            await dispatch(artistLogin({email,password}))
        }
    }

    useEffect(() => {
        if (artist) {
          navigation("/artist/manage-orders");
        }
      }, [artist, navigation]);

  return (
    <div>
        <Container className='login-container'>
         {loading ? <Loading />: ""}   
         {error? <Error variant="danger">{error}</Error>: ""}   
        <MainScreen title="Login Page">
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" size='lg' type='submit'>Login</Button>
            </Form>
        </MainScreen>
        </Container>
    </div>
  )
}

export default ArtistLogin