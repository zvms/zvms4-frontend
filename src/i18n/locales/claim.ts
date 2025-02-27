export const enUS = {
  activity: {
    status: {
      pending: {
        secretary:
          "This activity is pending for secretary's approval, please contact your class secretary if you have any questions",
        department:
          "This activity is pending for department's approval, please contact the department member if you have any questions"
      },
      effective: 'This activity is effective, you can sign up, get the time and so on',
      refused:
        'This activity is refused, you can create a new one or contact the responsible person'
    },
    type: {
      specified:
        'This activity is specified. It is created by the class secretary or department member, usually recorded as on-campus time',
      social:
        'This activity is social. It is created by the student or class secretary, usually recorded as off-campus time',
      practice:
        'This activity is practice. It is created by the department member, usually recorded as social practice time',
      special:
        'This activity is special. It is created by the department member, usually recorded as on-campus, off-campus or social practice time'
    }
  },
  activityMember: {
    status: {
      draft:
        'You have signed up for this activity, please fill in the feelings as soon as possible, otherwise you will lose the time',
      pending:
        'Your feelings are pending for approval, please contact the department member if you have any questions',
      rejected: 'Your feelings are rejected, you can fill in again',
      effective: 'Your feelings are approved, thank you for your participation',
      refused: 'Your feelings are refused, you need to contact the responsible person'
    },
    mode: {
      'on-campus':
        "This activity is recorded as on-campus time, you can use the school's tablet to fill in the feelings",
      'off-campus':
        'This activity is recorded as off-campus time, you may need to upload photos as proof when filling in the feelings',
      'social-practice':
        'This activity is social practice, you need to submit the relevant materials to the department as proof'
    }
  },
  trophy: {
    status: {
      pending:
        "This trophy is pending for department's approval, please contact the department member if you have any questions",
      effective:
        "This trophy is effective, you can sign up, and get the time after the final teacher's approval",
      refused: 'This trophy is refused, you can create a new one or contact the responsible person'
    },
    type: {
      academic:
        'This trophy is academic, usually for math, physics, chemistry, biology, information, astronomy and other academic competitions',
      sports:
        'This trophy is sports, usually for basketball, football, track and field, swimming, table tennis, badminton and other sports competitions',
      art: 'This trophy is art, usually for dance, singing, calligraphy, painting, photography, design and other art competitions',
      others: 'This trophy is other, please fill in the details'
    },
    level: {
      district: 'This trophy is district level',
      city: 'This trophy is city level',
      province: 'This trophy is province level',
      national: 'This trophy is national level',
      international: 'This trophy is international level'
    },
    statement:
      'According to the regulations, the total number of hours of volunteer work for an individual student in the award category is limited to 10 hours. Your remaining creditable time is {time} hours.',
    prompt:
      'Individuals who receive awards can be credited as on-campus or off-campus volunteers at the time of each award if they so desire, and the award information cannot be changed after the time of crediting is reported.'
  }
}

export const zhCN = {
  activity: {
    status: {
      pending: {
        secretary: '该义工正在审核中, 若有问题请联系班级团支书',
        department: '该义工正在审核中, 若有问题请联系实践部成员'
      },
      effective: '该义工已经生效, 可以正常报名, 发放义工时间等',
      refused: '该义工已被拒绝. 您可以重新创建并提交申请, 或者联系相关负责人'
    },
    type: {
      specified:
        '该义工为指定义工, 由团支书 (需要审核) 或实践部成员进行创建, 一般记入为校内义工时间',
      social:
        '该义工为社会义工, 可由学生自行创建组织 (需要审核) 或团支书创建, 一般记入为校外义工时间',
      practice:
        '该义工为社会实践, 由实践部成员创建可选择项并由个人组队填报, 一般记入为社会实践时间',
      special: '该义工为特殊义工, 由实践部成员创建, 可自由记入为校内, 校外或者社会实践义工时间'
    }
  },
  activityMember: {
    status: {
      draft: '您已经报名该义工, 请尽快填写感想, 逾期未填写将会被取消获得义工时间的资格',
      pending: '该义工感想正在审核, 若有问题请联系义管会审计部成员',
      rejected: '您的义工感想已被打回, 您可以重新填写',
      effective: '您的义工感想已通过审核, 感谢您的参与',
      refused: '您的义工感想已被拒绝, 您需要联系相关负责人, 不可重新提交'
    },
    mode: {
      'on-campus': '该义工为校内义工时间记入, 您可以使用学校平板填写感想',
      'off-campus': '该义工为校外义工时间记入, 您在校外填写感想时可能需要上传照片作为证明',
      'social-practice': '该义工为社会实践, 您需要给予相关材料至实践部作为证明材料'
    }
  },
  trophy: {
    status: {
      pending: '该比赛信息正在审核中, 若有问题请联系实践部成员',
      effective: '该比赛信息已通过审核, 您可以正常报名, 并在最终带队老师审核后获得相应的时间',
      refused: '该比赛信息已被拒绝, 您可以重新创建并提交申请, 或者联系相关负责人'
    },
    type: {
      academic: '该比赛为学科类比赛, 一般为数学, 物理, 化学, 生物, 信息, 天文等学科竞赛',
      sports: '该比赛为体育类比赛, 一般为篮球, 足球, 田径, 游泳, 乒乓球, 羽毛球等体育竞赛',
      art: '该比赛为艺术类比赛, 一般为舞蹈, 歌唱, 书法, 绘画, 摄影, 设计等艺术竞赛',
      others: '该比赛为其他类比赛, 您需要填写明确'
    },
    level: {
      district: '该比赛为区级比赛',
      city: '该比赛为市级比赛',
      province: '该比赛为省级比赛',
      national: '该比赛为国家级比赛',
      international: '该比赛为国际级比赛'
    },
    statement:
      '根据规定，单个学生个人获奖类义工总时长不超过 10 小时。您剩余可计入时数为 {time} 小时。',
    prompt: '获奖者可在每次获奖时选择记入校内或校外义工时间，记入后不可更改获奖信息。'
  }
}
