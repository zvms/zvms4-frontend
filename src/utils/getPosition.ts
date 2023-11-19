export function getUserPosition(permission: number) {
  /**
   * 1. Student - 0
   * 2. Secretary - 1
   * 3. Auditor - 2
   * 4. Department - 4
   * 4. Inspector - 8
   * 5. Admin - 16
   * 6. System - 32
   * Stackable, Unique
   */
  const isStudent = true
  const isSecretary = permission & 1
  const isDepartment = permission & 2
  const isAutidor = permission & 4
  const isInspector = permission & 8
  const isAdmin = permission & 16
  const isSystem = permission & 32
  console.log(isStudent, isSecretary, isDepartment, isAutidor, isInspector, isAdmin, isSystem, permission)
  return ['student', 'secretary', 'department', 'auditor', 'inspector', 'admin', 'system'].filter(
    (_, i) => [isStudent, isSecretary, isDepartment, isAutidor, isInspector, isAdmin, isSystem][i]
  )
}
