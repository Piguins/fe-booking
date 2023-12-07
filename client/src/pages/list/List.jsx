import './list.css';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import SearchItem from '../../components/searchItem/SearchItem';
import Footer from '../../components/footer/Footer';
import MailList from '../../components/mailList/MailList';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCalendar, faMagnifyingGlass, faQuestion } from '@fortawesome/free-solid-svg-icons';

const List = () => {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);


  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("1", {
      state: {
        destination,
        date,
        options
      }
    })
  }
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

  return (
    <div>
      <Navbar />
      <Header type="list" />  
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination/property name:</label>
              <div className="lsInput">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>
                <input 
                  type="text" 
                  placeholder='Where are you going?'   
                  value={destination} 
                  onChange={e => setDestination(e.target.value)}/>
              </div>
            </div>


            <label htmlFor="">Check-in date</label> 
            <div className="lsItem">
              <div className="lsDate" onClick={() => setOpenStartDate(!openStartDate)}>
                <FontAwesomeIcon icon={faCalendar} className='icon'/>
                <span>
                  {format(date[0].startDate,"MM/dd/yyyy")}
                </span>
                <FontAwesomeIcon icon={faAngleDown} className='angle'/>
              </div>
              
            </div>
            <label htmlFor="">Check-out date</label> 
            <div className="lsItem">
              <div className="lsDate" onClick={() => setOpenEndDate(!openEndDate)}>
                <FontAwesomeIcon icon={faCalendar} className='icon'/>
                <span>
                  {format(date[0].endDate,"MM/dd/yyyy")}
                </span>
                <FontAwesomeIcon icon={faAngleDown} className='angle'/>
              </div>
              {((openStartDate && !openEndDate) || (!openStartDate && openEndDate))  && 
                <DateRange
                  onChange={item => setDate([item.selection])}
                  minDate= {new Date()}
                  moveRangeOnFirstSelection={false}
                  className='calendarEnd'
                  ranges={date}
              />}
            </div>  
            <div className="lsItem">
              <div className='lsOptionItems' >
                  <div className="lsControl" onClick={() => setOpenOption(!openOption)}>
                    <span>{options.adults} adults</span>
                    <span>·</span>
                    <span>{options.children} children</span>
                    <span>·</span>
                    <span>{options.room} room</span>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className='angleList'
                    />
                  </div>
                  {openOption && <div className='lsOptions'>
                            <div className='lsOptionItem'>
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
                            <div className='lsOptionItem'>
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
                            <div className='lsOptionItem'>
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
            <div className="lsItem">
              <div className="lsWork">
                <input type="checkbox"/>
                <p>I'm traveling for work</p>
                <FontAwesomeIcon icon={faQuestion} className='quesIcon'/>
              </div>
            </div>
            <button className='lsSearchBtn'>Search</button>

          </div>
          <div className="listResult">
            <SearchItem handleClick={handleSearch} />
            <SearchItem handleClick={handleSearch}/>
            <SearchItem handleClick={handleSearch}/>
            <SearchItem handleClick={handleSearch}/>
            <SearchItem handleClick={handleSearch}/>
            <SearchItem handleClick={handleSearch}/>
            <SearchItem handleClick={handleSearch}/>
            <SearchItem handleClick={handleSearch}/>
          </div>
        </div>
      </div>
      <MailList />
      <div className="listContainer">
        <Footer />
      </div>
    </div>
  )
}

export default List