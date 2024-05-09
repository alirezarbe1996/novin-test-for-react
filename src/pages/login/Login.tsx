import React, {useState} from 'react';
import {Field, Form} from "react-final-form";
import {toast} from "react-toastify";
import {useStateContext} from "../../StateContext";
import {Navigate} from "react-router-dom";
import axiosClient from "../../axios-client";
import Spinner from "../../components/spinner/Spinner";
import {strings} from "../../meta/constants";


const Login: React.FC = () => {
    const { token,handleSetToken } = useStateContext();
    const [isLoading,setIsLoading] = useState<boolean>(false )
    if(token){
        return(<Navigate to="/dashboard" />)
    }
    const handleLogin = async (values:any) => {
        const payload = {
            email: values.email,
            password: values.password
        };

        try {
            setIsLoading(true);
            const response = await axiosClient.post('/login', payload);
            if (response.status === 200) {
                handleSetToken(response.data.token)
                toast.success('خوش آمدید!');
            }
            setIsLoading(false);
        } catch (error) {
            toast.error(`ورود ناموفق ${error}`);
            setIsLoading(false);
        }
    };
    const validate = (values: any) => {
        const errors: { [key: string]: string } = {};
        if (!values.email) {
            errors.email = strings.RequiredField;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'ایمیل نامعتبر';
        }
        if (!values.password) {
            errors.password = strings.RequiredField;
        }
        return errors;
    }
  return (
    <>
        <div className="d-flex container justify-content-center pt-5">
            <div className="card col-12 col-sm-12 col-md-8 col-lg-7 col-xl-6 mt-5 shadow-sm fadeInUp-animation">
                <div className="card-header bg-cream border-bottom-0">
                    <div className="text-center">
                        <h5 className="pt-2 text-secondary no-cursor">
                            ورود کاربر
                        </h5>
                    </div>
                </div>
                <div className="card-body rounded bg-lightCream">
                    <div>
                        <Form
                            onSubmit={handleLogin}
                            validate={validate}
                            render={({handleSubmit}) => (
                                <form onSubmit={handleSubmit} className="mt-2">
                                    <div className="mb-3">
                                        <Field name="email">
                                            {({input, meta}) => (
                                                <div className="inputGroup">
                                                    <input {...input} type="email" placeholder=""/>
                                                    <label>ایمیل</label>
                                                    {meta.error && meta.touched &&
                                                        <div className="meta" style={{fontSize: 12}}>{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div className="mb-3">
                                        <Field name="password">
                                            {({input, meta}) => (
                                                <div className="inputGroup">
                                                    <input {...input} type="password" placeholder=""/>
                                                    <label>رمز عبور</label>
                                                    {meta.error && meta.touched &&
                                                        <div className="meta" style={{fontSize: 12}}>{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3 col-12">
                                        {isLoading ?
                                            (<Spinner/>)
                                            :
                                            (<button type="submit" className="btn bg-cream col-11">ورود</button>)
                                        }
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Login;