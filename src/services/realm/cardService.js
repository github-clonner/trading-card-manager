// @flow

import { cardType } from './representation/card'
import * as RealmService from './'
import {
  toRealmCard,
  convertCardFormToRealmQueries
} from './conversion'

const cardCollection = 'Card'

const saveCard = (card, update = true) => {
  RealmService.create(cardCollection, card, update)
}

const findCardByID = (multiverseid: number) : cardType => {
  return RealmService.objectForPrimaryKey(cardCollection, multiverseid)
}

const findAllCards = () => {
  return RealmService.findAll(cardCollection)
}

const queryByForm = async (formFields) => {
  const realmQueries = convertCardFormToRealmQueries(formFields)
  return findAllCards().filtered(realmQueries.join(' AND '))
}

const importFromJSON = (mtgJSON) => {
  mtgJSON.cards.forEach(card => {
    try {
      saveCard(toRealmCard(card), true)
    } catch (e) {
      console.error(`Failed to insert ${card.name}:`, e)
      throw (e)
    }
  })
}

export {
  findCardByID,
  queryByForm,
  importFromJSON,
  saveCard,
  findAllCards
}