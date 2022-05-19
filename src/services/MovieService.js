const axios =require("axios").default;
import {
    TMDB_BASE_URL, 
    TMDB_API_KEY,
    TMDB_LANGUAGE_ES, 
    TMBD_IMAGE_BASE_URL,
    YOUTUBE_BASE_URL,
    ENDPOINTS} from "../constants/Urls";
import Languajes from "../constants/Languajes";

    const TMDB_HTTP_REQUEST = axios.create({
        baseURL: TMDB_BASE_URL,
        params:{
            api_key: TMDB_API_KEY,
            language: TMDB_LANGUAGE_ES,
        },
    });

    const getNowPlayingMovies = ()=>
        TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES);

    const getUpcomingMovies = () =>
        TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES);

    const getMovieById = (movieId, append_to_response="") => 
    TMDB_HTTP_REQUEST.get(`${ENDPOINTS.MOVIE}/${movieId}`, append_to_response ? {params: {append_to_response}}: null);

    const getPoster = (path) => `${TMBD_IMAGE_BASE_URL}/original${path}`;

    const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

    const getLanguage = (language_iso) =>
        Languajes.find((language)=>language.iso_639_1 === language_iso)

    const getAllGenres = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);

    export{getNowPlayingMovies, getPoster, getLanguage, getUpcomingMovies, getAllGenres, getMovieById, getVideo,};