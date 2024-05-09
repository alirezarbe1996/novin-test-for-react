import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Field, Form} from 'react-final-form';
import {strings} from "../../meta/constants";
import axiosClient from "../../axios-client";
import {toast} from "react-toastify";
import {IUser} from "./Users";

interface Props {
    isInUpdate?:boolean;
    userIdForAction?:number
    closeCreateModal?:()=> void;
    closeEditModal?:()=> void;
    users:IUser[];
    setNewUsers:Dispatch<SetStateAction<IUser[]>>;
}

const UserForm: React.FC<Props> = ({users,isInUpdate,closeCreateModal,userIdForAction,setNewUsers,closeEditModal}) => {
    const [userInParser,setUserInParser] = useState({})

    const getUserDetails = async (userIdForAction : number) => {
        try {
            const response = await axiosClient.get(`/users/${userIdForAction}`);
            if (response.status === 200) {
                setUserInParser({
                    name: response.data.data.first_name,
                    lastName: response.data.data.last_name,
                    email: response.data.data.email
                })
            }
        }
        catch (error) {
            toast.error(`${error}`);
        }
    }
    useEffect(() => {
    if(userIdForAction){
        getUserDetails(userIdForAction)
    }
    }, []);
    const handleUpdate = async (values:any) => {
        const payload:any = {
            first_name: values.name,
            last_name:values.lastName,
            email:values.email,
        };
        try {
            const response = await axiosClient.put(`/users/${userIdForAction}`,payload);
            if (response.status === 200) {
                setNewUsers(users.map(user =>
                    user.id === userIdForAction ? { ...user, first_name: values.name, last_name:values.lastName,email:values.email } : user
                ));

                if (closeEditModal) {
                    closeEditModal()
                }
                toast.success(`کاربر با موفقیت ویرایش شد.`);
            }
            if (closeEditModal) {
                closeEditModal()
            }
        } catch (error) {
            toast.error(`${error}`);
            if (closeEditModal) {
                closeEditModal()
            }
        }
    }

    const handleCreate = async (values:any) => {
        const payload:IUser = {
            id:Math.floor(Math.random() * 100000),
            first_name: values.name,
            last_name:values.lastName,
            email:values.email,
        };
        try {
            const response = await axiosClient.post(`/users`,payload);
            if (response.status === 201) {
                setNewUsers([...users, payload]);
                if (closeCreateModal) {
                    closeCreateModal()
                }
                toast.success(`کاربر با موفقیت ایجاد شد.`);
            }
            if (closeCreateModal) {
                closeCreateModal()
            }
        } catch (error) {
            toast.error(`${error}`);

            if (closeCreateModal) {
                closeCreateModal()

            }
        }
    }
    const validate = (values: any) => {
        const errors: { [key: string]: string } = {};
        if (!values.email) {
            errors.email = strings.RequiredField;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'ایمیل نامعتبر';
        }
        if (!values.lastName) {
            errors.lastName =  strings.RequiredField;
        }
        if (!values.name) {
            errors.name =  strings.RequiredField;
        }
        return errors;
    }
    return (
        <>
            <Form
                validate={validate}
                onSubmit={isInUpdate ? handleUpdate : handleCreate}
                initialValues={isInUpdate && userInParser}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className=" mt-5">
                        <div className="mb-3">
                            <Field name="name">
                                {({ input, meta }) => (
                                    <div className="inputGroup ">
                                        <input {...input} type="text" placeholder=""  />
                                        <label >نام</label>
                                        {meta.error && meta.touched && <div className="meta" style={{fontSize:12}}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="mb-3">
                            <Field name="lastName">
                                {({ input, meta }) => (
                                    <div className="inputGroup ">
                                        <input {...input} type="text" placeholder=""  />
                                        <label >نام خانوادگی</label>
                                        {meta.error && meta.touched && <div className="meta" style={{fontSize:12}}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </div>
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

                        <div className="d-flex justify-content-end mt-5">
                            <button className="btn btn-secondary mx-2" onClick={closeCreateModal}>نه، بیخیال</button>
                            <button className="btn btn-primary" type={"submit"}> {isInUpdate ? "ویرایش":"ایجاد"}</button>
                        </div>
                    </form>
                )}
            />
        </>
    );
};

export default UserForm;