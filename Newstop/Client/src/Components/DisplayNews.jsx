import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import NewsCard from "./NewsCard";


const DisplayNews = () => {

    const { newsarticles, found } = useContext(AppContext);
    // console.log(newsarticles.length);
    
    return (
        <>
            
                
                    {newsarticles.map((newsarticles, index) => (
                        <NewsCard key={index} newsarticles={newsarticles}></NewsCard>
                    ))}
                 
            
        </>
    )
}

export default DisplayNews;