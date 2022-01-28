import React, {FC} from 'react';
import {Button, Input} from "antd";
import {Formik} from "formik";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {actionAddPost} from "../redux/reducers/annReducer";

const Form:FC = () => {
    const dispatch = useDispatch();
    const valSchema = yup.object().shape({
        title: yup.string().min(3,'The field must be at least 3 characters long').required('This field required'),
        desc: yup.string().min(3,'The field must be at least 3 characters long').required('This field required'),
    })
    const FormSubmit = (values:any)=>{
        dispatch(actionAddPost(values.title,values.desc));
    }
    return (
        <div className="form">
            <Formik
                initialValues={{
                    title:'',
                    desc:''
                }}
                validationSchema={valSchema}
                validateOnBlur
                onSubmit={(values,{ resetForm }) => {FormSubmit(values);resetForm();}}
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
                            Publish
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Form;