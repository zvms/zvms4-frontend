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
        'This activity is specified, it is created by the class secretary or department member, usually recorded as on-campus time',
      social:
        'This activity is social, it is created by the student or class secretary, usually recorded as off-campus time',
      practice:
        'This activity is practice, it is created by the department member, usually recorded as social practice time',
      special:
        'This activity is special, it is created by the department member, usually recorded as on-campus, off-campus or social practice time'
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

export const zhWY = {
  activity: {
    status: {
      pending: {
        secretary: '方当义工覆，若有所请，班级团支书',
        department: '方当义工覆，若有所请通行部成员'
      },
      effective: '该义工已效，可以正名，发义工等日',
      refused: '该义工已不修不可以复立而提交申请，或系有职掌'
    },
    type: {
      specified: '当为指义工义工，团支书（须勘）、行部成员行立，为校内义工书之时',
      social: '当为世义工义工，自生自成结（须勘）、团支书创，为校外义工书之时',
      practice: '其为人实义工，行部成员立可以自私选择项组队填报，书之以为时世行',
      special: '其为异义工义工，行部成员创，自书之为校内，或世校外义工日行'
    }
  },
  activityMember: {
    status: {
      draft: '君名该义工，请早空感，期未填写将去有时也然义工',
      pending: '该义工感会勘，有请之义且审计部成员管',
      rejected: '君义工感已破，不可填',
      effective: '公感之因义工勘，感之与',
      refused: '君义工感不已，连有长须，不可复提交'
    },
    mode: {
      'on-campus': '该义工为校内义工日书之，可以学平板空感',
      'off-campus&#39': '该义工为校外义工日书之，以填校外感时或须传照片为证',
      'social-practice': '义工为世所行，不可以有事于行部为证，'
    }
  },
  trophy: {
    status: {
      pending: '其角耳方覆，若有所请通行部成员',
      effective: '其角信已通勘，可常名，终带队师勘得应时',
      refused: '其角耳既不可复作而提交申请，或系有职掌'
    },
    type: {
      academic: '其竞为学科之角，为学，物理，化学，物之情，天文等学科竞',
      sports: '其竞为体育类竞，为篮球，足球，田径，游乒乓球，体育竞赛羽毛球等',
      art: '其竞为艺术类竞，为舞，歌，书画，摄影，设诸艺竞',
      others: '为其角之外角，须空明'
    },
    level: {
      district: '其竞为区级竞',
      city: '其竞为市级竞',
      province: '其竞为省级竞',
      national: '其竞为国家级竞',
      international: '其竞为国际级竞'
    },
    statement: '度，徒有获奖单个类义工总之不过十少。公余时为可计入 {time} 少。',
    prompt: '每于获奖者获奖择而书之若校外义工校内，书之而不可易获奖信。'
  }
}

export const zhTW = {
  activity: {
    status: {
      pending: {
        secretary: '該義工正在審核中, 若有問題請聯繫班級團支書',
        department: '該義工正在審核中, 若有問題請聯繫實踐部成員'
      },
      effective: '該義工已經生效, 可以正常報名, 發放義工時間等',
      refused: '該義工已被拒絕. 您可以重新創建並提交申請, 或者聯繫相關負責人'
    },
    type: {
      specified:
        '該義工為指定義工, 由團支書 (需要審核) 或實踐部成員進行創建, 一般記入為校內義工時間',
      social:
        '該義工為社會義工, 可由學生自行創建組織 (需要審核) 或團支書創建, 一般記入為校外義工時間',
      practice: '該義工為社會實踐, 由實踐部成員創建可選項並由個人組隊填報, 一般記入為社會實踐時間',
      special: '該義工為特殊義工, 由實踐部成員創建, 可自由記入為校內, 校外或者社會實踐義工時間'
    }
  },
  activityMember: {
    status: {
      draft: '您已經報名該義工, 請盡快填寫感想, 逾期未填寫將會被取消獲得義工時間的資格',
      pending: '該義工感想正在審核, 若有問題請聯繫義管會審計部成員',
      rejected: '您的義工感想已被打回, 您可以重新填寫',
      effective: '您的義工感想已通過審核, 感謝您的參與',
      refused: '您的義工感想已被拒絕, 您需要聯繫相關負責人, 不可重新提交'
    },
    mode: {
      'on-campus': '該義工為校內義工時間記入, 您可以使用學校平板填寫感想',
      'off-campus': '該義工為校外義工時間記入, 您在校外填寫感想時可能需要上傳照片作為證明',
      'social-practice': '該義工為社會實踐, 您需要給予相關材料至實踐部作為證明材料'
    }
  },
  trophy: {
    status: {
      pending: '該比賽信息正在審核中, 若有問題請聯繫實踐部成員',
      effective: '該比賽信息已通過審核, 您可以正常報名, 並在最終帶隊老師審核後獲得相應的時間',
      refused: '該比賽信息已被拒絕, 您可以重新創建並提交申請, 或者聯繫相關負責人'
    },
    type: {
      academic: '該比賽為學科類比賽, 一般為數學, 物理, 化學, 生物, 信息, 天文等學科競賽',
      sports: '該比賽為體育類比賽, 一般為籃球, 足球, 田徑, 游泳, 乒乓球, 羽毛球等體育競賽',
      art: '該比賽為藝術類比賽, 一般為舞蹈, 歌唱, 書法, 繪畫, 攝影, 設計等藝術競賽',
      others: '該比賽為其他類比賽, 您需要填寫明確'
    },
    level: {
      district: '該比賽為區級比賽',
      city: '該比賽為市級比賽',
      province: '該比賽為省級比賽',
      national: '該比賽為國家級比賽',
      international: '該比賽為國際級比賽'
    },
    statement:
      '根據規定，單個學生個人獲獎類義工總時長不超過 10 小時。您剩餘可計入時數為 {time} 小時。',
    prompt: '獲獎者可在每次獲獎時選擇記入校內或校外義工時間，記入後不可更改獲獎信息。'
  }
}

