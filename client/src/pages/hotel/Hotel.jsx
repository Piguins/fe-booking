import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import MailList from '../../components/mailList/MailList';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import './hotel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCalendar, faHeart, faLocationDot, faMagnifyingGlass, faQuestion, faShareNodes } from '@fortawesome/free-solid-svg-icons';

const Hotel = () => {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);




  const handleSub = (name) => {
    setOptions(prev => { 
        return {...prev, [name]: options[name] - 1}
    });
  };
  const handleAdd = (name) => {
      setOptions(prev => { 
          return {...prev, [name]: options[name] + 1}
      });
  };

  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max500/349023670.jpg?k=8bca080ed4abb6c663726415174889c446943173e2ac6fa00b51458f28ba0fd1&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max500/349023670.jpg?k=8bca080ed4abb6c663726415174889c446943173e2ac6fa00b51458f28ba0fd1&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max500/349023670.jpg?k=8bca080ed4abb6c663726415174889c446943173e2ac6fa00b51458f28ba0fd1&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max500/349023670.jpg?k=8bca080ed4abb6c663726415174889c446943173e2ac6fa00b51458f28ba0fd1&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max500/349023670.jpg?k=8bca080ed4abb6c663726415174889c446943173e2ac6fa00b51458f28ba0fd1&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max500/349023670.jpg?k=8bca080ed4abb6c663726415174889c446943173e2ac6fa00b51458f28ba0fd1&o=&hp=1"
  //   }
  // ];
  return (
    <div className='hotel'>
      <Navbar />
      <Header type='list' />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <div className="hotelSearch">
            <h1 className="htTitle">Search</h1>
            <div className="htItem">
              <label htmlFor="">Destination/property name:</label>
              <div className="htInput">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>
                <input 
                  type="text" 
                  placeholder='Where are you going?'   
                  value={destination} 
                  onChange={e => setDestination(e.target.value)}
                  />
              </div>
            </div>
            <label htmlFor="">Check-in date</label> 
            <div className="htItem">
              <div className="htDate" onClick={() => setOpenStartDate(!openStartDate)}>
                <FontAwesomeIcon icon={faCalendar} className='icon'/>
                <span>
                  {format(date[0].startDate,"MM/dd/yyyy")}
                </span>
                <FontAwesomeIcon icon={faAngleDown} className='htAngle'/>
              </div>
              
            </div>
            <label htmlFor="">Check-out date</label> 
            <div className="htItem">
              <div className="htDate" onClick={() => setOpenEndDate(!openEndDate)}>
                <FontAwesomeIcon icon={faCalendar} className='icon'/>
                <span>
                  {format(date[0].endDate,"MM/dd/yyyy")}
                </span>
                <FontAwesomeIcon icon={faAngleDown} className='htAngle'/>
              </div>
              {((openStartDate && !openEndDate) || (!openStartDate && openEndDate))  && 
                <DateRange
                  onChange={item => setDate([item.selection])}
                  minDate= {new Date()}
                  moveRangeOnFirstSelection={false}
                  className='calendarStart'
                  ranges={date}
              />}
            </div>  
            <div className="htItem">
              <div className='htOptionItems' >
                  <div className="htControl" onClick={() => setOpenOption(!openOption)}>
                    <span>{options.adults} adults</span>
                    <span>·</span>
                    <span>{options.children} children</span>
                    <span>·</span>
                    <span>{options.room} room</span>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className='htAngleList'
                    />
                  </div>
                  {openOption && <div className='htOptions'>
                            <div className='htOptionItem'>
                                <p>Adults</p>
                                <div>
                                    <button
                                        disabled={options.adults <= 1}
                                        className='sub'
                                        onClick={()=> handleSub("adults")}>-</button>
                                    <span>{options.adults}</span>
                                    <button className='add' onClick={()=> handleAdd("adults")}>+</button>
                                </div>
                            </div>
                            <div className='htOptionItem'>
                                <p>Children</p>
                                <div>
                                    <button
                                        disabled={options.children <= 0}
                                        className='sub'
                                        onClick={()=> handleSub("children")}>-</button>
                                    <span>{options.children}</span>
                                    <button className='add' onClick={()=> handleAdd("children")}>+</button>
                                </div>
                            </div>
                            <div className='htOptionItem'>
                                <p>Room</p>
                                <div>
                                    <button
                                        disabled={options.room <= 1}
                                        className='sub'
                                        onClick={()=> handleSub("room")}>-</button>
                                    <span>{options.room}</span>
                                    <button className='add' onClick={()=> handleAdd("room")}>+</button>
                                </div>
                            </div>
                        </div>}
              </div>
              </div>
            <div className="htItem">
              <div className="htWork">
                <input type="checkbox"/>
                <p>I'm traveling for work</p>
                <FontAwesomeIcon icon={faQuestion} className='quesIcon'/>
              </div>
            </div>
            <button className='htSearchBtn'>Search</button>
          </div>
          <div className="hotelContent">
            <div className="hotelHeading">
              <div>
                <div className="hotelTitle">
                  <span>Hotel</span>
                  <h1>Vias Hotel Vung Tau</h1>
                </div>
                <div className="hotelLocation">
                  <FontAwesomeIcon icon={faLocationDot} className='icon'/>
                  <p className="hotelAddress">179 Thuy Van, Ward 8, Vung Tau, Vietnam</p>
                  <span>-</span>
                  <p className='showMap'>Great location - Show map</p>
                </div>
              </div>
              <div className="hotelShare">
                <FontAwesomeIcon icon={faHeart} className='heart'/>
                <FontAwesomeIcon icon={faShareNodes} className='share' />
                <button className="reserveBtn">Reserve</button>
              </div>
            </div>
            <div className="hotelImg">
              <div className="hotelImgTop">
                <div className="img1">
                  <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/273683100.jpg?k=dea8e6c0cba6c5b00de2ffebf16d202fbab389942cff76544c56a3e270745ac9&o=&hp=1" className='imgTop' alt="" />
                </div>
                <div className="img2">
                  <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/273683100.jpg?k=dea8e6c0cba6c5b00de2ffebf16d202fbab389942cff76544c56a3e270745ac9&o=&hp=1" className='imgTop' alt="" />
                </div>
                <div className="img3">
                  <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/273683100.jpg?k=dea8e6c0cba6c5b00de2ffebf16d202fbab389942cff76544c56a3e270745ac9&o=&hp=1" className='imgTop' alt="" />
                </div>
              </div>
              <div className='hotelImgBot'>
                <div className="img4">
                  <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/273683100.jpg?k=dea8e6c0cba6c5b00de2ffebf16d202fbab389942cff76544c56a3e270745ac9&o=&hp=1" className='imgBot' alt="" />
                </div>
                <div className="img5">
                  <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/273683100.jpg?k=dea8e6c0cba6c5b00de2ffebf16d202fbab389942cff76544c56a3e270745ac9&o=&hp=1" className='imgBot' alt="" />
                </div>
                <div className="img6">
                  <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/273683100.jpg?k=dea8e6c0cba6c5b00de2ffebf16d202fbab389942cff76544c56a3e270745ac9&o=&hp=1" className='imgBot' alt="" />
                </div>
                <div className="img7">
                  <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/273683100.jpg?k=dea8e6c0cba6c5b00de2ffebf16d202fbab389942cff76544c56a3e270745ac9&o=&hp=1" className='imgBot' alt="" />
                </div>
                <div className="img8">
                  <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/273683100.jpg?k=dea8e6c0cba6c5b00de2ffebf16d202fbab389942cff76544c56a3e270745ac9&o=&hp=1" className='imgBot' alt="" />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="hotelDesc">
          <div className="htDetails">
                <h2>Stay in the heart of Hiroshima</h2>
                <p>You're eligible for a Genius discount at KOKO HOTEL Hiroshima Ekimae! To save at this property, all you have to do is sign in or register.
                  Ideally set in the Hiroshima City Centre district of Hiroshima, KOKO HOTEL Hiroshima Ekimae is located a 5-minute walk from Myoei-ji Temple, half a kilometer from Chosho-in Temple and a 10-minute walk from Katō Tomosaburō Bronze Statue. With a restaurant, the 3-star hotel has air-conditioned rooms with free WiFi, each with a private bathroom. The property is 1.8 km from Atomic Bomb Dome and 1.8 km from Hiroshima Peace Memorial Park.<br/>
                  All rooms in the hotel are equipped with a flat-screen TV and slippers.
                  Guests at KOKO HOTEL Hiroshima Ekimae can enjoy an American or an Asian breakfast.<br/>
                  Staff at the accommodation are available to give advice at the 24-hour front desk.<br/>
                  Popular points of interest near KOKO HOTEL Hiroshima Ekimae include Hiroshima Danbara Shopping Centre, Hiroshima City Minami Ward Community Cultural Center and Hiroshima University Institute of Medical History. The nearest airport is Iwakuni Kintaikyo Airport, 33.8 km from the hotel.
                  This is our guests' favorite part of Hiroshima, according to independent reviews.
                  Couples in particular like the location – they rated it 8.8 for a two-person trip.
                </p>
                <span>KOKO HOTEL Hiroshima Ekimae has been welcoming Booking.com guests since Oct 20, 2020</span>
          </div>
          <div className="htHighlights">
            <div className="box">
              <h3>Property Highlights</h3>
              <p>	Located in the heart of Hiroshima, this hotel has an excellent location score of 8.4</p>
              <h4>Breakast info</h4>
              <p>Asian, American</p>
              <button>Reserve</button>
            </div>
          </div>
        </div>
      </div>

      <MailList />
      <div className="hotelContainer">
        <Footer />
      </div>
    </div>
  )
}