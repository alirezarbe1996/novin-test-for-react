import React from 'react';
import {IUser} from "./Users";
import './Users.css'
import {TbEdit} from "react-icons/tb";
import {RiDeleteBin2Line} from "react-icons/ri";
import Default from './default-picture.png'

interface Props extends IUser{
    openConfirmationModal:(id: number | undefined) => void;
    openEditModal:(id: number | undefined)=> void;
}

const UserCard: React.FC<Props> = ({id,first_name,last_name,avatar,email,openConfirmationModal,openEditModal}) => {
  return (
    <div className="card position-relative shadow">
        <div className="actions-container  mx-1">
            <TbEdit size={25} className="text-secondary cursor-pointer" onClick={() => openEditModal(id)} />
            <hr className="my-2"/>
            <RiDeleteBin2Line size={25}  className="text-secondary cursor-pointer" onClick={() => openConfirmationModal(id)} />
        </div>
        <div className="d-flex row justify-content-md-between justify-content-xl-start">
            <div className="col-3">
                <img alt={"user image"} src={avatar ? avatar : Default} width={80}/>
            </div>
            <div className="col-8 p-2 mx-lg-2 mx-xl-3">
               <div className="row"> {first_name}&nbsp;{last_name}</div>
                <div className="row mt-3"> {email}</div>
            </div>
        </div>
    </div>
  );
};

export default UserCard;