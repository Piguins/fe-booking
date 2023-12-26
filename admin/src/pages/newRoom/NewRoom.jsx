import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { roomInputs } from "../../formSource";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [images, setImages] = useState({});
  const [token, setToken] = useState({});

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedAccessToken) {
      setToken(storedAccessToken);
    }
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImages({ ...images, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const params = {
        ...info,
        bedCount: +info.bedCount,
        amount: +info.amount,
        floor: info.floor,
        currency: info.currency.toUpperCase(),
        images: [...Object.values(images)],
      };
      await axios.post("http://localhost:8080/api/rooms/", params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              {[1, 2, 3, 4].map((k) => {
                return (
                  <div className="formInput" key={k}>
                    <label>{`Image ${k}`}</label>
                    <input
                      id={`image${k}`}
                      type={"text"}
                      placeholder={"Please"}
                      onChange={handleImageChange}
                    />
                  </div>
                );
              })}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
