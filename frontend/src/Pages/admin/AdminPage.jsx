import React, { useEffect, useState } from "react";
import Sidebar from "../admin/component/Sidebar";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [userData, setUserData] = useState([]);
  const [property, setProperty] = useState([]);
  const [AdminProperty, setAdminProperty] = useState([]);

  useEffect(() => {
    showUserData();
    totalproperty();
  }, []);

  const showUserData = async () => {
    try {
      let result = await fetch("http://localhost:8080/api/v1/allUsers");
      if (result.ok) {
        result = await result.json();
        setUserData(result);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const totalproperty = async () => {
    try {
      let result = await fetch(
        "http://localhost:8080/api/v1/admin/CountListing"
      );
      if (result.ok) {
        result = await result.json();
        setProperty(result.data);
        setAdminProperty(result.admindata);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 font-serif">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-1 mr-[300px] h-full"
      >
        <Sidebar />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="col-span-2 bg-white p-8 items-center ml-[-200px]"
      >
        <h1 className="text-3xl mb-4 text-secondary">Dashboard Details</h1>
        <div className="grid grid-cols-2 gap-6 text-secondary">
          {[
            {
              title: "Total Property Listing",
              count: property.length + AdminProperty.length,
            },
            {
              title: "Total Sale Listing",
              count:
                property.filter((d) => d.type === "sale").length +
                AdminProperty.filter((d) => d.type === "sale").length,
            },
            {
              title: "Total Rent Listing",
              count:
                property.filter((d) => d.type === "rent").length +
                AdminProperty.filter((d) => d.type === "rent").length,
            },
            {
              title: "Total Land Listing",
              count:
                property.filter((d) => d.type === "land").length +
                AdminProperty.filter((d) => d.type === "land").length,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col gap-1"
            >
              <h1>{item.title}</h1>
              <div className="bg-secondary p-4 rounded-lg shadow-xl">
                <h1 className="text-white">{item.count}</h1>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 flex flex-col gap-2"
        >
          <h1 className="text-3xl text-secondary">Recent Customers</h1>
          <div className="bg-secondary rounded-lg h-96 w-full shadow-[0_7px_25px_rgba(0,0,0,0.88)] overflow-auto">
            {userData.map((data) => (
              <motion.div
                key={data._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * userData.indexOf(data),
                }}
                className="ml-5 mt-3 flex font-serif"
              >
                <img
                  className="h-10 w-10 mr-9 rounded-full"
                  src={data.avatar || "https://via.placeholder.com/150"}
                  alt=""
                />
                <h1 className="text-2xl text-white">{data.fullName}</h1>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
