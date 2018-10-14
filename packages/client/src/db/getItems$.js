import { fromEventPattern, interval, from, merge, zip } from "rxjs"
import { map, switchMap, distinct } from "rxjs/operators"

import { Item } from "./saveNewItem"
import db from "."

const mapper = items => {
  return items.docs.map(item => {
    const id = item.id
    const { content } = item.data()
    return { id, content }
  })
}

const withUpdates$ = fromEventPattern(
  handler =>
    db
      .collection("items")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot(handler),
  (_, token) => token()
).pipe(switchMap(mapper))

const originals$ = from(
  db
    .collection("items")
    .orderBy("createdAt", "desc")
    .limit(100)
    .get()
).pipe(switchMap(mapper))

const spacer$ = interval(1000)

function getItems$(): Array<Item> {
  return merge(
    zip(originals$, spacer$).pipe(map(([item]) => item)),
    withUpdates$
  ).pipe(distinct(x => x.id))
}

export default getItems$
