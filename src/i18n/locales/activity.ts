export const enUS = {
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
    upload: 'Upload',
    supplement: 'Supplement'
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
    },
    hybrid: {
      name: 'Hybrid Activities',
      short: 'Hybrid',
      key: 'hybrid'
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
        confirm: 'After deletion, it will not be able to be restored, are you sure to delete?'
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
      duration: 'Duration'
    },
    batch: {
      classid: 'Class ID',
      members: 'Members',
      selected: '{count} members selected.',
      mode: 'Mode',
      duration: 'Duration'
    },
    or: 'OR',
    steps: {
      prev: 'Previous',
      next: 'Next'
    }
  },
  origins: {
    name: 'Origin',
    labor: {
      name: 'Labor',
      description:
        'Labor activities initiated by the school, typically involving physical or communal work, such as moving tables and chairs, setting up examination rooms, etc.'
    },
    organization: {
      name: 'Organization',
      description:
        'Participation in organizations formed by official student bodies or external groups. Only demanding roles are included, such as membership in the Student Union, orchestra, or competition-oriented clubs.'
    },
    tasks: {
      name: 'Tasks',
      description:
        'Assigned responsibilities or duties, often individual or in small groups. Typically includes roles like guiding students during exam periods.'
    },
    occasions: {
      name: 'Occasions',
      description:
        'Serving a role in ceremonial or commemorative events, such as the election, school anniversary, graduation, etc., including hoster, usher, etc.'
    },
    import: {
      name: 'Import',
      description: 'Data manually imported from legacy systems or external platforms.'
    },
    activities: {
      name: 'Activities',
      description:
        'Cultural and sports activities, primarily co-organized by the school and student bodies, such as judging sports meetings, basketball tournaments, etc.'
    },
    practice: {
      name: 'Practice',
      description:
        'Social practice-based events, usually off-campus, involving community service or similar contributions.'
    },
    club: {
      name: 'Club',
      description:
        'School-beneficial activities organized by clubs or interest groups, including debates, Rubik’s Cube competitions, concerts, and more.'
    },
    prize: {
      name: 'Prize',
      description:
        'Activities tied to awards or recognitions, from school-level to international, depending on the relevant regulations. The recording mode can be selected as either on-campus or off-campus.'
    },
    other: {
      name: 'Other',
      description: 'Activities that do not fall under any predefined category.'
    }
  },
  creating_guide: {
    info: {
      next: 'By clicking "Next," you will directly register the activity, and modify the member list in the next page. Please ensure that the information is accurate and complete.'
    },
    check: {
      created: 'Activity created. The activity will be reviewed next.',
      allowed:
        'Please review the activity carefully. If it requires an application form, link it using the Form ID (if available). The form must be signed by both the student and the supervising teacher, with full names and final confirmation for volunteer credit.',
      disallowed:
        'You do not have permission to review this activity. It will be evaluated by the responsible members in the Department of Practice. Please wait patiently; you will be notified once the review is complete.'
    },
    print:
      'You can print the system-generated application form by clicking the "Print" button. However, we recommend using the official template and filling it out manually.'
  }
}

export const zhCN = {
  create: {
    normal: '录入义工',
    special: '特殊录入',
    merge: '合并义工',
    upload: '上传数据'
  },
  createMinimized: {
    normal: '录入',
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
      name: '社会实践',
      short: '社会实践',
      key: 'social-practice'
    },
    hybrid: {
      name: '特殊义工',
      short: '特殊',
      key: 'hybrid'
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
    details: '详情'
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
      duration: '时间'
    },
    batch: {
      classid: '班级',
      members: '成员',
      selected: '已添加 {count} 位成员。',
      mode: '模式',
      duration: '时长'
    },
    or: '或',
    steps: {
      prev: '上一步',
      next: '下一步'
    }
  },
  origins: {
    name: '来源',
    labor: {
      name: '体力劳动',
      description: '学校发起的劳动类活动，通常涉及体力或集体性工作，如搬桌椅、布置考场等。'
    },
    organization: {
      name: '学生组织',
      description:
        '参与由官方学生组织或外部团体组成的组织，通常包括学生会、铜管乐团等或以比赛为导向的社团，如领导力、模拟政协等。'
    },
    tasks: {
      name: '学校任务',
      description: '分配的责任或职责，通常是个人或小组形式，通常包括在考试期间引导学生等角色。'
    },
    occasions: {
      name: '学校活动',
      description:
        '在典礼或纪念活动中担任角色，如十佳选举、校庆、毕业典礼等，包括主持人、引导员等。'
    },
    import: {
      name: '数据导入',
      description: '从旧系统或外部平台手动导入的数据。'
    },
    activities: {
      name: '文体活动',
      description: '文体活动，主要由学校和学生组织共同主办，如运动会裁判、篮球赛等。'
    },
    practice: {
      name: '社会实践',
      description: '以社会实践为基础的活动，通常是校外的，涉及社区服务或类似的贡献。'
    },
    club: {
      name: '社团活动',
      description: '由社团或兴趣小组组织的有益于学校的活动，包括辩论、魔方比赛、音乐会等。'
    },
    prize: {
      name: '获奖义工',
      description:
        '与奖项或荣誉相关的活动，从校级到国际级，具体发放时间根据相关规定，可选择校内或校外计入模式。'
    },
    other: {
      name: '其他义工',
      description: '不属于任何预定义类别的活动。'
    }
  },
  creating_guide: {
    info: {
      next: '点击「下一步」将直接注册义工，成员列表在下一页修改，请确保信息准确完整。'
    },
    check: {
      created: '创建已完成，接下来将对该义工进行审核。',
      allowed:
        '请仔细检查义工信息，如果需要申请表，请链接表单 ID（若有）。表单必须由学生和相关老师签字，姓名完整，最终确认发放时间。',
      disallowed:
        '您没有权限审核此义工。它将由学生会的负责成员进行评估。请耐心等待，审核完成后会通知您。'
    },
    print: '您可以通过点击「打印」按钮打印系统生成的申请表，但我们建议使用官方模板并手动填写。'
  }
}
