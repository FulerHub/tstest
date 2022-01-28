import React, {FC, useState} from 'react';
import {Button, Input, Layout} from 'antd';
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Formik} from "formik";
import * as yup from "yup";
import moment from 'moment'
import {actionDeletePost, actionUpdatePost} from "../redux/reducers/annReducer";
import SimilarPosts from "../components/SimilarPosts";
import PageNotFound from "./404";
const {Content} = Layout;

type PageParamType = {
    postID?: string | undefined
}

const Page:FC = () => {
    let {postID} = useParams<PageParamType>();
    const id:number = (postID !== undefined) ? parseInt(postID) : 0;
    const [edit, setEdit] = useState(false);
    const dispatch= useDispatch();
    const post = useSelector((state:any) => state.annReducer.posts.filter((item:any) => item.id === id))

    const valSchema = yup.object().shape({
        title: yup.string().min(3,'The field must be at least 3 characters long').required('This field required'),
        desc: yup.string().min(3,'The field must be at least 3 characters long').required('This field required'),
    })
    const HandleClickEdit = ()=>{
        setEdit(true);
    }
    const HandleClickDelete = ()=>{
        dispatch(actionDeletePost(id))
        return <Navigate to="/" />
    }
    const FormSubmit = (values:any)=>{
        dispatch(actionUpdatePost(id,values.title,values.desc))
        setEdit(false);
    }

    return (
        <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
                <div className="container">
                    Page
                    <div><Link to={"/"}>Go Home</Link></div>
                    {post.length !== 0 ?
                        edit ?
                            <>
                                <Formik
                                    initialValues={{
                                        title:post[0].title,
                                        desc:post[0].description
                                    }}
                                    validationSchema={valSchema}
                                    validateOnBlur
                                    onSubmit={(values) => FormSubmit(values)}
                                >
                                    {({values, errors, handleChange, handleSubmit}) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className="form__input">
                                                <Input name="title" onChange={handleChange}  value={values.title} placeholder="Title Announcement"/>
                                                {errors.title && <p style={{color:"#ff0000"}}>{errors.title}</p> }
                                            </div>
                                            <div className="form__input">
                                                <Input.TextArea name="desc" rows={4} onChange={handleChange} value={values.desc} placeholder="Description Announcement"/>
                                                {errors.desc && <p style={{color:"#ff0000"}}>{errors.desc}</p> }
                                            </div>
                                            <Button htmlType="submit" type="primary" >
                                                Update
                                            </Button>
                                        </form>
                                    )}
                                </Formik>
                            </>
                            :
                            <div className="page">
                                <h1>{post[0].title}</h1>
                                <div className="description">{post[0].description}</div>
                                <div className="date">{moment(post[0].date).format('DD.MM.YYYY h:mm:ss')}</div>
                                <div className="page__buttons">
                                    <Button type="primary" onClick={HandleClickEdit}>Edit</Button>
                                    <Button type="primary" danger onClick={HandleClickDelete}>Delete</Button>
                                </div>

                                <SimilarPosts post={post[0]}/>
                            </div>
                        :
                        <PageNotFound/>
                    }
                </div>
            </div>
        </Content>
    );
};

export default Page;