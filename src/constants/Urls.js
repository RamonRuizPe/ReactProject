const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMBD_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"
const YOUTUBE_BASE_URL = "https://youtube.com/watch"

const TMDB_API_KEY= "38fe090abaed0d37d4afe03d67224541"
const TMDB_LANGUAGE_ES= "es-MX"

const ENDPOINTS ={
    NOW_PLAYING_MOVIES: "/movie/now_playing",
    UPCOMING_MOVIES: "/movie/upcoming",
    GENRES: "/genre/movie/list",
    MOVIE: "/movie",
}

const APPEND_TO_RESPONSE={
    VIDEOS: "videos",
    CREDITS: "credits",
    RECOMMENDATIONS: "recommendations",
}

export{TMDB_BASE_URL, TMDB_API_KEY, TMDB_LANGUAGE_ES, TMBD_IMAGE_BASE_URL, YOUTUBE_BASE_URL, ENDPOINTS, APPEND_TO_RESPONSE}