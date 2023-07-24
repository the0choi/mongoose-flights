const Ticket = require('../models/ticket')
const Flight = require('../models/flight')

module.exports = {
    new: newTicket,
    create,
}

async function newTicket(req, res) {
    const flight = await Flight.findById(req.params.id);
    res.render(`tickets/new`, { 
        flight,
        errorMsg: ''
    });
}

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);
    try {
      const newTicket = await Ticket.create(req.body);
      newTicket.flight = flight;
      await newTicket.save();
      res.redirect(`/flights/${flight._id}`);
    } catch (err) {
      console.log(err);
      res.render('tickets/new', { 
        flight,
        errorMsg: err.message });
    }
}