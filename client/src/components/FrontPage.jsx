import React,{useEffect,useRef} from "react";
import "./FrontPage.css"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const FrontPage = () => {
  const videoEl = useRef(null);


const newText = [{text:"NINA APRIL 2022", url:"https://www.tripstodiscover.com/"},{text:"JUNEART WESTBAM EARTHDIXIE",url:"https://wordpress.com/"},{text:"NINA APRIL 2022", url:"https://www.tripstodiscover.com/"},{text:"JUNEART WESTBAM EARTHDIXIE",url:"https://wordpress.com/"},
                  {text:"NINA APRIL 2022", url:"https://www.tripstodiscover.com/"},{text:"JUNEART WESTBAM EARTHDIXIE",url:"https://wordpress.com/"},{text:"NINA APRIL 2022", url:"https://www.tripstodiscover.com/"},{text:"JUNEART WESTBAM EARTHDIXIE",url:"https://wordpress.com/"}]

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
     
        <div className="front-container">
            <div className="image-slideshow">
              <Carousel showThumbs={false} showStatus={true} infiniteLoop autoPlay={true}>
                
                <div>
                  <img src="/slideshow/1.jpg" alt="slideimage" />
                </div>
                <div>
                  <img src="/slideshow/2.jpg" alt="slideimage" />
                </div>
                <div>
                  <img src="/slideshow/3.jpg" alt="slideimage" />
                </div>
                <div>
                  <img src="/slideshow/4.jpg" alt="slideimage" />
                </div>
              </Carousel>
              <div className="scroll-ticker">
                  <marquee scrollamount="20">
                      {newText.map((item, index) => (
                        <a className="flowtext" key={index} href={item.url} target="_blank" rel="noreferrer">
                          {item.text}
                        </a>
                      ))}
                  </marquee>
              </div>
            </div>

            <div className="vertical-video-player">
              <video
                src="/1.mp4" // Replace with your video URL
                  playsInline
                  loop
                  muted
                  controls
                  alt="All the devices"
                ref={videoEl}
              />
             </div>
          
        </div>
  );
}

export default FrontPage


 