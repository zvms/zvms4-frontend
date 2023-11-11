export const enUS = {
  type: {
    specified: {
      name: 'Specified Activity',
      short: 'Specified',
      key: 'specified',
      description:
        'Specified Activities are volunteers created by the administrator, posted as a recruitment, and need to specify the maximum number of people who can sign up for each class.'
    },
    social: {
      name: 'Social Activity',
      short: 'Social',
      key: 'social',
      description:
        'Social Activities are volunteers that can be created by at least the secretary, and all participants must be designated at the time of creation. It is limited to volunteers on weekends and holidays off campus during the semester.'
    },
    scale: {
      name: 'Scale Activity',
      short: 'Scale',
      key: 'scale',
      description:
        'Scale Activities are volunteers that can be created by anyone in Jan - Mar, Jul - Oct, and all participants must be designated at the time of creation. It is limited to social volunteers during winter and summer vacation according to the scale broadcast file of the school.'
    },
    special: {
      name: 'Special Activity',
      short: 'Special',
      key: 'special',
      description:
        'Special Activities are volunteers created by administrators for contest winners, large scales, etc. Participants are not required to submit the impression.'
    },
    unknown: 'Unknown'
  },
  classify: {
    'on-campus': {
      name: 'Activities on Campus',
      short: 'On Campus',
      key: 'on-campus'
    },
    'off-campus': {
      name: 'Activities off Campus',
      short: 'Off Campus',
      key: 'off-campus'
    },
    'large-scale': {
      name: 'Scale Practice during Vacation',
      short: 'Scale',
      key: 'large-scale'
    }
  },
  form: {
    type: 'Type',
    title: '{create} {type}',
    name: 'Name',
    description: 'Description',
    date: 'Date',
    person: 'Member(s) | Member | Members',
    class: 'Class(es) | Class | Classes',
    duration: 'Duration',
    classify: 'Classify',
    pending: 'Pending',
  },
  units: {
    item: 'item | item | items',
    hour: 'hour | hour | hours',
    word: 'word | word | words'
  },
  impression: {
    write: 'Write',
    name: 'Impression',
    reward: 'Reward',
    actions: {
      write: 'Write',
      reflect: 'Reflect'
    },
    page: {
      write: {
        title: 'Write Impression',
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
        prompt: 'by {name}',
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
    class: 'Class(es) | Class | Classes',
    count: ' person registered |  person registered | people registered',
    singe: {
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
      prize: 'Prize',
      import: 'Import',
      club: 'Club',
      deduction: 'Deduction',
      other: 'Other'
    },
    prize: {
      level: {
        district: 'District',
        city: 'City',
        province: 'Province',
        national: 'National',
        international: 'International'
      },
      type: {
        personal: 'Personal',
        team: 'Team'
      },
      classify: {
        sports: 'Sports',
        academy: 'Academy',
        art: 'Art',
        other: 'Other'
      }
    }
  },
  status: {
    title: 'Status',
    registered: 'Registered',
    draft: 'Draft',
    'first-instance': 'First Instance',
    'first-instance-rejected': 'First Instance Rejected',
    'last-instance': 'Last Instance',
    'last-instance-rejected': 'Last Instance Rejected',
    effective: 'Effective',
    rejected: 'Rejected'
  }
}

export const zhCN = {
  type: {
    specified: {
      name: '指定义工',
      short: '指定',
      key: 'specified',
      description:
        '指定义工是由管理员创建，发布为招募的义工，需要指定每个班级可以报名的人数上限。'
    },
    social: {
      name: '社会义工',
      short: '社会',
      key: 'social',
      description:
        '社会义工是由团支书以上的人员可以创建，创建时需要指定所有参与人员，仅限于在学期内周末节假日校外的义工。'
    },
    scale: {
      name: '规模义工',
      short: '规模',
      key: 'scale',
      description:
        '规模义工是由任何人都可以创建，创建时需要指定所有参与人员，仅限于在寒暑假期间根据学校文件的社会实践。'
    },
    special: {
      name: '特殊义工',
      short: '特殊',
      key: 'special',
      description:
        '特殊义工是由管理员创建的比赛获奖、社团活动统计的义工等，参与人员不需要提交感想。'
    }
  },
  classify: {
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
    'large-scale': {
      name: '大型实践',
      short: '实践',
      key: 'large-scale'
    }
  },
  form: {
    type: '类型',
    title: '{create} {type}',
    name: '名称',
    description: '描述',
    date: '日期',
    person: '成员',
    class: '班级',
    duration: '时长',
    classify: '分类',
    pending: '等待审核',
  },
  units: {
    item: '项',
    hour: '小时',
    word: '字'
  },
  impression: {
    write: '填写',
    name: '感想',
    reward: '奖励',
    actions: {
      write: '填写',
      reflect: '反馈'
    },
    page: {
      write: {
        title: '填写感想',
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
        prompt: '来自 {name} 的义工感想',
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
    class: '班级',
    count: '人已报名',
    singe: {
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
      prize: '获奖',
      import: '数据导入',
      club: '社团',
      deduction: '扣分',
      other: '其他'
    },
    prize: {
      level: {
        district: '区级',
        city: '市级',
        province: '省级',
        national: '国家级',
        international: '国际级'
      },
      type: {
        personal: '个人',
        team: '团队'
      },
      classify: {
        sports: '体育',
        academy: '学科',
        art: '艺术',
        other: '其他'
      }
    }
  },
  status: {
    title: '状态',
    registered: '已报名',
    draft: '草稿',
    'first-instance': '初审中',
    'first-instance-rejected': '初审驳回',
    'last-instance': '终审中',
    'last-instance-rejected': '终审驳回',
    effective: '有效',
    rejected: '拒绝'
  }
}