export const jaJP = {
  activity: {
    status: {
      pending: {
        secretary: 'このボランティアは審査中です。質問がある場合はクラスの書記に連絡してください',
        department:
          'このボランティアは審査中です。質問がある場合は実践部のメンバーに連絡してください'
      },
      effective:
        'このボランティアは有効です。通常通り申し込み、ボランティア時間の取得などができます',
      refused: 'このボランティアは拒否されました。新しいものを作成するか、担当者に連絡してください'
    },
    type: {
      specified:
        'このボランティアは指定されたものです。クラスの書記または実践部のメンバーによって作成され、通常は校内ボランティア時間として記録されます',
      social:
        'このボランティアは社会的なものです。学生またはクラスの書記によって作成され、通常は校外ボランティア時間として記録されます',
      practice:
        'このボランティアは実践的なものです。実践部のメンバーによって作成され、通常は社会実践時間として記録されます',
      special:
        'このボランティアは特別なものです。実践部のメンバーによって作成され、通常は校内、校外、または社会実践ボランティア時間として記録されます'
    }
  },
  activityMember: {
    status: {
      draft:
        'このボランティアに申し込みました。できるだけ早く感想を記入してください。そうしないとボランティア時間を失うことがあります',
      pending: 'あなたの感想は審査中です。質問がある場合は実践部のメンバーに連絡してください',
      rejected: 'あなたの感想は拒否されました。もう一度記入してください',
      effective: 'あなたの感想は承認されました。ご参加ありがとうございます',
      refused: 'あなたの感想は拒否されました。担当者に連絡する必要があります'
    },
    mode: {
      'on-campus':
        'このボランティアは校内ボランティア時間として記録されます。学校のタブレットを使用して感想を記入できます',
      'off-campus':
        'このボランティアは校外ボランティア時間として記録されます。感想を記入する際には写真を証拠としてアップロードする必要がある場合があります',
      'social-practice':
        'このボランティアは社会実践です。証拠として関連資料を実践部に提出する必要があります'
    }
  },
  trophy: {
    status: {
      pending: 'このトロフィーは審査中です。質問がある場合は実践部のメンバーに連絡してください',
      effective:
        'このトロフィーは有効です。通常通り申し込み、最終的な教師の承認後に時間を取得できます',
      refused: 'このトロフィーは拒否されました。新しいものを作成するか、担当者に連絡してください'
    },
    type: {
      academic:
        'このトロフィーは学術的なものです。通常は数学、物理、化学、生物、情報、天文などの学術競技会に使用されます',
      sports:
        'このトロフィーはスポーツです。通常はバスケットボール、サッカー、陸上競技、水泳、卓球、バドミントンなどのスポーツ競技会に使用されます',
      art: 'このトロフィーは芸術的なものです。通常はダンス、歌、書道、絵画、写真、デザインなどの芸術競技会に使用されます',
      others: 'このトロフィーはその他です。詳細を記入してください'
    },
    level: {
      district: 'このトロフィーは地区レベルです',
      city: 'このトロフィーは市レベルです',
      province: 'このトロフィーは省レベルです',
      national: 'このトロフィーは国家レベルです',
      international: 'このトロフィーは国際レベルです'
    },
    statement:
      '規定により、個々の学生のボランティア活動の総時間は 10 時間を超えることはできません。あなたの残りの時間は {time} 時間です。',
    prompt:
      '受賞者は、各受賞時に校内または校外ボランティアとしてクレジットされることを希望する場合、報告されたクレジットの時点で受賞情報を変更することはできません。'
  }
}

