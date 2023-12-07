import { faAngleDown, faBed, faCalendarDays, faCar, faEarthAfrica, faPlane, faTaxi, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './header.css';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [openOption, setOpenOption] = useState(false);
    const [options, setOptions] = useState({
        adults: 1,
        children: 0,
        room: 1
    });

    const navigate = useNavigate()
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
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ])

    const handleSearch = () => {
        navigate("hotels", {
            state: {
                destination,
                date,
                options
            }
        })
    }
  return (
    <div className="header">
        <div className={props.type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Flight + Hotel</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faEarthAfrica} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis</span>
                </div>
            </div>

            {props.type !== "list" && 
            <>   
                <h1 className="headerTitle">Find your next stay</h1>
                <p className='headerDesc'>Search deals on hotels, homes, and much more...</p>


                <div className='headerSearch'>
                    <div className="headerSearchItem headerInput">
                        <FontAwesomeIcon icon={faBed} className='icon'/>
                        <input
                            type="text"
                            className="input" 
                            placeholder='Where are you going?'
                            onChange={e => setDestination(e.target.value)}
                        ></input>
                    </div>
                    <div className="headerSearchItem headerCalendar">
                        <span onClick={() => setOpenDate(!openDate)}>
                            <FontAwesomeIcon icon={faCalendarDays} className='icon'/>
                            {
                            `${format(date[0].startDate,"MM/dd/yyyy")} - ${format(date[0].endDate, "MM/dd/yyyy"
                            )}`
                            }
                        </span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            minDate={new Date()}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="calendar"
                        />}
                        
                    </div>
                    <div className="headerSearchItem headerSelect">
                            <div className='optionItems' onClick={() => setOpenOption(!openOption)}>
                                <FontAwesomeIcon icon={faUser} className='icon' />
                                <span>{options.adults} adults</span>
                                <span>·</span>
                                <span>{options.children} children</span>
                                <span>·</span>
                                <span>{options.room} room</span>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className='angleDown'
                                    
                                />
                            </div>
                        {openOption && <div className='options'>
                            <div className='optionItem'>
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
                            <div className='optionItem'>
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
                            <div className='optionItem'>
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

                    <button className="searchBtn" onClick={handleSearch}>Search</button>
                </div>
            </>}
        </div>
    </div>
  )
}

export default Header
