const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");
const { errorResponse, successResponse } = require("../helper/response");
const messages = require("../constants/messages");
const { movies } = require("../models");
//create main model
const OnGoing = db.onGoingMovies;

//main work
// create movie

const addOnGoing = async (req, res) => {
  if (req.user.role) {
    let info = {
      movieTime: req.body.movieTime,
      movieDate: req.body.movieDate,
      seats: req.body.seats,
      movieId: req.body.movieId,
      costPerSeat: req.body.costPerSeat,
    };
    const onGoing = await OnGoing.create(info);
    return successResponse(res, messages.QuerySuccess, 201, onGoing);
  } else return errorResponse(res, messages.Forbidden, 403);
};

// Fetch Single movie shedule

const singleOnGoing = async (req, res) => {
  let id = req.params.id;
  let onGoing = await OnGoing.findAll({
    where: { movieId: id },
    include: [movies],
  });
  //res.status(200).send(onGoing);
  return successResponse(res, messages.QuerySuccess, 200, onGoing);
};

//fetch
const allSchedule = async (req, res) => {
  try {
    //console.log("data: ", req.query.size);
    const size = parseInt(req.query.size);
    const page = parseInt(req.query.page);
    let list = await OnGoing.findAll({
      limit: size,
      offset: page * size,
      where: {
        movieDate: {
          [Op.gte]: moment().format("YYYY-MM-DD"),
        },
      },
      include: [movies],
    });
    const dataLength = await OnGoing.findAndCountAll();
    return successResponse(res, messages.QuerySuccess, 200, list, {
      size: size,
      page: page,
      dataLength: dataLength.count,
    });
  } catch (e) {
    return errorResponse(res, messages.QueryError, 404, e);
    //res.status(400).send("unabel to resolve query");
  }
};
// Update ongoing movie

const updateOnGoing = async (req, res) => {
  if (req.user.role) {
    let id = req.params.id;
    const onGoing = await OnGoing.update(req.body, { where: { id: id } });
    successResponse(res, messages.UpdateMessage, 202);
  } else return errorResponse(res, messages.Forbidden, 403);
};

// Delete ongoing movie
const deleteOnGoing = async (req, res) => {
  if (req.user.role) {
    let id = req.params.id;
    await OnGoing.destroy({ where: { id: id } });
    return successResponse(res, messages.DeleteMessage, 200);
  } else return errorResponse(res, messages.Forbidden, 403);
};

module.exports = {
  addOnGoing,
  allSchedule,
  updateOnGoing,
  deleteOnGoing,
  singleOnGoing,
};