export const frFR = {
  activity: {
    status: {
      pending: {
        secretary:
          'Cette activité est en attente de validation, veuillez contacter le secrétaire de votre classe si vous avez des questions',
        department:
          'Cette activité est en attente de validation, veuillez contacter le membre du département si vous avez des questions'
      },
      effective:
        'Cette activité est effective, vous pouvez vous inscrire, obtenir le temps et ainsi de suite',
      refused:
        'Cette activité est refusée, vous pouvez en créer une nouvelle ou contacter la personne responsable'
    },
    type: {
      specified:
        'Cette activité est spécifiée, elle est créée par le secrétaire de classe ou le membre du département, généralement enregistrée comme temps sur le campus',
      social:
        "Cette activité est sociale, elle est créée par l'étudiant ou le secrétaire de classe, généralement enregistrée comme temps hors campus",
      practice:
        'Cette activité est pratique, elle est créée par le membre du département, généralement enregistrée comme temps de pratique sociale',
      special:
        'Cette activité est spéciale, elle est créée par le membre du département, généralement enregistrée comme temps sur le campus, hors campus ou de pratique sociale'
    }
  },
  activityMember: {
    status: {
      draft:
        'Vous vous êtes inscrit à cette activité, veuillez remplir vos sentiments dès que possible, sinon vous perdrez le temps',
      pending:
        "Vos sentiments sont en attente d'approbation, veuillez contacter le membre du département si vous avez des questions",
      rejected: 'Vos sentiments sont rejetés, vous pouvez les remplir à nouveau',
      effective: 'Vos sentiments sont approuvés, merci de votre participation',
      refused: 'Vos sentiments sont refusés, vous devez contacter la personne responsable'
    },
    mode: {
      'on-campus':
        "Cette activité est enregistrée comme temps sur le campus, vous pouvez utiliser la tablette de l'école pour remplir vos sentiments",
      'off-campus':
        'Cette activité est enregistrée comme temps hors campus, vous devrez peut-être télécharger des photos comme preuve lorsque vous remplissez vos sentiments',
      'social-practice':
        'Cette activité est une pratique sociale, vous devez soumettre les documents pertinents au département en guise de preuve'
    }
  },
  trophy: {
    status: {
      pending:
        'Ce trophée est en attente de validation, veuillez contacter le membre du département si vous avez des questions',
      effective:
        "Ce trophée est effectif, vous pouvez vous inscrire et obtenir le temps après l'approbation finale de l'enseignant",
      refused:
        'Ce trophée est refusé, vous pouvez en créer un nouveau ou contacter la personne responsable'
    },
    type: {
      academic:
        "Ce trophée est académique, généralement pour les compétitions de mathématiques, de physique, de chimie, de biologie, d'informatique, d'astronomie et autres",
      sports:
        "Ce trophée est sportif, généralement pour les compétitions de basket-ball, de football, d'athlétisme, de natation, de tennis de table, de badminton et autres",
      art: 'Ce trophée est artistique, généralement pour les compétitions de danse, de chant, de calligraphie, de peinture, de photographie, de design et autres',
      others: 'Ce trophée est autre, veuillez remplir les détails'
    },
    level: {
      district: 'Ce trophée est de niveau district',
      city: 'Ce trophée est de niveau ville',
      province: 'Ce trophée est de niveau province',
      national: 'Ce trophée est de niveau national',
      international: 'Ce trophée est de niveau international'
    },
    statement:
      "Conformément à la réglementation, le nombre total d'heures de travail bénévole pour un étudiant individuel dans la catégorie de récompense est limité à 10 heures. Votre temps créditable restant est de {time} heures.",
    prompt:
      'Les personnes qui reçoivent des récompenses peuvent être créditées comme bénévoles sur le campus ou hors campus au moment de chaque récompense si elles le souhaitent, et les informations sur les récompenses ne peuvent pas être modifiées après le moment où le crédit est signalé.'
  }
}
