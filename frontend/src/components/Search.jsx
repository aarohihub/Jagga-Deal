import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../Components/card";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [listing1, setListing1] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebar, setSidebar] = useState({
    serachTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const handelChange = (e) => {
    const { id, value, checked } = e.target;
    if (["all", "rent", "sale", "land"].includes(id)) {
      setSidebar((prev) => ({ ...prev, type: id }));
    }
    if (id === "searchTerm") {
      setSidebar((prev) => ({ ...prev, serachTerm: value }));
    }
    if (["parking", "furnished", "offer"].includes(id)) {
      setSidebar((prev) => ({ ...prev, [id]: checked }));
    }
    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSidebar((prev) => ({ ...prev, sort, order }));
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    setSidebar({
      serachTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      parking: parkingFromUrl === "true",
      furnished: furnishedFromUrl === "true",
      offer: offerFromUrl === "true",
      sort: sortFromUrl || "createdAt",
      order: orderFromUrl || "desc",
    });

    const fetchData = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const result = await fetch(
        `http://localhost:8080/api/v1/searchListing?${searchQuery}`
      );
      const data = await result.json();
      if (data.userListing.length + data.adminListing.length > 8) {
        setShowMore(true);
      }
      setListing(data.userListing);
      setListing1(data.adminListing);
      setLoading(false);
    };
    fetchData();
  }, [location.search]);

  const submitForm = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebar.serachTerm);
    urlParams.set("type", sidebar.type);
    urlParams.set("parking", sidebar.parking);
    urlParams.set("offer", sidebar.offer);
    urlParams.set("furnished", sidebar.furnished);
    urlParams.set("sort", sidebar.sort);
    urlParams.set("order", sidebar.order);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListing = listing.length;
    const startIndex = numberOfListing;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(
      `http://localhost:8080/api/v1/searchListing?${searchQuery}`
    );
    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }
    setListing([...listing, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row font-serif min-h-screen">
      {/* Sidebar */}
      <div className="p-4 md:p-7 border-b-2 md:border-r-2 w-full md:w-1/3 lg:w-1/4">
        <form onSubmit={submitForm} className="flex flex-col gap-6">
          {/* Search Input */}
          <div className="flex flex-col">
            <label className="mb-1">Search Term</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3"
              value={sidebar.serachTerm}
              onChange={handelChange}
            />
          </div>

          {/* Type Selection */}
          <div className="flex flex-col">
            <label className="mb-1">Type</label>
            <div className="flex flex-wrap gap-2">
              {["all", "rent", "sale", "land", "offer"].map((item) => (
                <div key={item} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id={item}
                    className="w-5 h-5"
                    onChange={handelChange}
                    checked={
                      sidebar.type === item ||
                      (item === "offer" && sidebar.offer)
                    }
                  />
                  <span className="capitalize">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-col">
            <label className="mb-1">Amenities</label>
            <div className="flex gap-4">
              {["parking", "furnished"].map((item) => (
                <div key={item} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id={item}
                    className="w-5 h-5"
                    onChange={handelChange}
                    checked={sidebar[item]}
                  />
                  <span className="capitalize">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1">Sort</label>
            <select
              id="sort_order"
              onChange={handelChange}
              defaultValue="createdAt_desc"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price low to high</option>
              <option value="regularPrice_asc">Price high to low</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="text-white bg-primary rounded-lg p-3 hover:opacity-90 uppercase">
            Search
          </button>
        </form>
      </div>

      {/* Listings */}
      <div className="flex flex-col flex-1 p-4 md:p-7 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-700">
          Listing Results
        </h1>

        <div className="flex flex-wrap gap-4">
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading && listing.length === 0 && listing1.length === 0 && (
            <p className="text-lg text-center w-full">No Listings Found</p>
          )}
          {!loading &&
            [...listing, ...listing1].map((item) => (
              <ListingItem key={item._id} listing={item} />
            ))}
        </div>
{/* 
        {showMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={onShowMoreClick}
              className="text-primary hover:underline text-sm"
            >
              Show More
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}
