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