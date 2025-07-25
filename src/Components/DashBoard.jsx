// import React from "react";
import { Activity, Users, TrendingUp, Clock } from "lucide-react";
// import { useSelector } from "react-redux";
const DashBoard = () => {
//   const totalCount = useSelector((store) => store?.countUser?.count);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Stats Cards */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{2}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm text-green-600 font-medium">+12.5%</span>
          <span className="text-sm text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Orders</p>
            <p className="text-2xl font-bold text-gray-900">1,429</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm text-green-600 font-medium">+5.4%</span>
          <span className="text-sm text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Sessions</p>
            <p className="text-2xl font-bold text-gray-900">892</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm text-green-600 font-medium">+2.1%</span>
          <span className="text-sm text-gray-500 ml-2">from last hour</span>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
