export const enUS = {
  type: {
    specified: {
      name: 'On-Campus Activity',
      short: 'On Campus',
      key: 'specified',
    description: ''
    },
    social: {
      name: 'Off-Campus Activity',
      short: 'Off Campus',
      key: 'social',
      description: ''
    },
    scale: {
      name: 'Social Practice Activity',
      short: 'Social Practice',
      key: 'scale',
      description: ''
    },
    special: {
      name: 'Special Record',
      short: 'Special',
      key: 'special',
      description: ''
     },
    unknown: 'Unknown'
  },
  create: {
    normal: 'Normal Activity',
    special: 'Special Record',
    merge: 'Merge Activities',
    upload: 'Upload Data'
  },
  createMinimized: {
    normal: 'Normal',
    special: 'Special',
    merge: 'Merge',
    upload: 'Upload'
  },
  mode: {
    'on-campus': {
      name: 'On Campus Activities',
      short: 'On Campus',
      key: 'on-campus'
    },
    'off-campus': {
      name: 'Off Campus Activities',
      short: 'Off Campus',
      key: 'off-campus'
    },
    'social-practice': {
      name: 'Social Practice Activities',
      short: 'Social Practice',
      key: 'social-practice'
    }
  },
  form: {
    type: 'Type',
    title: '{create} {type}',
    name: 'Name',
    description: 'Description',
    date: 'Date',
    mode: 'Mode',
    person: 'Member(s) | Member | Members',
    class: 'Class(es) | Class | Classes',
    duration: 'Duration',
    classify: 'Classify',
    pending: 'Pending',
    detail: 'Detail',
    unnamed: 'Unnamed',
    upload: {
      name: 'Upload',
      prompt: 'Click or drag file to this area to upload',
      allow: 'Allow only {type} file'
    },
    actions: {
      submit: 'Submit',
      cancel: 'Cancel',
      modify: 'Modify',
      save: 'Save',
      reset: 'Reset',
      delete: {
        name: 'Delete',
        confirm:
          'After deletion, it will not be able to be restored, are you sure to delete?'
      },
      modification: {
        status: 'Modify the status of {activity}',
        effective: 'Approve',
        refused: 'Deny',
        confirm: 'Please confirm the modification of the status of the activity.'
      },
      refresh: 'Refresh'
    },
    details: 'Details'
  },
  units: {
    item: 'item | item | items',
    hour: 'hour | hour | hours',
    word: 'word | word | words',
    person: 'person | person | people'
  },
  impression: {
    name: 'Record',
    actions: {
      view: 'View'
    }
  },
  registration: {
    location: 'Location',
    approver: 'Approver',
    approvers: {
      authority: 'Authority',
      member: 'Member'
    },
    status: {
      title: 'Status'
    }
  },
  special: {
    classify: {
      name: 'Classify',
      prize: 'Prize',
      import: 'Import',
      club: 'Group',
      other: 'Other'
    }
  },
  status: {
    title: 'Status',
    refused: 'Refused',
    pending: 'Pending',
    effective: 'Effective'
  },
  member: {
    name: 'Name',
    status: 'Status',
    class: 'Class',
    dialog: {
      title: 'Member List of {name}',
      actions: {
        name: 'Actions',
        add: 'Add',
        remove: 'Remove',
        confirm: 'After removal, it will not be able to be restored, are you sure to remove?',
        title: 'Append Member to {activity}'
      }
    }
  },
  view: {
    panels: {
      mine: {
        name: 'My Activities',
        short: 'Mine'
      },
      class: {
        name: 'Activities Related to Class',
        short: 'Class'
      },
      campus: {
        name: 'All Activities',
        short: 'All'
      }
    }
  },
  export: {
    name: 'Export',
    title: 'Export Data',
    actions: {
      export: 'Export',
      download: 'Download'
    }
  },
  batch: {
    batch_import: 'Batch Import',
    manual: {
      member: 'Member',
      mode: 'Mode',
      duration: 'Duration',
    },
    batch: {
      classid: 'Class ID',
      members: 'Members',
      selected: '{count} members selected.',
      mode: 'Mode',
      duration: 'Duration',
    },
    or: 'OR',
    steps: {
      prev: 'Previous',
      next: 'Next'
    }
  }
}

