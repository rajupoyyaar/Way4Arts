import React, {useState} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './ArtistRegistration.css'
import axios from 'axios'
import MainScreen from '../Components/MainScreen'
import { registerArtist } from '../Fetures/ArtistSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from "../Components/Loading"
import Error from '../Components/Error'

const ArtistRegistration = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profile,setProfile] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")

  const dispatch = useDispatch()
  const {loading,error} = useSelector((state)=> state.artist)

  console.log(name)

  const postDeatils = (pics)=>{
    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'notesapp')
      data.append('cloud_name', 'deebtrhka')
      data.append('api_key', '772489483484368')
      fetch("https://api.cloudinary.com/v1_1/deebtrhka/image/upload",{
        method: "post",
        body: data,
      }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        setProfile(data.url.toString())
      }).catch((err)=>{
        console.log(err)
      })
    }
   }

   const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
     
    dispatch(registerArtist({name, email, phone: Number(phone), password, profile}))
     
};


  return (
    <div>
        <Container className="mx-auto register-container" >
            <MainScreen title="Become a Featured Artist with Way4Arts">
               {loading ? <Loading /> : ""} 
               {error ? <Error variant="danger">{error}</Error> : ""}
            <Form className='artist-registration' onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=> setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" placeholder="Phone number" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Profile</Form.Label>
                    <Form.Control type="file" onChange={(e)=>postDeatils(e.target.files[0])} />
                </Form.Group>

                <Button variant="primary" type="submit" className='lg mb-3'>
                    Register
                </Button>
            </Form>
            </MainScreen> 
        </Container>
    </div>
  )
}

export default ArtistRegistration