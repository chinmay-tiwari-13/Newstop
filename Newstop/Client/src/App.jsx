import dark_logo from './assets/image_dark.png'
import light_logo from './assets/image_light.png'
import { IoSearchOutline } from "react-icons/io5";
import in_logo from './assets/India_flag_icon.png';
import DisplayNews from './Components/DisplayNews';
import { IoIosArrowDropupCircle } from "react-icons/io";
import Dropdown from './Components/Dropdown';
import { AppContext } from '../context/AppContext';
import { PiSpinnerGapBold } from "react-icons/pi";
import { useContext, useEffect, useState, useRef } from 'react';

function App() {
  const [fetching, setFetching] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [showbutton, setShowButton] = useState(false);
  const { loading, fetchData, setKeyword, articlesLength, fetchCustomNews, keyword, setNewsArticles, setLoading, totalresults, caughtError } = useContext(AppContext);
  const isFetching = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = (window.innerHeight + window.scrollY + 1) >= document.documentElement.scrollHeight;
      if(window.scrollY > 300){
        setShowButton(true);
      }
      else{
        setShowButton(false);
      }
      if (bottom && !isFetching.current) {
        if (articlesLength > 0) {
          setFetching(true);
          setFetchingStatus(true);
          isFetching.current = true;
          setFetchingStatus(true);
          if (keyword != "") {
            if (totalresults == articlesLength) {
              fetchCustomNews().then(() => {
                setTimeout(() => {
                  isFetching.current = false;
                  setFetching(false);
                }, 1000);
              });
            }
            else {
              setFetching(true);
              setFetchingStatus(false);
              isFetching.current = true;
              setTimeout(() => {
                isFetching.current = false;
                setFetching(false);
              }, 1000);
            }
          }
          else {
            fetchData().then(() => {
              setTimeout(() => {
                isFetching.current = false;
                setFetching(false);
              }, 1000);
            });
          }

        } else {
          setFetching(true);
          setFetchingStatus(false);
          isFetching.current = true;
          setTimeout(() => {
            isFetching.current = false;
            setFetching(false);
          }, 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchData, articlesLength]);

  // function onScrollHandler() {
  //   console.log("hi");
  // }

  function inputChangeHandler(event) {
    setKeyword(event.target.value);
  }

  function onClickHandler() {
    setLoading(true);
    setNewsArticles([]);
    fetchCustomNews();
    
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <div className='relative bg-gradient-to-b from-slate-800 to-slate-900'>
        {
          fetching ? (<>
            {
              fetchingStatus ? (<><div className='fixed flex justify-center items-end w-full h-screen'>
                <div className='flex bg-slate-600 p-3 mb-3 rounded-xl'>
                  <p className=' text-xl lg:text-base font-Outfit text-black font-medium'>Fetching More News...</p>
                </div>
              </div></>) : (<><div className='fixed flex justify-center items-end w-full h-screen'>
                <div className='flex bg-slate-600 p-3 mb-3 rounded-xl'>
                  <p className=' text-xl lg:text-base font-Outfit text-black font-medium'>That's all For Today!</p>
                </div>
              </div></>)
            }
          </>) : (<></>)
        }




        <nav className='w-full flex flex-row justify-between items-center h-[5rem] lg:h-[4rem] rounded-b-lg bg-slate-200 z-50 '>
          {/* //image - logo */}
          <div className='w-full'>
            <img src={light_logo} alt="website_logo" className=' m-4 h-12 flex justify-center w-auto' />
          </div>


          {/* //search-pannel */}
          <div className='flex w-full justify-center'>
            <div className='relative flex justify-center md:w-3/4 lg:w-5/6'>
              <div className='absolute left-5 items-center h-full flex pointer-events-none'>
                <IoSearchOutline className=' text-xl text-[#1282CA]' />
              </div>
              <input type="text" placeholder='Search Topic' className='flex justify-center w-full m-4 p-2 pl-7 rounded-lg focus:outline-none required' onChange={inputChangeHandler} />
              <div className='absolute flex items-center h-full right-4 '>
                <button type='submit' className='  bg-blue-700 hover:bg-blue-800 transition-all text-white p-2 rounded-tr-lg rounded-br-lg' onClick={onClickHandler}>Search</button>
              </div>
            </div>
          </div>

          {/* //country */}
          {/* <Dropdown /> */}
        </nav>




        {
          loading ? (<div className='fixed flex justify-center items-center w-full h-screen bg-gradient-to-b from-slate-800 to-slate-900'>
            <div className=''>
              <PiSpinnerGapBold className='animate-spin-slow size-36 text-white' />
            </div>
          </div>)
            :
            (
              <>
                {
                  caughtError ? (
                    <>
                      <div className='w-full h-screen flex justify-center items-center bg-slate-300'>
                        <div className='w-full bg-red-500 font-Outfit text-red-200 text-xl p-4 m-2 rounded-xl'>
                          <p className='  '> <span className=' underline'>Error Fetching the News</span> <br></br>This could be possible because of few Things:</p>
                          <ul className='list-disc list-inside'>
                            <li>Internet Issue : check your Internet connection</li>
                            <li>Request Limit Reached : As i am using free dev Account request's are limited to 100 over a time period of 24 hours</li>
                          </ul>
                        </div>
                      </div>
                    </>
                  ) :
                    (
                      <>
                        <div className='w-full h-full flex flex-col justify-center items-center  '>
                          < DisplayNews />
                        </div>
                        {
                          showbutton ? (<div className='fixed bottom-1 right-3'>         
                            <IoIosArrowDropupCircle className=' size-20 text-slate-900 lg:text-slate-400 lg:size-16' onClick={scrollToTop} />
                        </div>) : (<></>)
                        }
                        
                      </>
                    )
                }
              </>

            )
        }
      </div>
    </>
  )
}

export default App