export const zhCN = {
  type: {
    specified: {
      name: '校内义工',
      short: '校内',
      key: 'specified',
      description: ''
    },
    social: {
      name: '校外义工',
      short: '校外',
      key: 'social',
      description: ''
    },
    scale: {
      name: '社会实践义工',
      short: '社会实践',
      key: 'scale',
      description: ''
    },
    special: {
      name: '特殊录入',
      short: '特殊',
      key: 'special',
      description: ''
    }
  },
  create: {
    normal: '普通义工',
    special: '特殊录入',
    merge: '合并义工',
    upload: '上传数据'
  },
  createMinimized: {
    normal: '普通',
    special: '特殊',
    merge: '合并',
    upload: '上传'
  },
  mode: {
    'on-campus': {
      name: '校内义工',
      short: '校内',
      key: 'on-campus'
    },
    'off-campus': {
      name: '校外义工',
      short: '校外',
      key: 'off-campus'
    },
    'social-practice': {
      name: '社会实践义工',
      short: '社会实践',
      key: 'social-practice'
    }
  },
  form: {
    type: '类型',
    title: '{create} {type}',
    name: '名称',
    description: '描述',
    date: '日期',
    mode: '模式',
    person: '成员',
    class: '班级',
    duration: '时长',
    classify: '分类',
    pending: '等待审核',
    detail: '详细信息',
    unnamed: '未命名',
    actions: {
      submit: '提交',
      cancel: '取消',
      modify: '修改',
      save: '保存',
      reset: '重置',
      delete: {
        name: '删除',
        confirm: '删除后数据皆不可恢复，确定删除？'
      },
      modification: {
        status: '修改义工 {activity} 的状态',
        effective: '批准',
        refused: '拒绝',
        confirm: '请确认对义工状态的修改'
      },
      refresh: '刷新'
    },
    upload: {
      name: '上传',
      prompt: '点击或拖拽文件到此区域上传',
      allow: '仅允许 {type} 文件'
    },
    details: '详情',
  },
  units: {
    item: '项',
    hour: '小时',
    person: '人'
  },
  impression: {
    name: '记录',
    actions: {
      view: '查看'
    }
  },
  registration: {
    location: '地点',
    approver: '审批人',
    approvers: {
      authority: '学校团委',
      member: '部门成员'
    },
    status: {
      title: '状态'
    }
  },
  special: {
    classify: {
      name: '分类',
      prize: '获奖',
      import: '导入',
      club: '团体',
      other: '其他'
    }
  },
  status: {
    title: '状态',
    pending: '审核中',
    effective: '有效',
    refused: '拒绝'
  },
  member: {
    name: '姓名',
    status: '状态',
    class: '班级',
    dialog: {
      title: '{name}的成员列表',
      actions: {
        name: '操作',
        add: '添加',
        remove: '移除',
        confirm: '移除后将不可恢复，确定移除？',
        title: '添加成员至{activity}'
      }
    }
  },
  view: {
    panels: {
      mine: {
        name: '我的义工',
        short: '我的'
      },
      class: {
        name: '班级义工',
        short: '班级'
      },
      campus: {
        name: '全部义工',
        short: '全部'
      }
    }
  },
  export: {
    name: '导出',
    title: '导出数据',
    actions: {
      export: '导出',
      download: '下载'
    }
  },
  batch: {
    batch_import: '批量导入',
    manual: {
      member: '成员',
      mode: '模式',
      duration: '时间',
    },
    batch: {
      classid: '班级',
      members: '成员',
      selected: '已添加 {count} 位成员。',
      mode: '模式',
      duration: '时长',
    },
    or: '或',
    steps: {
      prev: '上一步',
      next: '下一步'
    }
  }
}
