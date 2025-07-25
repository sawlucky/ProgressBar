import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addCount } from "../../utils/countUserSlice";
const Users = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [userData, setAllUserData] = useState([]);

//   const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllUsers = async () => {
        const response = await axios.get(
            `${API_BASE_URL}/admin/users`
            , {
        withCredentials: true,
      });
      setAllUserData(response.data);

    //   dispatch(addCount(response.data.length));
    };

    fetchAllUsers();
    // console.log(countUser);
  }, [API_BASE_URL]);
  return (
    <div>
      {userData.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-4 p-4 my-4 bg-gray-50 rounded-lg"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{item.email}</p>
            <p className="text-xs text-gray-500">
              <span>
                {new Date(item.createdAt).toLocaleDateString()}
                {new Date(item.createdAt).toLocaleTimeString()}
              </span>
            </p>
          </div>
          {/* <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View
          </button> */}
          <p className="text-sm font-medium text-gray-900">{item.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
