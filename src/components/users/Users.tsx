import React, {useEffect, useState} from 'react';
import axiosClient from "../../axios-client";
import {toast} from "react-toastify";
import Spinner from "../spinner/Spinner";
import UserCard from "./UserCard";
import Modal from "../modal/Modal";
import UserForm from "./UserForm";

export interface IUser {
    id:number;
    email:string;
    first_name:string;
    last_name:string;
    avatar?:string;
}

const Users: React.FC = () => {
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [users,setUsers] = useState<IUser[]>([])
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [idForActions, setIdForActions] = useState<number | undefined>(undefined);

    const openConfirmationModal = (id: number | undefined) => {
        setIdForActions(id);
        setIsConfirmationModalOpen(true);
    };

    const openEditModal = (id: number | undefined) => {
        setIdForActions(id);
        setIsEditModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const getUsers = async () =>{
        try {
           const response = await axiosClient.get('/users');
            if (response.status === 200) {
                setUsers(response.data.data)
                setIsLoading(false)
            }
            setIsLoading(false)
        }
        catch (error) {
            toast.error(`${error}`);
            setIsLoading(false)
        }
    }
    const handleDelete = async () => {
        try {
            const response = await axiosClient.delete(`/users/${idForActions}`);
            if (response.status === 204) {
                const index = users.findIndex(user => user.id === idForActions);
                if (index !== -1) {
                    const newUsers = [...users.slice(0, index), ...users.slice(index + 1)];
                    setUsers(newUsers);
                }
                toast.success('کاربر حذف شد!');
                closeConfirmationModal();
            }
        } catch (error:any) {
            toast.error(`${error} ${idForActions}کاربر حذف نشد :( ، دوباره تلاش کن. `);
            closeConfirmationModal();
        }
    };

    useEffect(() => {
        getUsers();
    }, []);
  return (
    <div className="d-flex row  mt-3">
        <span className="link link-primary  cursor-pointer" onClick={()=>setIsCreateModalOpen(true)}>+ ایجاد کاربر جدید</span>
        <>
            {isLoading ?
                (
                    <div className="d-flex row justify-content-center">
                        <Spinner/>
                    </div>
                )
                :
                (
                    <div className="d-flex row justify-content-end mt-2">
                        {users?.map((user : IUser) => (
                            <div key={user.id} className=" col-12 col-md-6  col-lg-5 col-xl-4 fadeInUp-animation mt-3" dir={"ltr"}>
                                <UserCard
                                    id={user.id}
                                    email={user.email}
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    avatar={user.avatar}
                                    openConfirmationModal={openConfirmationModal}
                                    openEditModal={openEditModal}
                                />
                            </div>
                        ))}
                    </div>
                )
            }
            {/*Create Modal*/}
            <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
                <UserForm users={users} setNewUsers={setUsers} closeCreateModal={closeCreateModal}/>
            </Modal>
            {/*Create Modal*/}


            {/*************************************/}

            {/*Delete Confirmation Modal*/}
            <Modal isOpen={isConfirmationModalOpen} onClose={closeConfirmationModal}>
                <span className="my-2">- واقعا میخوای این کاربر رو حذف کنی؟</span>
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-secondary mx-2" onClick={closeConfirmationModal}>نه، بیخیال</button>
                    <button className="btn btn-danger" onClick={handleDelete}> بله</button>
                </div>
            </Modal>
            {/*Delete Confirmation Modal*/}

            {/*************************************/}

            {/*Update Modal*/}
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <UserForm closeEditModal={closeEditModal} users={users} setNewUsers={setUsers} isInUpdate userIdForAction={idForActions} />
            </Modal>
            {/*Update Modal*/}
        </>
    </div>
  );
};

export default Users;
