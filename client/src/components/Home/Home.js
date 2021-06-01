import React from 'react';

import ReactPlayer from 'react-player';

import './Home.css';

const Home = () => {
    return (
        <section className="home-section">
            <h1>DENTSU</h1>


            <ReactPlayer
                className="video-dentsu"
                url="https://youtu.be/T4udpibGlFA"
                loop={true}
                controls={true}
            />



        </section>
    )
}

export default Home;


// https://youtu.be/T4udpibGlFA