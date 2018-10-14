import { fromEventPattern, interval } from "rxjs"
import { switchMap, distinct, zip, map } from "rxjs/operators"

import { Item } from "./saveNewItem"
import db from "."

function getItems$(): Array<Item> {
  return fromEventPattern(
    handler =>
      db
        .collection("items")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot(handler),
    (_, token) => token()
  ).pipe(
    switchMap(items => {
      return items.docs.map(item => {
        const id = item.id
        const { content } = item.data()
        return { id, content }
      })
    }),
    zip(interval(300)),
    map(([item]) => item),
    distinct(x => x.id)
  )
}

export default getItems$
