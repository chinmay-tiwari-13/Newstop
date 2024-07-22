import { useContext, useState } from "react";
import React from "react";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import in_logo from "../assets/india.png";
import jp_logo from "../assets/japan.png";
import ge_logo from "../assets/germany.png";
import { AppContext } from "../../context/AppContext";


// import { PiCursorClickDuotone } from "react-icons/pi";



const Dropdown = () => {

    const [hidden, setHidden] = useState(true);
    const [country,setCountry] = useState("Country");
    const [click , setClick] = useState(false);
    const {setCountryOverall , fetchData} = useContext(AppContext);
    

    const onClickHandler = () => {
        setHidden(!hidden);
    }

    const onCountryHandler = (Country_name) => {
        setClick(true);
        setHidden(!hidden);
        if(Country_name == "India"){
            setCountryOverall("in");
            setCountry(in_logo);
            fetchData();
        }
        else if(Country_name == "Japan"){
            setCountryOverall("jp");
            setCountry(jp_logo);
            fetchData();
        }
        else if(Country_name == "Germany"){
            setCountryOverall("ar");
            setCountry(ge_logo);
            fetchData();
        }
    }

    


    return (
        <>
            <div className="  w-full h-full hidden lg:justify-end lg:flex lg:p-4 relative drop-shadow-2xl text-white">
                <button className="  bg-blue-800 hover:bg-blue-900 p-[0.4rem] rounded-2xl flex items-center  transition-all" onClick={onClickHandler}> {click ? (<img src={country} className="p-1 w-[2rem] h-[2rem]" alt="Country" />) : (<p>Set Country</p>)} {hidden ? (<SlArrowDown className="m-2 text-xs text-white" />) : (<SlArrowUp className="m-2 text-xs text-white" />)} </button>

                {hidden
                    ?
                    (<></>)

                    : (
                        //showed only when the hidden is false. 
                        <div className="w-1/3 absolute top-16 flex flex-col text-white">
                            <button className=" bg-blue-500 hover:bg-blue-600 flex flex-row justify-between items-center rounded-tl-lg rounded-tr-lg transition-all" onClick={() => {onCountryHandler('India')}}>
                                <div className="items-center flex pl-3">India</div>
                                <div className="items-center flex pr-3">
                                    <img src={in_logo} alt="India_icon" className=" p-1 w-10 h-10" />
                                </div>
                            </button>
                            <hr />
                            <button className="bg-blue-500 hover:bg-blue-600 flex flex-row items-center justify-between transition-all" onClick={() => {onCountryHandler('Japan')}}>
                                <div className="items-center flex pl-3">Japan</div>
                                <div className="items-center flex pr-3">
                                    <img src={jp_logo} alt="Japan_icon" className=" p-1 w-10 h-10" />
                                </div>
                            </button>
                            <hr />
                            <button className="bg-blue-500 hover:bg-blue-600 flex flex-row justify-between items-center rounded-bl-lg rounded-br-lg  transition-all" onClick={() => {onCountryHandler('Germany')}}>
                                <div className="items-center flex pl-3">Germany</div>
                                <div className="items-center flex pr-3">
                                    <img src={ge_logo} alt="Germany_icon" className="p-1 w-10 h-10" />
                                </div>
                            </button>
                        </div>

                    )}

            </div>
        </>


    )
}

export default Dropdown;