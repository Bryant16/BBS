import React from 'react'
import ReactPlayer from 'react-player';
import './Help.css';

const Help = ()=>{
    return (
        <div className='help_page_container'>
            <div>
            <h1 class="primary_color">Player Search</h1>
            <ReactPlayer width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/searchFeature.mp4" />
            </div>
            <div>
                <h1 class="primary_color">Create a Profile</h1>
            <ReactPlayer width='24em' height='24em'   controls url="https://bbscouting.s3.amazonaws.com/createPlayer.mp4" />
            </div>
            <div>
                <h1 class="primary_color">Edit Information</h1>
            <ReactPlayer width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/editplayer.mp4" />
            </div>
            <div>
                <h1 class="primary_color">File Uploading</h1>
            <ReactPlayer width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/media.mp4" />
            </div>
            <div>
                <h1 class="primary_color">Tracking Players</h1>
            <ReactPlayer width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/track.mp4" />
            </div>
            <div>
                <h1 class="primary_color">Evaluation Forms</h1>
            <ReactPlayer  width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/evaluation.mp4" />
            </div>
            <div>
                <h1 class="primary_color">Player PDF Sharing</h1>
            <ReactPlayer  width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/pdf.mp4" />
            </div>
            <div>
                <h1 class="primary_color">Creating Notes</h1>
            <ReactPlayer  width='24em' height='24em'  controls url="https://bbscouting.s3.amazonaws.com/notes.mp4" />
            </div>
        </div>

    )
}

export default Help;