import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "./SearchInput";
import Masonry from "react-masonry-css";
import LazyLoad from "react-lazyload";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import FrontPage from "./FrontPage";

const Gallery = () => {

  const [result, setResult] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sliderValue, setSliderValue] = useState(4);
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState("")

  const shuffle = array => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }; 

  useEffect(() => {
    axios.get("/api/photos").then((res) => {
      setResult(res.data)
    });
  }, []);

  useEffect(() => {
    if(searchValue !== '' && result.length > 0){
      setFiltered(result.filter(item=>item.tags.ImageDescription?.toLowerCase().includes(searchValue?.toLowerCase())))
    }else{
      setFiltered(result);
    }
  }, [result, searchValue]);

  useEffect(() => {
    if(filtered.length > 0){
      const temp = filtered.reduce((acc, current) => {
          acc[current.groupTitle] = acc[current.groupTitle] ?? [];
          acc[current.groupTitle].push(current);
          return acc;
      }, {})
      let groupedTemp = [];
      for ( var key in temp) {
        groupedTemp.push({
          groupTitle: key,
          images: temp[key]
        })
      }
      setGroups(shuffle(groupedTemp));
    }
  }, [filtered]);
  
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const onModal = (image) => {
    console.log(image)

    setUrl(image?.url);
    setIsOpen(true);
  }
 const urlCopy = (image) => {
  navigator.clipboard.writeText(image.url);
  setUrl(image.url)
  setIsOpen(true)

 }
  return (
     <div className="body-container" >
        <header>
          <SearchInput handleSearch={handleSearch} />
          <input
            type="range"
            min="1"
            max="20"
            value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            style={{float:"right"}}
          />
        </header>
         
        <div style={{ marginTop: '60px'}}>
          <FrontPage />
          <div>{groups.map((group, groupIndex) => (
            <div key={groupIndex} >
              <h1 className="group-title">{group.groupTitle}</h1>
             <Masonry
                breakpointCols={{
                  default: sliderValue,
                  1100: 3,
                  700: 2
                }}
                className="group-grid"
                columnClassName="group-grid-column"
              >
                {group.images.map((image, index) => (  
                    <LazyLoad key={index} height={200} offset={100}>
                      <div className="image-container">
                        <img
                          className="image"
                          src={image.url}
                          alt="loading..."
                          onClick={() => onModal(image)}
                        />
                        <div className="photo-title">{image.imageTitle}
                        <button className="copyButton" onClick={() => urlCopy(image)}>copyURL/open</button>
                        </div>
                      </div>
                    </LazyLoad>
                ))}
              </Masonry>
            </div>
          ))}
          </div>
        </div>
          {isOpen && (
          <Lightbox
            mainSrc={url}
            title="imageTitle"
            onCloseRequest={() => setIsOpen(false)} 
          />
        )}
    </div>
  );
};

export default Gallery;
