import React from 'react'
import ReactPlayer from 'react-player';
import './Help.css';

const Help = ()=>{
    return (
        <div className='help_page_container'>
            <div>
            <h1>Search</h1>
            <ReactPlayer width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/searchFeature.mp4" />
            </div>
            <div>
                <h1>Create a Player Profile</h1>
            <ReactPlayer width='24em' height='24em'   controls url="https://bbscouting.s3.amazonaws.com/createPlayer.mp4" />
            </div>
            <div>
                <h1>Edit a Player's Information</h1>
            <ReactPlayer width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/editplayer.mp4" />
            </div>
            <div>
                <h1>Test</h1>
            <ReactPlayer width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/searchFeature.mp4" />
            </div>
            <div>
                <h1>Test</h1>
            <ReactPlayer width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/searchFeature.mp4" />
            </div>
            <div>
                <h1>Test</h1>
            <ReactPlayer  width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/searchFeature.mp4" />
            </div>
        </div>

    )
}

export default Help;