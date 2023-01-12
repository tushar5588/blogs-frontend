import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { API_URL } from '../utils/BaseUrl';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const [data, setData] = useState({
        title: "",
        image: "",
        description: ""
    })
    const [message, setMessage] = useState({
        msg: "",
        status: ""
    })
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    
    const submit = async (e) => {
        setLoader(true);
        e.preventDefault();
        const { image, title, description } = data;
        if (!image || !description || !title) {
            setMessage({ status: 0, msg: "All fields are madatory !" })
            return
        }
        var sizeInMB = (image?.size / (1024 * 1024)).toFixed(2);
        if (!image?.type?.includes("image") || sizeInMB > 2) {
            setMessage({ status: 0, msg: "Image should be (.png, .jpg, .jpeg) and less than 1mb !" })
            return
        }
        const fd = new FormData();
        fd.append("image", image);
        fd.append("title", title);
        fd.append("description", description);
        await axios.post(API_URL + "/addBlog", fd).then((res) => {
            setMessage({ status: res?.data?.status, msg: res?.data?.message });
            if (res.data?.status === 1) {
                navigate("/");
            }
            setLoader(false);
        })
    }

    return (
        <>
            <Navbar />
            <header class="py-5 bg-light border-bottom mb-4">
                <div class="container">
                    <div class="text-center my-5">
                        <h1 class="fw-bolder">Add Blog</h1>
                    </div>
                </div>
            </header>
            <div class="container">
                <div class="row">
                    {message?.msg && <p className={`text-center ${message?.status === 1 ? "text-success" : "text-danger"}`}>{message?.msg}</p>}
                    <div class="col-lg-12 h-100">
                        <div class="card mb-4" style={{ minHeight: "400px" }}>
                            <form className='m-3'>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Image</label>
                                    <input onChange={(e) => setData({ ...data, image: e.target.files[0] })} type="file" class="form-control" id="image" />
                                </div>
                                <div class="form-group mt-3">
                                    <label for="exampleInputEmail1">Title</label>
                                    <input onChange={(e) => setData({ ...data, title: e.target.value })} class="form-control" placeholder="Enter Title" value={data?.title} />
                                </div>
                                <div class="form-group mt-3 quill">
                                    <label for="exampleInputPassword1">Description</label>
                                    <ReactQuill onChange={(value) => setData({ ...data, description: value })} theme='snow' />
                                </div>
                                <button disabled={loader} onClick={submit} class="btn btn-primary mt-3">
                                    {loader ?
                                        <>
                                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                            <span class="sr-only">Loading...</span>
                                        </> :
                                        "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBlog