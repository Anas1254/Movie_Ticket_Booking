const db = require("../models");
const { errorResponse, successResponse } = require("../helper/response");
const messages = require("../constants/messages");
//create main model
const OnGoing = db.onGoingMovies;
const Booking = db.booking;
const user = db.user;
//main work

// book tickits
const addbooking = async (req, res) => {
  try {
    let info = {
      seats: req.body.seats,
      payableAmount: req.body.payableAmount,
      ongoingId: req.body.ongoingId,
      UserId: req.user.id,
    };
    let ongoingId = req.body.ongoingId;
    let seats = req.body.seats;
    let seatsChange = await OnGoing.findOne({ where: { Id: ongoingId } });
    let seatval = seatsChange.seats;
    seatval = seatval - seats;
    let onGoingNew = {
      movieTime: await OnGoing.findOne({ where: { Id: ongoingId } }).movieTime,
      movieDate: await OnGoing.findOne({ where: { Id: ongoingId } }).movieDate,
      seats: seatval,
      costPerSeat: OnGoing.findOne({ where: { Id: ongoingId } }).costPerSeat,
    };
    await OnGoing.update(onGoingNew, { where: { Id: ongoingId } });
    let booking = await Booking.create(info);
    return successResponse(res, messages.QuerySuccess, 200, booking);
  } catch (e) {
    // console.log({ e });
    // res.status(400).send("Booking not done try again!");
    return errorResponse(res, messages.QueryError, 404, e);
  }
};

// show my booked shows
const mybookings = async (req, res) => {
  let booking = await Booking.findAll({
    where: { UserId: req.user.id },
  });
  // res.status(200).send(booking);
  return successResponse(res, messages.QuerySuccess, 200, booking);
};

//for admin all bookings display
const allBooking = async (req, res) => {
  if (req.user.role) {
    try {
      let bookinglist = await Booking.findAll({});
      return successResponse(res, messages.QuerySuccess, 200, bookinglist);
    } catch (e) {
      return errorResponse(res, messages.QueryError, 404, e);
    }
  } else {
    return errorResponse(res, messages.Forbidden, 403);
  }
};

module.exports = { addbooking, allBooking, mybookings };
