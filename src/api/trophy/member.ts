export { insertTrophyMember as insert, removeTrophyMember as remove } from './crud'

import { modifyTrophyMemberAward, modifyTrophyMemberMode, modifyTrophyMemberStatus } from './crud'

export const modify = {
  award: modifyTrophyMemberAward,
  mode: modifyTrophyMemberMode,
  status: modifyTrophyMemberStatus
}
