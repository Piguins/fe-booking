import "./../list/list.css";
import "./orders.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const Orders = () => {
  const location = useLocation();
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [token, setToken] = useState({});

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("authToken");

    if (storedAccessToken) {
      setToken(storedAccessToken);
    }
  }, []);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8080/api/bookings/get-all`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="main">
          <h1>Your orders</h1>
          <div className="listWrapper">
            <div className="listResult">
              {loading ? (
                "loading"
              ) : (
                <>
                  {data.map((item) => (
                    <SearchItem item={item} key={item.id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
