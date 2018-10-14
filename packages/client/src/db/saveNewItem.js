// @flow
import { DateTime } from "luxon"

import db from "."

export interface Item {
  id: string;
  content: string;
}

function saveNewItem({ id, ...item }: Item) {
  return db
    .collection("items")
    .doc(id)
    .set({
      ...item,
      createdAt: DateTime.local().toJSDate(),
    })
}

export default saveNewItem
