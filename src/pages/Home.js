import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { API_URL } from '../utils/BaseUrl'
import parse from 'html-react-parser';
import { truncate } from '../utils/helperFunctions'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const getBlog = async () => {
        const res = await axios.get(API_URL + "/getBlog");
        setBlogs(res?.data?.data)
    }

    useEffect(() => {
        getBlog();
    }, [])
    
    return (
        <>
            <Navbar />
            <header class="py-5 bg-light border-bottom mb-4">
                <div class="container">
                    <div class="text-center my-5">
                        <h1 class="fw-bolder">Welcome to our blog website</h1>
                        <p class="lead mb-0">A free to use blog application built using MERN stack.</p>
                    </div>
                </div>
            </header>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        {blogs?.length && <div class="card mb-4">
                            <img class="card-img-top" src={API_URL + "/uploads/" + blogs[0]?.image} alt="..." />
                            <div class="card-body">
                                <h2 class="card-title">{blogs[0]?.title}</h2>
                                <p class="card-text">{parse(blogs[0]?.description)}</p>
                                <button onClick={()=>navigate("/details/"+blogs[0]._id, {state: blogs[0]})} class="btn btn-primary" href="#!">Read more →</button>
                            </div>
                        </div>}
                        <div class="row">
                            {blogs?.length ? blogs?.map((obj, index) => {
                                return (
                                    index > 0 &&
                                    <div class="col-lg-6">
                                        <div class="card mb-4">
                                            <img style={{ height: "300px" }} class="card-img-top" src={API_URL + "/uploads/" + obj?.image} alt="..." />
                                            <div class="card-body">
                                                <h2 class="card-title h4">{obj?.title}</h2>
                                                <p class="card-text"> {parse(truncate(obj?.description))}</p>
                                                <button onClick={()=>navigate("/details/"+obj._id,{state: obj})} class="btn btn-primary" href="#!">Read more →</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <h1 className='m-5 text-center'>No blogs posted till now.</h1>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home