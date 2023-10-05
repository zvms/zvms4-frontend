export function getUserPosition(permission: number) {
  /**
   * 1. Student - 1
   * 2. Secretary - 2
   * 3. Auditor - 4
   * 4. Inspector - 8
   * 5. Admin - 16
   * Stackable, Unique
   */
  const isStudent = (permission & 1) === 1
  const isSecretary = (permission & 2) === 2
  const isAutidor = (permission & 4) === 4
  const isInspector = (permission & 8) === 8
  const isAdmin = (permission & 16) === 16
  console.log(isStudent, isSecretary, isAutidor, isInspector, isAdmin, permission)
  return ['student', 'secretary', 'auditor', 'inspector', 'admin'].filter(
    (_, i) => [isStudent, isSecretary, isAutidor, isInspector, isAdmin][i]
  )
}
