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
  mode: {
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
    upload: {
      name: 'Upload',
      prompt: 'Click or drag file to this area to upload',
      allow: 'Allow only {type} file'
    },
    actions: {
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      reset: 'Reset'
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
      prompt: 'Click or drag image to this area to upload',
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
      club: 'Club',
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
  }
}

export const zhCN = {
  type: {
    specified: {
      name: '指定义工',
      short: '指定',
      key: 'specified',
      description: '指定义工是由管理员创建，发布为招募的义工，需要指定每个班级可以报名的人数上限。'
    },
    social: {
      name: '社会义工',
      short: '社会',
      key: 'social',
      description:
        '社会义工是由团支书以上的人员可以创建，创建时需要指定所有参与人员，仅限于在学期内周末节假日校外的义工。'
    },
    scale: {
      name: '实践义工',
      short: '实践',
      key: 'scale',
      description:
        '实践义工是由任何人都可以创建，创建时需要指定所有参与人员，仅限于在寒暑假期间根据学校文件的社会实践。'
    },
    special: {
      name: '特殊义工',
      short: '特殊',
      key: 'special',
      description:
        '特殊义工是由管理员创建的比赛获奖、社团活动统计的义工等，参与人员不需要提交感想。'
    }
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
    actions: {
      submit: '提交',
      cancel: '取消',
      save: '保存',
      reset: '重置'
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
      club: '社团',
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
  }
}

export const zhTW = {
  type: {
    specified: {
      name: '指定義工',
      short: '指定',
      key: 'specified',
      description: '指定義工是由管理員創建，發布為招募的義工，需要指定每個班級可以報名的人數上限。'
    },
    social: {
      name: '社會義工',
      short: '社會',
      key: 'social',
      description:
        '社會義工是由團支書以上的人員可以創建，創建時需要指定所有參與人員，僅限於在學期內週末節假日校外的義工。'
    },
    scale: {
      name: '實踐義工',
      short: '實踐',
      key: 'scale',
      description:
        '實踐義工是由任何人都可以創建，創建時需要指定所有參與人員，僅限於在寒暑假期間根據學校文件的社會實踐。'
    },
    special: {
      name: '特殊義工',
      short: '特殊',
      key: 'special',
      description:
        '特殊義工是由管理員創建的比賽獲獎、社團活動統計的義工等，參與人員不需要提交感想。'
    },
    unknown: '未知'
  },
  mode: {
    'on-campus': {
      name: '校內義工',
      short: '校內',
      key: 'on-campus'
    },
    'off-campus': {
      name: '校外義工',
      short: '校外',
      key: 'off-campus'
    },
    'large-scale': {
      name: '大型實踐',
      short: '實踐',
      key: 'large-scale'
    }
  },
  form: {
    type: '類型',
    title: '{create} {type}',
    name: '名稱',
    description: '描述',
    date: '日期',
    person: '成員',
    class: '班級',
    duration: '時長',
    classify: '分類',
    pending: '等待審核',
    actions: {
      submit: '提交',
      cancel: '取消',
      save: '保存',
      reset: '重置'
    },
    upload: {
      name: '上傳',
      prompt: '點擊或拖拽文件到此區域上傳',
      allow: '僅允許 {type} 文件'
    },
    details: '詳情',
    impression: '感想',
    image: '圖片'
  },
  units: {
    item: '項',
    hour: '小時',
    word: '字',
    person: '人'
  },
  image: {
    upload: {
      name: '上傳',
      prompt: '點擊或拖拽圖片到此區域上傳',
      allow: '僅允許 {type} 圖片'
    },
    select: {
      name: '選擇'
    },
    empty: {
      name: '無圖片'
    }
  },
  impression: {
    write: '填寫',
    name: '感想',
    reward: '獎勵',
    actions: {
      write: '填寫',
      reflect: '審批',
      view: '查看'
    },
    page: {
      write: {
        title: '填寫感想',
        view: '查看感想',
        mine: '我的感想',
        prompt: '請在此填寫感想',
        type: '類型',
        actions: {
          submit: '提交',
          cancel: '取消',
          save: '保存'
        }
      },
      reflect: {
        title: '審批感想',
        reward: '獲得義工時間',
        actions: {
          approve: '接受',
          reject: '駁回',
          refuse: '拒絕',
          check: '拒絕將會公開到全校，不可撤銷，不可計入時間。'
        },
        prompt: '{name}的義工感想',
        history: {
          title: '歷史',
          empty: '無歷史'
        }
      }
    }
  },
  registration: {
    name: '報名',
    title: '報名指定義工',
    deadline: '截止日期',
    location: '地點',
    class: '班級',
    count: '人已報名',
    single: {
      class: '班級',
      min: '最小',
      max: '最大'
    },
    remain: {
      time: '剩餘時間',
      position: '剩餘位置'
    },
    status: {
      title: '狀態',
      registered: '已報名',
      unregistered: '未報名',
      unregisterable: '不可報名'
    },
    actions: {
      register: '報名',
      unregister: '取消報名',
      back: '返回'
    }
  },
  special: {
    classify: {
      name: '分類',
      prize: '獲獎',
      import: '導入',
      club: '社團',
      deduction: '扣分',
      other: '其他'
    },
    prize: {
      name: '獲獎',
      level: {
        name: '級別',
        district: '區級',
        city: '市級',
        province: '省級',
        national: '國家級',
        international: '國際級'
      },
      type: {
        name: '類型',
        personal: '個人',
        team: '團隊'
      },
      classify: {
        name: '分類',
        sports: '體育',
        academy: '學科',
        art: '藝術',
        other: '其他'
      },
      ranking: {
        levels: {
          above: '一等獎以上',
          first: '一等獎',
          second: '二等獎',
          third: '三等獎'
        },
        ranking: {
          name: '名次',
          rank: '第 {start} - {end} 名'
        }
      }
    }
  },
  status: {
    title: '狀態',
    draft: '草稿',
    rejected: '駁回',
    pending: '審核中',
    refused: '拒絕',
    effective: '有效',
    steps: {
      first: '初審',
      last: '終審'
    }
  }
}

export const jaJP = {
  type: {
    specified: {
      name: '指定ボランティア',
      short: '指定',
      key: 'specified',
      description:
        '指定ボランティアは管理者によって作成され、募集として公開され、各クラスの登録可能人数の上限を指定する必要があります。'
    },
    social: {
      name: '社会ボランティア',
      short: '社会',
      key: 'social',
      description:
        '社会ボランティアは、団支書以上の人が作成でき、作成時にはすべての参加者を指定する必要があります。学期中の週末や休日に校外でのみ行われます。'
    },
    scale: {
      name: '実践ボランティア',
      short: '実践',
      key: 'scale',
      description:
        '実践ボランティアは誰でも作成でき、作成時にはすべての参加者を指定する必要があります。寒暑休み中には、学校のファイルに基づいて社会実践が制限されます。'
    },
    special: {
      name: '特殊ボランティア',
      short: '特殊',
      key: 'special',
      description:
        '特殊ボランティアは、管理者によって作成されたコンテストの受賞者、大規模なものなどのボランティアです。参加者は感想を提出する必要はありません。'
    },
    unknown: '未知'
  },
  mode: {
    'on-campus': {
      name: '校内ボランティア',
      short: '校内',
      key: 'on-campus'
    },
    'off-campus': {
      name: '校外ボランティア',
      short: '校外',
      key: 'off-campus'
    },
    'large-scale': {
      name: '大型実践',
      short: '実践',
      key: 'large-scale'
    }
  },
  form: {
    type: 'タイプ',
    title: '{create} {type}',
    name: '名称',
    description: '説明',
    date: '日付',
    person: 'メンバー',
    class: 'クラス',
    duration: '時間',
    classify: '分類',
    pending: '審査待ち',
    actions: {
      submit: '提出',
      cancel: 'キャンセル',
      save: '保存',
      reset: 'リセット'
    },
    upload: {
      name: 'アップロード',
      prompt: 'ここにファイルをクリックまたはドラッグしてアップロードします',
      allow: 'ファイルのみを許可する {type}'
    },
    details: '詳細',
    impression: '感想',
    image: '画像'
  },
  image: {
    upload: {
      name: 'アップロード',
      prompt: 'ここに画像をクリックまたはドラッグしてアップロードします',
      allow: '画像のみを許可する {type}'
    },
    select: {
      name: '選択'
    },
    empty: {
      name: '画像なし'
    }
  },
  units: {
    item: '項目',
    hour: '時間',
    word: '単語',
    person: '人'
  },
  impression: {
    write: '記入',
    name: '感想',
    reward: '報酬',
    actions: {
      write: '記入',
      reflect: '承認',
      view: '見る'
    },
    page: {
      write: {
        title: '感想を記入',
        view: '感想を見る',
        mine: '私の感想',
        prompt: 'ここに感想を記入してください',
        type: 'タイプ',
        actions: {
          submit: '提出',
          cancel: 'キャンセル',
          save: '保存'
        }
      },
      reflect: {
        title: '感想を承認',
        reward: 'ボランティア時間を獲得',
        actions: {
          approve: '承認',
          reject: '拒否',
          refuse: '拒否',
          check: '拒否は全校に公開され、取り消すことはできません。'
        },
        prompt: '{name} からのボランティア感想',
        history: {
          title: '歴史',
          empty: '歴史なし'
        }
      }
    }
  },
  registration: {
    name: '登録',
    title: '指定ボランティアに登録',
    deadline: '締め切り',
    location: '場所',
    class: 'クラス',
    count: '人が登録済み',
    single: {
      class: 'クラス',
      min: '最小',
      max: '最大'
    },
    remain: {
      time: '残り時間',
      position: '残りの位置'
    },
    status: {
      title: '状態',
      registered: '登録済み',
      unregistered: '未登録',
      unregisterable: '登録不可'
    },
    actions: {
      register: '登録',
      unregister: '登録解除',
      back: '戻る'
    }
  },
  special: {
    classify: {
      name: '分類',
      prize: '受賞',
      import: 'インポート',
      club: 'クラブ',
      deduction: '減点',
      other: 'その他'
    },
    prize: {
      name: '受賞',
      level: {
        name: 'レベル',
        district: '地区',
        city: '市',
        province: '省',
        national: '国',
        international: '国際'
      },
      type: {
        name: 'タイプ',
        personal: '個人',
        team: 'チーム'
      },
      classify: {
        name: '分類',
        sports: 'スポーツ',
        academy: 'アカデミー',
        art: 'アート',
        other: 'その他'
      },
      ranking: {
        levels: {
          above: '一等賞以上',
          first: '一等賞',
          second: '二等賞',
          third: '三等賞'
        },
        ranking: {
          name: 'ランキング',
          rank: 'ランク {start} - {end}'
        }
      }
    }
  },
  status: {
    title: '状態',
    draft: '下書き',
    refused: '拒否',
    rejected: '拒否',
    pending: '審査中',
    effective: '有効',
    steps: {
      first: '初審査',
      last: '最終審査'
    }
  }
}

export const frFR = {
  type: {
    specified: {
      name: 'Activité Spécifiée',
      short: 'Spécifiée',
      key: 'specified',
      description:
        "Les activités spécifiées sont des bénévoles créés par l'administrateur, publiés comme un recrutement, et doivent spécifier le nombre maximum de personnes pouvant s'inscrire pour chaque classe."
    },
    social: {
      name: 'Activité Sociale',
      short: 'Sociale',
      key: 'social',
      description:
        'Les activités sociales sont des bénévoles qui peuvent être créés par au moins le secrétaire, et tous les participants doivent être désignés au moment de la création. Il est limité aux bénévoles les week-ends et jours fériés hors campus pendant le semestre.'
    },
    scale: {
      name: 'Activité de Grande Échelle',
      short: 'Grande Échelle',
      key: 'scale',
      description:
        "Les activités de grande échelle sont des bénévoles qui peuvent être créés par n'importe qui en janvier - mars, juillet - octobre, et tous les participants doivent être désignés au moment de la création. Il est limité aux bénévoles sociaux pendant les vacances d'hiver et d'été selon le fichier de diffusion à grande échelle de l'école."
    },
    special: {
      name: 'Activité Spéciale',
      short: 'Spéciale',
      key: 'special',
      description:
        "Les activités spéciales sont des bénévoles créés par des administrateurs pour les gagnants de concours, les grandes échelles, etc. Les participants ne sont pas tenus de soumettre l'impression."
    },
    unknown: 'Inconnu'
  },
  mode: {
    'on-campus': {
      name: 'Activités sur le Campus',
      short: 'Sur le Campus',
      key: 'on-campus'
    },
    'off-campus': {
      name: 'Activités hors Campus',
      short: 'Hors Campus',
      key: 'off-campus'
    },
    'large-scale': {
      name: 'Pratique à Grande Échelle pendant les Vacances',
      short: 'Grande Échelle',
      key: 'large-scale'
    }
  },
  form: {
    type: 'Type',
    title: '{create} {type}',
    name: 'Nom',
    description: 'Description',
    date: 'Date',
    person: 'Membre(s) | Membre | Membres',
    class: 'Classe(s) | Classe | Classes',
    duration: 'Durée',
    classify: 'Classer',
    pending: 'En Attente',
    actions: {
      submit: 'Soumettre',
      cancel: 'Annuler',
      save: 'Sauvegarder',
      reset: 'Réinitialiser'
    },
    upload: {
      name: 'Télécharger',
      prompt: 'Cliquez ou faites glisser le fichier dans cette zone pour le télécharger',
      allow: 'Autoriser uniquement le fichier {type}'
    },
    details: 'Détails',
    impression: 'Impression',
    image: 'Image'
  },
  image: {
    upload: {
      name: 'Télécharger',
      prompt: "Cliquez ou faites glisser l'image dans cette zone pour le télécharger",
      allow: "Autoriser uniquement l'image {type}"
    },
    select: {
      name: 'Sélectionner'
    },
    empty: {
      name: 'Vide'
    }
  },
  units: {
    item: 'article | article | articles',
    hour: 'heure | heure | heures',
    word: 'mot | mot | mots',
    person: 'personne | personne | personnes'
  },
  impression: {
    write: 'Écrire',
    name: 'Impression',
    reward: 'Récompense',
    actions: {
      write: 'Écrire',
      reflect: 'Réfléchir',
      view: 'Voir'
    },
    page: {
      write: {
        title: "Écrire l'Impression",
        view: "Voir l'Impression",
        mine: 'Mon Impression',
        prompt: 'Veuillez écrire votre impression ici',
        type: 'Type',
        actions: {
          submit: 'Soumettre',
          cancel: 'Annuler',
          save: 'Sauvegarder'
        }
      },
      reflect: {
        title: "Réfléchir l'Impression",
        reward: 'Récompense',
        actions: {
          approve: 'Approuver',
          reject: 'Rejeter',
          refuse: 'Refuser',
          check: "Le refus sera rendu public à toute l'école, irrévocable, le temps non compté."
        },
        prompt: 'Impression écrite par {name}',
        history: {
          title: 'Histoire',
          empty: 'Aucune histoire'
        }
      }
    }
  },
  registration: {
    name: 'Inscription',
    title: "S'inscrire à l'Activité Spécifiée",
    deadline: 'Date Limite',
    location: 'Emplacement',
    class: 'Classe(s) | Classe | Classes',
    count: ' personne inscrite |  personne inscrite | personnes inscrites',
    single: {
      class: 'Classe',
      min: 'Min',
      max: 'Max'
    },
    remain: {
      time: 'Temps Restant',
      position: 'Position Restante'
    },
    status: {
      title: 'Statut',
      registered: 'Inscrit',
      unregistered: 'Non Inscrit',
      unregisterable: 'Non Inscriptible'
    },
    actions: {
      register: "S'inscrire",
      unregister: 'Se Désinscrire',
      back: 'Retour'
    }
  },
  special: {
    classify: {
      name: 'Classer',
      prize: 'Prix',
      import: 'Importer',
      club: 'Club',
      deduction: 'Déduction',
      other: 'Autre'
    },
    prize: {
      name: 'Prix',
      level: {
        name: 'Niveau',
        district: 'District',
        city: 'Ville',
        province: 'Province',
        national: 'National',
        international: 'International'
      },
      type: {
        name: 'Type',
        personal: 'Personnel',
        team: 'Équipe'
      },
      classify: {
        name: 'Classer',
        sports: 'Sports',
        academy: 'Académie',
        art: 'Art',
        other: 'Autre'
      },
      ranking: {
        levels: {
          above: 'Au-dessus du Premier Prix',
          first: 'Premier Prix',
          second: 'Deuxième Prix',
          third: 'Troisième Prix'
        },
        ranking: {
          name: 'Classer',
          rank: 'Rang {start} - {end}'
        }
      }
    }
  },
  status: {
    title: 'Statut',
    draft: 'Brouillon',
    refused: 'Refusé',
    rejected: 'Rejeté',
    pending: 'En Attente',
    effective: 'Effectif',
    steps: {
      first: 'Première',
      last: 'Dernière'
    }
  }
}

export const koKR = {}

export const ruRU = {}
