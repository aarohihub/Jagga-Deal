import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/Style/TableStyle.css";
import Sidebar from "../../admin/component/Sidebar";
import { axiosInstance } from "../../../libs/axios";

export default function ShowAdminListing() {
  const [userListing, setUserListing] = useState([]);
  const [listingError, setListingError] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    showlisting();
  }, []);

  const showlisting = async () => {
    try {
      const api = await axiosInstance(
        `/admin/showAdminListing/${currentUser._id}`
      );
      const result = api?.data;
      if (!result) {
        return setListingError(true);
      }
      setUserListing(result);
    } catch (error) {
      console.log("some thing went wrong", error);
      setListingError(true);
    }
  };

  const deleteListing = async (id) => {
    try {
      let result = await axiosInstance.delete(`/admin/delete/${id}`, {
        method: "DELETE",
      });

      if (result) {
        showlisting();
      }
    } catch (error) {
      console.log("some thing went wrong", error);
    }
  };

  return (
    <div className="flex">
      <div className="h-full">
        <Sidebar />
      </div>

      <div className="p-4 grow flex flex-col text-center ">
        <h1 className="text-center  my-7 text-3xl font-semibold">
          Your Property Listing
        </h1>

        <table id="customers" className="">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Title</th>
              <th>Image</th>
              <th>Address</th>
              <th>Regular Price</th>
              <th>Discount %</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userListing &&
              userListing.length > 0 &&
              userListing.map((listing, index) => (
                <tr key={listing._id}>
                  <td>{index + 1}</td>
                  <td>{listing.title}</td>
                  <td>
                    {" "}
                    <Link to={`/admin-showSingleListing/${listing._id}`}>
                      <img
                        className="h-16 w-16 object-contain rouned-lg items-center "
                        src={listing.imageUrl[0]}
                        alt=""
                      />
                    </Link>
                  </td>

                  <td>{listing.address}</td>
                  <td>{listing.regularPrice}</td>
                  <td>{listing.discountPrice}</td>

                  <td className="flex flex-col  items-center gap-3">
                    <button
                      onClick={() => {
                        deleteListing(listing._id);
                      }}
                      className="text-red-700"
                    >
                      Delete
                    </button>
                    <Link to={`/updateAdminListing/${listing._id}`}>
                      <button className="text-green-700 ">Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
