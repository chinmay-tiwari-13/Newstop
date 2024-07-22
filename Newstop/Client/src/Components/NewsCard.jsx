
import { format, parseISO } from 'date-fns';
import { useState, useContext } from 'react';
// import { gsap } from 'gsap';
import './NewsCard.css';
// import lottie from 'lottie-web';
import ShareCard from './ShareCard';
import { IoMdShare } from "react-icons/io";
import { AppContext } from '../../context/AppContext';
import { FaLink } from "react-icons/fa";
import App from '../App';

// define "lord-icon" custom element with default properties


const NewsCard = (newsarticle, key) => {
    // const { share,setShare } = useContext(AppContext)
    const [show, setShow] = useState(false);
    const [share, setShare] = useState(false);
    // const {share, setShare} = useContext(AppContext)


    const gettime = newsarticle.newsarticles.publishedAt;

    const date = parseISO(gettime);
    const formattedDate = format(date, 'MMMM d, yyyy h:mm aaaa');

    if (newsarticle.newsarticles.description == null || newsarticle.newsarticles.description === "[Removed]") {
        return null;
    }
    if (newsarticle.newsarticles.title == null || newsarticle.newsarticles.title === "[Removed]") {
        return null;
    }



    const title = newsarticle.newsarticles.title
    const trimmedTitle = title.split(' - ')[0];



    function onClickHandler() {
        if (newsarticle.newsarticles.description != null) {
            setShow(!show);
        }
    }

    function onStateChangeHnalder() {
        setShare(!share);
    }



    return (
        <>
            {share ? (<>
                <ShareCard ShareUrl={newsarticle.newsarticles.url} onStateChangeHnalder={onStateChangeHnalder}></ShareCard>
            </>) : (<>
                <div className='flex w-full lg:w-2/3 justify-center items-center'>
                    <div className='flex bg-slate-400 flex-col lg:flex-row-reverse lg:justify-center p-4 m-4 rounded-2xl w-full' onClick={onClickHandler}>
                        {
                            show ? (<> </>
                            ) : (
                                <><div className='flex justify-center items-end w-full h-full  pb-2 pointer-events-none'>
                                    <img src={newsarticle.newsarticles.urlToImage} alt="" className=' rounded-xl object-cover lg:w-[80%] h-1/3 lg:h-[15rem] shadow-inner' />
                                </div></>)
                        }

                        <div className='lg:flex lg:flex-col lg:justify-between'>
                            <div className=" flex flex-row " >
                                <div className='flex flex-col  font-Merri'>
                                    <div className='flex flex-row'>
                                        <div className=' text-lg lg:text-xl font-bold mb-2'>
                                            <p>{trimmedTitle}</p>
                                        </div>
                                        <div>
                                            {
                                                show ? (<>

                                                    <div className='flex flex-col items-center pl-1 pb-2 h-full'>

                                                        <button className='flex p-2 bg-slate-700 rounded-full mb-2 ' onClick={onStateChangeHnalder}>
                                                            <IoMdShare className=' text-xl lg:text-xl' />
                                                        </button>

                                                        <a href={newsarticle.newsarticles.url}>
                                                            <div className='flex p-2 bg-slate-700 rounded-full'>
                                                                <FaLink className=' text-xl lg:text-xl' />
                                                            </div>
                                                        </a>
                                                    </div>
                                                </>) : (<></>)
                                            }

                                        </div>
                                    </div>

                                    {
                                        show ? (<>
                                            <hr className=' text-black'></hr>
                                            <div className='flex flex-row pt-1'>
                                                <div className='text-base lg:text-base whitespace-normal  text-ellipsis' >
                                                    <div className='overflow-y-hidden'>
                                                        <p className='max-h-40 overflow-hidden'>{newsarticle.newsarticles.description}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </>) : (<></>)
                                    }
                                </div>
                            </div>
                            <div className='flex flex-row w-full justify-between m-2 pt-2 DiscriptionTile'>
                                {
                                    show ?
                                        (<><div className='font-Outfit lg:text-sm'>
                                            <p>{formattedDate}</p>
                                        </div></>)
                                        :
                                        (<></>)
                                }


                                <div className='font-Outfit font-bold text-lg ' >
                                    <p>{newsarticle.newsarticles.source.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default NewsCard;