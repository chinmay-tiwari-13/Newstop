import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { IoCloudyNightOutline } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [articlesLength, setarticlesLength] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [countryOverall, setCountryOverall] = useState("in");
  const [page, setPage] = useState(1);
  const [found, setFound] = useState(true);
  const [totalresults, setTotalresults] = useState('');
  const [newsarticles, setNewsArticles] = useState([]);
  const [caughtError, setCaughtError] = useState(false);
  const [topic, setTopic] = useState("");

  const notify = () => toast("No News Found for the given keyword, Try searching A simpler category!");

  useEffect(() => {
    try{
      setLoading(true);
      fetchData();
    }catch(e){
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }, [countryOverall]);

  const pageSize = 10;
  async function fetchData() {
    // setLoading(true);
    try {
      const response = await axios.get('https://newstop-server.onrender.com/', {
        params: {
          country: countryOverall,
          page: page,
          pageSize: pageSize,
        }
      });
      setTotalresults(response.data.totalresults);
      if (response.data.totalresults === 0) {
        notify();
        setFound(false);
      }
      setarticlesLength(response.data.articles.length);
      setNewsArticles((prevArticles) => [...prevArticles, ...response.data.articles]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setCaughtError(true);
      // setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      if (newsarticles.length === 0) {
        setFound(false);
      }
    }
  }

  async function fetchCustomNews() {
    if (keyword !== "") {
      setLoading(true);
      try {
        const data = encodeURIComponent(keyword);
        const response = await axios.get('https://newstop-server.onrender.com/keyword', {
          params: {
            keyword: data,
            qInTitle: data,
            sortBy: 'relevancy',
            language: 'en',
          }
        });
        if (response.data.articles.length === 0) {
          setFound(false);
          notify();
        }
        setarticlesLength(response.data.articles.length);
        setNewsArticles((prevArticles) => [...prevArticles, ...response.data.articles]);
      } catch (e) {
        setCaughtError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    else{
      setLoading(false);
    }
  }

  const value = {
    loading,
    setLoading,
    countryOverall,
    setCountryOverall,
    topic,
    setTopic,
    fetchData,
    newsarticles,
    setNewsArticles,
    keyword,
    setKeyword,
    articlesLength,
    setarticlesLength,
    fetchCustomNews,
    totalresults,
    setTotalresults,
    caughtError,
    found,
    setFound
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <ToastContainer /> 
    </AppContext.Provider>
  );
}