import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import PaypalCheckoutButton from "../../components/PaypalCheckoutButton";
import { format } from "date-fns";
import { DateRange } from "react-date-range";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [days, setDays] = useState(1);

  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/rooms/${id}`
  );
  const { priceAmount, priceCurrency } = data;
  const [price, setPrice] = useState(priceAmount);

  const { startDate, endDate } = dates[0];

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      // Handle the case where endDate is before startDate, for example, set endDate to startDate
      setDates([{ startDate: start, endDate: start, key: "selection" }]);
    }

    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24) || 1;

    setDays(daysDifference);
  }, [startDate, endDate]);

  useEffect(() => {
    setPrice(days * priceAmount);
  }, [days, priceAmount]);

  const product = {
    ...data,
  };

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.images[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>address</span>
            </div>
            <span className="hotelDistance">
              Excellent location from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.priceAmount} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.images?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.name}</h1>
                <p className="hotelDesc">{data.description}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a day-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  {/* <b>${days * data.priceAmount * options.room}</b> ({days}{" "} */}
                  nights)
                </h2>
                {/* <button onClick={handleClick}>Reserve or Book Now!</button>
                 */}
                <div className="lsItem">
                  <label>Check-in Date</label>
                  <span onClick={() => setOpenDate(!openDate)}>{`${format(
                    dates[0]?.startDate,
                    "MM/dd/yyyy"
                  )} to ${format(dates[0]?.endDate, "MM/dd/yyyy")}`}</span>
                  {openDate && (
                    <DateRange
                      onChange={(item) => setDates([item.selection])}
                      minDate={new Date()}
                      ranges={dates}
                    />
                  )}
                </div>
                <p>
                  {/* Total: {daysDifference * priceAmount} {priceCurrency} */}
                </p>
                <PaypalCheckoutButton product={product} dates={dates} />
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
