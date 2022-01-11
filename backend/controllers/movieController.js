const db = require("../models");
const { errorResponse, successResponse } = require("../helper/response");
const messages = require("../constants/messages");
//create main model
const Movie = db.movies;

//main work
//1. create movie

const addMovie = async (req, res) => {
  if (req.user.role) {
    let info = {
      movieName: req.body.movieName,
      movieGenre: req.body.movieGenre,
      poster: req.body.poster,
    };
    // console.log(req.user, "User Data");
    const movie = await Movie.create(info);
    return successResponse(res, messages.QuerySuccess, 201, movie);
  } else return errorResponse(res, messages.Forbidden, 403);
};

//2. Get all movie

const allMovies = async (req, res) => {
  const size = parseInt(req.query.size);
  const page = parseInt(req.query.page);
  let movies = await Movie.findAll({
    // attributes: ["id", "movieName", "movieGenre", "poster"], // just take required info only not all fields
    limit: size,
    offset: page * size,
  });
  const dataLength = await Movie.findAndCountAll();
  return successResponse(res, messages.QuerySuccess, 200, movies, {
    recordPerPage: size,
    page: page,
    TotalReocords: dataLength.count,
  });
};

//3. Get Single movie

const singleMovie = async (req, res) => {
  let id = req.params.id;
  let movie = await Movie.findOne({
    where: { id: id },
  });
  return successResponse(res, messages.QuerySuccess, 200, movie);
};

//4. Update movie

const updateMovie = async (req, res) => {
  if (req.user.role) {
    let id = req.params.id;
    const movie = await Movie.update(req.body, { where: { id: id } });
    return successResponse(res, messages.UpdateMessage, 202, movie);
  } else return errorResponse(res, messages.Forbidden, 403);
};

//5. Delete Movie
const deleteMovie = async (req, res) => {
  if (req.user.role) {
    let id = req.params.id;
    await Movie.destroy({ where: { id: id } });
    return successResponse(res, messages.DeleteMessage, 200);
  } else return errorResponse(res, messages.Forbidden, 403);
};

module.exports = { addMovie, allMovies, updateMovie, singleMovie, deleteMovie };
