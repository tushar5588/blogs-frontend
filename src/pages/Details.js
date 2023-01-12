import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { API_URL } from '../utils/BaseUrl'
import parse from 'html-react-parser';

const Details = () => {
    const location = useLocation();
    const navigate=useNavigate();
    return (
        <>
            <Navbar />
            <header class="py-5 bg-light border-bottom mb-4">
                <div class="container">
                    <div class="text-center my-5">
                        <h1 class="fw-bolder">Blog Details</h1>
                    </div>
                </div>
            </header>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card mb-4">
                            <img class="card-img-top" src={API_URL + "/uploads/" + location?.state?.image} alt="..." />
                            <div class="card-body">
                                <h2 class="card-title">{location?.state?.title}</h2>
                                <p class="card-text">{parse(location?.state?.description)}</p>
                                <button onClick={()=>navigate("/")} class="btn btn-primary" href="#!">Homepage→</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Details