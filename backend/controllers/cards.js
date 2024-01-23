const Cards = require('../models/cards');
const {
  SUCCESS_CODE,
  CREATE_CODE,
} = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAcces = require('../utils/notAcces');

const checkError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new NotCorrectDataError(`Data validation error: ${err.message}`));
    return;
  }
  next(err);
};

module.exports.getAllCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => {
      res.status(SUCCESS_CODE).send({ data: cards });
    })
    .catch((err) => { checkError(err, next); });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATE_CODE).send({ data: card });
    })
    .catch((err) => { checkError(err, next); });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Cards.findById(cardId)
    .orFail(() => new NotFindError('Card is not found'))
    .then((card) => {
      if (card.owner.valueOf() !== req.user._id) {
        next(new NotAcces('Вы не владелец карточки'));
        return;
      }
      Cards.deleteOne(card)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, {
    new: true,
  })
    .orFail(() => new NotFindError('Card is not found'))
    .then((result) => {
      res.status(SUCCESS_CODE).send({ data: result });
    })
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, {
    new: true,
  })
    .orFail(() => new NotFindError('Card is not found'))
    .then((result) => {
      res.status(SUCCESS_CODE).send({ data: result });
    })
    .catch(next);
};
