const http2 = require('http2');
const Card = require('../models/card');
const { NotFoundError, WrongUserError } = require('../utils/errors');

const {
  HTTP_STATUS_CREATED,
} = http2.constants;

module.exports.getCards = (req, res, next) => {
  Card.find({}).populate('owner').populate('likes')
    .then((cards) => res.send({ data: cards.reverse() }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(HTTP_STATUS_CREATED).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).populate('owner').populate('likes')
    .then((card) => {
      if (card == null) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else if (card.owner._id.toString() !== req.user._id) {
        throw new WrongUserError('Вы не являетесь хозяином карточки');
      }
      return Card.findByIdAndRemove(req.params.cardId).populate('owner').populate('likes');
    })
    .then(() => res.send({ message: 'Пост удален' }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate('owner').populate('likes')
    .then((card) => {
      if (card == null) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).populate('owner').populate('likes')
    .then((card) => {
      if (card == null) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .catch(next);
};
