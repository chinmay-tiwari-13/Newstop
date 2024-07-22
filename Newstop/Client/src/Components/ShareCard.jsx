import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import LoadingAnimation from "../assets/Loading_animation.gif";



const ShareCard = ({ ShareUrl, onStateChangeHnalder }) => {

    const defaultSize = '250x250';
    const data = encodeURIComponent(String(ShareUrl));
    const link = 'https://api.qrserver.com/v1/create-qr-code/?size=' + defaultSize + '&data=' + data;
    const [currimg, setcurrimg] = useState('');
    const [loading, setLoading] = useState(false);
    const [tick, setTick] = useState(false);


    // console.log(ShareUrl);

    useEffect(() => {
        const getQrCode = async () => {
            try {
                setLoading(true);
                // console.log("fetching qrcode data");
                const request = await axios.get(link);
                console.log(request);
                console.log("got the request");
                setcurrimg(request.config.url);
                setLoading(false);

            }
            catch (e) {
                alert("disable the Ad-block to access qr_code");

                setLoading(false);
                // console.log("Encountering this error: " + e);
            }
        }
        getQrCode();
    }, [])

    function copyHandler() {
        navigator.clipboard.writeText(ShareUrl)
            .then(() => (setTick(true)));
        setTimeout(() => { setTick(false) }, 1000)
    }


    return (



        <div className='flex h-full w-full lg:w-2/5 justify-between items-center p-4 '>
            <div className="flex flex-row w-full h-full bg-slate-400 py-4  justify-center rounded-2xl">
                <div className="flex flex-col p-4 w-full h-full">
                    <div className="flex flex-col justify-center pb-3 items-center w-full h-full">
                        <p className="p-2 font-bold text-xl lg:text-base font-Outfit">Share Via Qr-Code</p>
                        {loading ? (<img src={LoadingAnimation} className=" w-[250px] h-[250px]"></img>) : (<img src={currimg} alt="qr_img" className=" rounded-lg " />)}
                    </div>
                    <hr className="flex w-full"></hr>
                    <p className=" font-bold text-xl lg:text-base font-Outfit justify-center flex ">Share Via Link</p>
                    <div className="flex w-full h-full flex-row justify-center ">
                        {tick ? (<div className="flex pr-3 justify-center ">
                            <FaCheck className="text-3xl lg:text-xl  text-green-700" />
                        </div>) : (<></>)
                        }
                        <div className=" ">
                            <div className="  bg-slate-600 hover:bg-slate-500 p-2 rounded-xl transition-all">

                                <button className=" font-Outfit font-medium text-xl lg:text-base" onClick={copyHandler}> Copy Link</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex h-full pr-2">
                    <div className=" flex p-2 items-start">
                        <button className="flex bg-slate-700 p-2 rounded-full" onClick={onStateChangeHnalder}>
                            <IoClose className="text-3xl lg:text-2xl" />
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default ShareCard;