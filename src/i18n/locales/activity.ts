export const enUS = {
  type: {
    specified: {
      name: 'On-Campus Activity',
      short: 'On Campus',
      key: 'specified',
      description:
        'On-Campus Activities are volunteers created by the administrator, posted as a recruitment, and need to specify the maximum number of people who can sign up for each class.'
    },
    social: {
      name: 'Off-Campus Activity',
      short: 'Off Campus',
      key: 'social',
      description:
        'Off-Campus Activities are volunteers that can be created by at least the secretary, and all participants must be designated at the time of creation. It is limited to volunteers on weekends and holidays off campus during the semester.'
    },
    scale: {
      name: 'Social Practice Activity',
      short: 'Social Practice',
      key: 'scale',
      description:
        'Social Practice Activities are volunteers that can be created by anyone in Jan - Mar, Jul - Oct, and all participants must be designated at the time of creation. It is limited to social volunteers during winter and summer vacation according to the scale notification file of the school.'
    },
    special: {
      name: 'Special Record',
      short: 'Special',
      key: 'special',
      description:
        'Special Activities are volunteers created by administrators for contest winners, large scales, etc. Participants are not required to submit the impression.'
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
          'After deletion, including impressions and other data, it will not be able to be restored, are you sure to delete?'
      },
      modification: {
        status: 'Modify the status of {activity}',
        effective: 'Approve',
        refused: 'Deny',
        confirm: 'Please confirm the modification of the status of the activity.'
      },
      refresh: 'Refresh'
    },
    details: 'Details',
    impression: 'Impression',
    image: 'Image'
  },
  units: {
    item: 'item | item | items',
    hour: 'hour | hour | hours',
    word: 'word | word | words',
    person: 'person | person | people'
  },
  image: {
    upload: {
      name: 'Upload',
      prompt: 'Click or drag images here to upload',
      allow: 'Allow only {type} image'
    },
    select: {
      name: 'Select'
    },
    empty: {
      name: 'Empty'
    }
  },
  impression: {
    write: 'Write',
    name: 'Impression',
    reward: 'Reward',
    actions: {
      write: 'Write',
      reflect: 'Reflect',
      view: 'View'
    },
    page: {
      write: {
        title: 'Write Impression',
        view: 'View Impression',
        mine: 'My Impression',
        prompt: 'Please write your impression here',
        type: 'Type',
        actions: {
          submit: 'Submit',
          cancel: 'Cancel',
          save: 'Save'
        }
      },
      reflect: {
        title: 'Reflect Impression',
        reward: 'Reward',
        actions: {
          approve: 'Approve',
          reject: 'Reject',
          refuse: 'Refuse',
          check: 'Refusal will be publicized to the entire school, irrevocable, time uncountable.'
        },
        prompt: 'Impression written by {name}',
        history: {
          title: 'History',
          empty: 'No history'
        }
      }
    }
  },
  registration: {
    name: 'Registration',
    title: 'Register for Specified Activity',
    deadline: 'Deadline',
    location: 'Location',
    approver: 'Approver',
    approvers: {
      authority: 'Authority',
      member: 'Member'
    },
    ticket: 'Ticket ID',
    class: 'Class(es) | Class | Classes',
    count: ' person registered |  person registered | people registered',
    single: {
      class: 'Class',
      min: 'Min',
      max: 'Max'
    },
    remain: {
      time: 'Remain Time',
      position: 'Remain Position'
    },
    status: {
      title: 'Status',
      registered: 'Registered',
      unregistered: 'Unregistered',
      unregisterable: 'Unregisterable'
    },
    actions: {
      register: 'Register',
      unregister: 'Unregister',
      back: 'Back'
    }
  },
  special: {
    classify: {
      name: 'Classify',
      prize: 'Prize',
      import: 'Import',
      club: 'Group',
      deduction: 'Deduction',
      other: 'Other'
    },
    prize: {
      name: 'Prize',
      level: {
        name: 'Level',
        district: 'District',
        city: 'City',
        province: 'Province',
        national: 'National',
        international: 'International'
      },
      type: {
        name: 'Type',
        personal: 'Personal',
        team: 'Team'
      },
      classify: {
        name: 'Classify',
        sports: 'Sports',
        academy: 'Academy',
        art: 'Art',
        other: 'Other'
      },
      ranking: {
        levels: {
          above: 'Above than First Prize',
          first: 'First Prize',
          second: 'Second Prize',
          third: 'Third Prize'
        },
        ranking: {
          name: 'Ranking',
          rank: 'Rank {start} - {end}'
        }
      }
    }
  },
  status: {
    title: 'Status',
    registered: 'Registered',
    draft: 'Draft',
    refused: 'Refused',
    pending: 'Pending',
    effective: 'Effective',
    rejected: 'Rejected',
    steps: {
      first: 'First',
      last: 'Last'
    }
  },
  history: {
    name: 'History',
    title: "History of {name}'s Impression",
    empty: 'No History'
  },
  member: {
    name: 'Name',
    status: 'Status',
    class: 'Class',
    impression: 'Impression',
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
      },
      register: {
        name: 'Activities to Register',
        short: 'Register'
      },
      trophy: {
        name: 'Activities to Reward',
        short: 'Reward'
      }
    }
  },
  trophy: {
    name: 'Reward',
    create: 'Create Reward',
    field: {
      name: 'Name',
      type: 'Type',
      level: 'Level',
      awards: 'Award | Award | Awards',
      team: 'Team'
    },
    type: {
      academic: 'Academic',
      art: 'Art',
      sports: 'Sports',
      others: 'Others'
    },
    level: {
      district: 'District',
      city: 'City',
      province: 'Province',
      national: 'National',
      international: 'International'
    },
    auto: 'Auto Create Awards',
    instructor: 'Instructor'
  },
  export: {
    name: 'Export',
    title: 'Export Data',
    range: 'Range',
    format: 'Format',
    formats: {
      json: {
        name: 'JSON',
        short: 'JSON',
        explain: 'JavaScript Object Notation'
      },
      csv: {
        name: 'CSV',
        short: 'CSV',
        explain: 'Comma-Separated Values'
      },
      xlsx: {
        name: 'Excel',
        short: 'Excel',
        explain: 'Microsoft Excel'
      }
    },
    actions: {
      export: 'Export',
      download: 'Download'
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
    actions: {
      submit: '提交',
      cancel: '取消',
      modify: '修改',
      save: '保存',
      reset: '重置',
      delete: {
        name: '删除',
        confirm: '删除后包括感想等数据皆不可恢复，确定删除？'
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
    impression: '感想',
    image: '图片'
  },
  units: {
    item: '项',
    hour: '小时',
    word: '字',
    person: '人'
  },
  image: {
    upload: {
      name: '上传',
      prompt: '点击或拖拽图片到此区域上传',
      allow: '仅允许 {type} 图片'
    },
    select: {
      name: '选择'
    },
    empty: {
      name: '无图片'
    }
  },
  impression: {
    write: '填写',
    name: '感想',
    reward: '奖励',
    actions: {
      write: '填写',
      reflect: '审批',
      view: '查看'
    },
    page: {
      write: {
        title: '填写感想',
        view: '查看感想',
        mine: '我的感想',
        prompt: '请在此填写感想',
        type: '类型',
        actions: {
          submit: '提交',
          cancel: '取消',
          save: '保存'
        }
      },
      reflect: {
        title: '审批感想',
        reward: '获得义工时间',
        actions: {
          approve: '接受',
          reject: '驳回',
          refuse: '拒绝',
          check: '拒绝将会公开到全校，不可撤销，不可计入时间。'
        },
        prompt: '{name}的义工感想',
        history: {
          title: '历史',
          empty: '无历史'
        }
      }
    }
  },
  registration: {
    name: '报名',
    title: '报名指定义工',
    deadline: '截止日期',
    location: '地点',
    approver: '审批人',
    approvers: {
      authority: '学校团委',
      member: '部门成员'
    },
    ticket: '申请单号',
    class: '班级',
    count: '人已报名',
    single: {
      class: '班级',
      min: '最小',
      max: '最大'
    },
    remain: {
      time: '剩余时间',
      position: '剩余位置'
    },
    status: {
      title: '状态',
      registered: '已报名',
      unregistered: '未报名',
      unregisterable: '不可报名'
    },
    actions: {
      register: '报名',
      unregister: '取消报名',
      back: '返回'
    }
  },
  special: {
    classify: {
      name: '分类',
      prize: '获奖',
      import: '导入',
      club: '团体',
      deduction: '扣分',
      other: '其他'
    },
    prize: {
      name: '获奖',
      level: {
        name: '级别',
        district: '区级',
        city: '市级',
        province: '省级',
        national: '国家级',
        international: '国际级'
      },
      type: {
        name: '类型',
        personal: '个人',
        team: '团队'
      },
      classify: {
        name: '分类',
        sports: '体育',
        academy: '学科',
        art: '艺术',
        other: '其他'
      },
      ranking: {
        levels: {
          above: '一等奖以上',
          first: '一等奖',
          second: '二等奖',
          third: '三等奖'
        },
        ranking: {
          name: '名次',
          rank: '第 {start} - {end} 名'
        }
      }
    }
  },
  status: {
    title: '状态',
    draft: '草稿',
    pending: '审核中',
    effective: '有效',
    rejected: '驳回',
    refused: '拒绝',
    steps: {
      first: '初审',
      last: '终审'
    }
  },
  history: {
    name: '历史',
    title: '{name}的义工感想历史',
    empty: '无历史'
  },
  member: {
    name: '姓名',
    status: '状态',
    class: '班级',
    impression: '感想',
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
      },
      register: {
        name: '报名义工',
        short: '报名'
      },
      trophy: {
        name: '获奖义工',
        short: '获奖'
      }
    }
  },
  trophy: {
    name: '获奖',
    create: '创建获奖',
    field: {
      name: '名称',
      type: '类型',
      level: '级别',
      awards: '奖项',
      team: '团队'
    },
    type: {
      academic: '学科',
      art: '艺术',
      sports: '体育',
      others: '其他'
    },
    level: {
      district: '区级',
      city: '市级',
      province: '省级',
      national: '国家级',
      international: '国际级'
    },
    auto: '自动创建奖项',
    instructor: '指导老师'
  },
  export: {
    name: '导出',
    title: '导出数据',
    range: '范围',
    format: '格式',
    formats: {
      json: {
        name: 'JSON',
        short: 'JSON',
        explain: 'JavaScript 对象表示法'
      },
      csv: {
        name: 'CSV',
        short: 'CSV',
        explain: '逗号分隔值'
      },
      xlsx: {
        name: 'Excel',
        short: 'Excel',
        explain: 'Microsoft Excel'
      }
    },
    actions: {
      export: '导出',
      download: '下载'
    }
  }
}
