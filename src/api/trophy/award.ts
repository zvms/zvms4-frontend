export {
  insertTrophyAward as insert,
  removeTrophyAward as remove,
} from './crud'

import {
  modifyTrophyAwardDuration,
} from './crud'

export const modify = {
  duration: modifyTrophyAwardDuration,
}
