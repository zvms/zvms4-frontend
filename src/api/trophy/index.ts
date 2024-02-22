export * as member from './member'
export * as award from './award'
export {
  insertTrophy as insert,
  removeTrophy as remove,
  readTrophies as read,
  readTrophy as readOne
} from './crud'
import { modifyTrophyName } from './crud'
export const modify = {
  name: modifyTrophyName,
}
