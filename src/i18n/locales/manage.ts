export const enUS = {
  merge: {
    title: 'Merge Activity',
    form: {
      name: 'Name',
      type: 'Type',
      list: 'List',
      prompt: 'NOTE: Only activities that is the same type and is effective can be merged. You also need to ensure them in a same page,\n' +
        'otherwise the system will only merge the activities in the same page.',
      overwrite: 'Overwrite',
      overwriteInfo: 'If you enable this option, if there exists duplicated users in activities waiting to be merged, its result time will be the max one in one of existed activities; otherwise it will be the sum.',
      overwritePrompt: {
        yes: 'Yes',
        no: 'No'
      },
      action: 'Merge'
    }
  },
  groupList: {
    title: 'Group List',
    columns: {
      name: 'Name',
      permission: 'Permission',
      details: 'Details',
      search: 'Search'
    }
  },
  groupDetails: {
    tabs: {
      users: 'Users',
      activities: 'Activities',
      time: 'Time'
    },
    userList: {
      checkPasswordPrompt: 'Check if password modified',
      columns: {
        name: 'Name',
        id: 'ID',
        group: 'Group',
        classid: 'Class',
        permission: 'Permission',
        pwdm: 'Password Modified',
        details: 'Details',
        pwdmStatus: {
          true: 'Modified',
          false: 'Unmodified'
        },
        submit: 'Submit'
      }
    },
    timeList: {
      diff: 'Showing the time difference from meeting the standard',
      filled: 'Complete',
      diffed: '{time} hrs remaining'
    }
  },
  personalPanel: {
    tabs: {
      info: 'Info',
      activity: 'Activities',
      modify: 'Modify'
    },
    resetPassword: 'Reset the user\'s password to their ID',
    resetConfirm: 'Please confirm your action.',
  }
}

export const zhCN = {
  merge: {
    title: '合并义工',
    form: {
      name: '名称',
      type: '类型',
      list: '列表',
      prompt: '注意：只有类型相同且有效的活动才能被合并。您还需要确保它们在同一页，否则系统只会合并同一页的活动。',
      overwrite: '覆盖时间',
      overwriteInfo: '如果启用此选项，如果待合并的义工中存在重复用户，其结果时间将是现有义工中的最大时间；否则将是总和。',
      overwritePrompt: {
        yes: '是',
        no: '否'
      },
      action: '合并'
    }
  },
  groupList: {
    title: '群组列表',
    columns: {
      name: '名称',
      permission: '权限',
      details: '详细信息',
      search: '搜索'
    }
  },
  groupDetails: {
    tabs: {
      users: '用户',
      activities: '义工',
      time: '时间'
    },
    userList: {
      checkPasswordPrompt: '查看密码修改情况',
      columns: {
        name: '姓名',
        id: '学号',
        group: '群组',
        classid: '班级',
        permission: '权限',
        pwdm: '密码修改情况',
        details: '详细信息',
        pwdmStatus: {
          true: '已修改',
          false: '未修改'
        },
        submit: '提交'
      }
    },
    timeList: {
      diff: '查看与达标所差时间',
      filled: '已完成',
      diffed: '还差 {time} 小时'
    }
  },
  personalPanel: {
    tabs: {
      info: '信息',
      activity: '义工',
      modify: '修改'
    },
    resetPassword: '重置该用户密码为学号',
    resetConfirm: '请确认您的操作。',
  }
}
