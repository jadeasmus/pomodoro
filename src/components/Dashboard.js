import React from 'react'
import { useEffect } from 'react'

import Timer from './Timer'
import Counter from './Counter'
import Pomodoro from './Pomodoro'

/*
    Displays the timer and the player
    Manages the access token and passes it to the timer and player components
*/


export default function Dashboard() {

    const client_id = process.env.REACT_APP_CLIENT_ID
    const redirect_url = process.env.REACT_APP_REDIRECT_URL
    const auth_endpoint = process.env.REACT_APP_AUTHORIZE_URL

    const scope_params = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "playlist-modify-private",
        "playlist-read-private", 
        "user-library-read",
        "user-library-modify",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing"
    ].join('%20');

    const handleLogin = () => {
        window.location = `${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope_params}&response_type=token&show_dialog=true`;
    };

    const getReturnedParams = (hash) => {
        // leave out hashtag
        const strAfterHash = hash.substring(1)
        // find token_type and expires_in params
        const param_array = strAfterHash.split("&")
        const assigned_params = param_array.reduce((acc, currVal) => {
            // console.log(currVal)
            const [key, val] = currVal.split("=")
            acc[key] = val
            return acc
        }, {});
        return assigned_params
    }

    // retrieve params if login is successful
    useEffect(() => {
        if (window.location.hash) {
            // get variables from url
            const { access_token, expires_in, token_type } = getReturnedParams(window.location.hash)
            // console.log({ access_token })

            // store items in local memory
            localStorage.clear()
            localStorage.setItem("accessToken", access_token)
            localStorage.setItem("expiresIn", expires_in)
            localStorage.setItem("tokenType", token_type)

        }
    })

    


    return (
        <div className="bg-blue-300 h-screen">
            {/* Login button */}
            <div className="absolute top-8">
                <button type="submit" onClick={ handleLogin }>
                    <svg className="cursor-pointer fill-current text-green-spotify hover:text-green-glow" xmlns="http://www.w3.org/2000/svg" height="80" width="270" viewBox="-33.4974 -55.829 290.3108 334.974"><path d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"/></svg>
                </button>
            </div>

            {/* Timer component */}
            {/* <Timer /> */}

            <Pomodoro />

        </div>
    )
}
