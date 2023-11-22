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
    impression: 'Impression'
  },
  units: {
    item: 'item | item | items',
    hour: 'hour | hour | hours',
    word: 'word | word | words',
    person: 'person | person | people'
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
    impression: '感想'
  },
  units: {
    item: '项',
    hour: '小时',
    word: '字',
    person: '人'
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
  classify: {
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
    }
  },
  units: {
    item: '項',
    hour: '小時',
    word: '字',
    person: '人'
  },
  impression: {
    write: '填寫',
    name: '感想',
    reward: '獎勵',
    actions: {
      write: '填寫',
      reflect: '反饋'
    },
    page: {
      write: {
        title: '填寫感想',
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
  classify: {
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
      reflect: 'フィードバック'
    },
    page: {
      write: {
        title: '感想を記入',
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
  classify: {
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
      reflect: 'Réfléchir'
    },
    page: {
      write: {
        title: "Écrire l'Impression",
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

export const koKR = {
  type: {
    specified: {
      name: '지정 봉사',
      short: '지정',
      key: 'specified',
      description:
        '지정 봉사는 관리자가 생성하고 모집으로 게시하며 각 반별로 최대 등록 인원을 지정해야 합니다.'
    },
    social: {
      name: '사회 봉사',
      short: '사회',
      key: 'social',
      description:
        '사회 봉사는 부장 이상의 사람이 생성할 수 있으며 생성 시 모든 참여자를 지정해야 합니다. 학기 중 주말 및 공휴일에 교외에서만 봉사할 수 있습니다.'
    },
    scale: {
      name: '실천 봉사',
      short: '실천',
      key: 'scale',
      description:
        '실천 봉사는 누구나 생성할 수 있으며 생성 시 모든 참여자를 지정해야 합니다. 방학 중에는 학교 파일에 따라 사회 실천이 제한됩니다.'
    },
    special: {
      name: '특수 봉사',
      short: '특수',
      key: 'special',
      description:
        '특수 봉사는 관리자가 대회 수상자, 대규모 등을 위해 생성하는 봉사 등입니다. 참가자는 감상을 제출할 필요가 없습니다.'
    },
    unknown: '알 수 없음'
  },
  classify: {
    'on-campus': {
      name: '교내 봉사',
      short: '교내',
      key: 'on-campus'
    },
    'off-campus': {
      name: '교외 봉사',
      short: '교외',
      key: 'off-campus'
    },
    'large-scale': {
      name: '대형 실천',
      short: '실천',
      key: 'large-scale'
    }
  },
  form: {
    type: '유형',
    title: '{create} {type}',
    name: '이름',
    description: '설명',
    date: '날짜',
    person: '멤버',
    class: '반',
    duration: '시간',
    classify: '분류',
    pending: '심사 대기',
    actions: {
      submit: '제출',
      cancel: '취소',
      save: '저장',
      reset: '재설정'
    },
    upload: {
      name: '업로드',
      prompt: '여기를 클릭하거나 파일을 이 영역으로 드래그하여 업로드합니다.',
      allow: '{type} 파일만 허용'
    }
  },
  units: {
    item: '개',
    hour: '시간',
    word: '단어',
    person: '명'
  },
  registration: {
    name: '등록',
    title: '지정 봉사 등록',
    deadline: '마감일',
    location: '장소',
    class: '반',
    count: '명이 등록',
    single: {
      class: '반',
      min: '최소',
      max: '최대'
    },
    remain: {
      time: '남은 시간',
      position: '남은 자리'
    },
    status: {
      title: '상태',
      registered: '등록됨',
      unregistered: '미등록',
      unregisterable: '등록 불가'
    },
    actions: {
      register: '등록',
      unregister: '등록 취소',
      back: '돌아가기'
    }
  },
  special: {
    classify: {
      name: '분류',
      prize: '수상',
      import: '가져오기',
      club: '동아리',
      deduction: '감점',
      other: '기타'
    },
    prize: {
      name: '수상',
      level: {
        name: '수준',
        district: '지역',
        city: '시',
        province: '도',
        national: '국가',
        international: '국제'
      },
      type: {
        name: '유형',
        personal: '개인',
        team: '팀'
      },
      classify: {
        name: '분류',
        sports: '스포츠',
        academy: '학술',
        art: '예술',
        other: '기타'
      }
    }
  },
  impression: {
    write: '작성',
    name: '감상',
    reward: '보상',
    actions: {
      write: '작성',
      reflect: '피드백'
    },
    page: {
      write: {
        title: '감상 작성',
        prompt: '여기에 감상을 작성하세요',
        type: '유형',
        actions: {
          submit: '제출',
          cancel: '취소',
          save: '저장'
        }
      },
      reflect: {
        title: '감상 승인',
        reward: '봉사 시간 획득',
        actions: {
          approve: '승인',
          reject: '거절',
          refuse: '거절',
          check: '거절은 전교에 공개되며 취소할 수 없습니다.'
        },
        prompt: '{name}의 봉사 감상',
        history: {
          title: '기록',
          empty: '기록 없음'
        }
      }
    }
  },
  status: {
    title: '상태',
    draft: '초안',
    rejected: '거절됨',
    pending: '심사 중',
    effective: '유효',
    refused: '거절',
    steps: {
      first: '초심사',
      last: '종심사'
    }
  }
}

export const ruRU = {
  type: {
    specified: {
      name: 'Указанный волонтер',
      short: 'Указанный',
      key: 'specified',
      description:
        'Указанный волонтер создается администратором, публикуется как набор и должен указать максимальное количество людей, которые могут зарегистрироваться для каждого класса.'
    },
    social: {
      name: 'Социальный волонтер',
      short: 'Социальный',
      key: 'social',
      description:
        'Социальный волонтер может быть создан любым человеком, и все участники должны быть назначены при создании. Он ограничен волонтерами на выходные и праздничные дни вне кампуса в течение семестра.'
    },
    scale: {
      name: 'Практический волонтер',
      short: 'Практический',
      key: 'scale',
      description:
        'Практический волонтер может быть создан любым человеком, и все участники должны быть назначены при создании. Он ограничен социальными волонтерами во время зимних и летних каникул в соответствии с файлом широкого распространения школы.'
    },
    special: {
      name: 'Специальный волонтер',
      short: 'Специальный',
      key: 'special',
      description:
        'Специальный волонтер создается администратором для победителей конкурсов, масштабных и т. Д. Участникам не нужно отправлять впечатление.'
    },
    unknown: 'Неизвестный'
  },
  classify: {
    'on-campus': {
      name: 'Волонтеры на кампусе',
      short: 'На кампусе',
      key: 'on-campus'
    },
    'off-campus': {
      name: 'Волонтеры за пределами кампуса',
      short: 'Вне кампуса',
      key: 'off-campus'
    },
    'large-scale': {
      name: 'Практика во время каникул',
      short: 'Практика',
      key: 'large-scale'
    }
  },
  form: {
    type: 'Тип',
    title: '{create} {type}',
    name: 'Имя',
    description: 'Описание',
    date: 'Дата',
    person: 'Член(ы)',
    class: 'Класс(ы)',
    duration: 'Продолжительность',
    classify: 'Классифицировать',
    pending: 'В ожидании',
    actions: {
      submit: 'Отправить',
      cancel: 'Отмена',
      save: 'Сохранить',
      reset: 'Сброс'
    },
    upload: {
      name: 'Загрузить',
      prompt: 'Нажмите здесь или перетащите файл в эту область, чтобы загрузить',
      allow: 'Разрешить только файл {type}'
    }
  },
  units: {
    item: 'пункт',
    hour: 'час',
    word: 'слово',
    person: 'человек'
  },
  impression: {
    write: 'Написать',
    name: 'Впечатление',
    reward: 'Награда',
    actions: {
      write: 'Написать',
      reflect: 'Отзыв'
    },
    page: {
      write: {
        title: 'Написать впечатление',
        prompt: 'Пожалуйста, напишите свое впечатление здесь',
        type: 'Тип',
        actions: {
          submit: 'Отправить',
          cancel: 'Отмена',
          save: 'Сохранить'
        }
      },
      reflect: {
        title: 'Подтвердить впечатление',
        reward: 'Получить волонтерское время',
        actions: {
          approve: 'Утвердить',
          reject: 'Отклонить',
          refuse: 'Отказать',
          check: 'Отказ будет опубликован во всей школе, необратимый, время не будет учтено.'
        },
        prompt: 'Впечатление от {name}',
        history: {
          title: 'История',
          empty: 'Нет истории'
        }
      }
    }
  },
  registration: {
    name: 'Регистрация',
    title: 'Зарегистрируйтесь на указанную волонтерскую деятельность',
    deadline: 'Крайний срок',
    location: 'Место',
    class: 'Класс(ы)',
    count: ' человек зарегистрирован |  человек зарегистрирован | человек зарегистрированы',
    single: {
      class: 'Класс',
      min: 'Мин',
      max: 'Макс'
    },
    remain: {
      time: 'Оставшееся время',
      position: 'Оставшаяся позиция'
    },
    status: {
      title: 'Статус',
      registered: 'Зарегистрирован',
      unregistered: 'Не зарегистрирован',
      unregisterable: 'Не регистрируемый'
    },
    actions: {
      register: 'Зарегистрироваться',
      unregister: 'Отменить регистрацию',
      back: 'Назад'
    }
  },
  status: {
    title: 'Статус',
    draft: 'Черновик',
    rejected: 'Отклонено',
    pending: 'В ожидании',
    effective: 'Эффективный',
    refused: 'Отклонено',
    steps: {
      first: 'Первичный',
      last: 'Последний'
    }
  }
}
