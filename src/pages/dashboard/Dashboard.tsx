import React, {useEffect, useState} from 'react';
import {useStateContext} from "../../StateContext";
import {useNavigate} from "react-router-dom";
import axiosClient from "../../axios-client";
import { RiLogoutCircleLine } from "react-icons/ri";
import {toast} from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import Users from "../../components/users/Users";


const Dashboard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { token,handleSetToken } = useStateContext()
    const navigate = useNavigate();
    useEffect(() => {
        if (token === null) {
            navigate('/');
        }
    }, [token]);
    const handleLogout = async () => {
        try {
            setIsLoading(true)
            await axiosClient.post('/logout', null, {});
            localStorage.removeItem('ACCESS_TOKEN')
            handleSetToken(null)
            toast.success('خارج شدید!');
        }
        catch (error) {
            setIsLoading(false)
            toast.success(`${error}`);
        }
    };
  return (
    <div className="container vh-100">
      <div className="d-flex flex-row-reverse pt-2">
          {isLoading ?
              (
                 <Spinner/>
              ):(
              <RiLogoutCircleLine size={30} color={"#311E06B2"} className="logOut-btn" onClick={handleLogout} />
              )
          }
      </div>
        <div>
            <Users/>
        </div>
    </div>
  );
};

export default Dashboard;