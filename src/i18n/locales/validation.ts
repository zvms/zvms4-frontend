export const enUS = {
  create: {
    name: {
      required: 'Name is required.'
    },
    date: {
      required: 'Date is required.',
      format: 'Date format is invalid.',
      future: 'Date should be in the future.'
    },
    classify: {
      required: 'Classify of special activity is required.'
    },
    upload: {
      required: 'Upload is required.'
    },
    specified: {
      location: {
        required: 'Location is required.'
      },
      deadline: {
        required: 'Deadline is required.',
        format: 'Deadline format is invalid.',
        future: 'Deadline should be in the future.'
      },
      classes: {
        required: 'Class ID is required.',
        invalid:
          'Class ID is invalid. Format: year (4 digits) + class (2 digits), Jiaochuan Academy starts with `1` of class, and Headquarter starts with `0` of class. Year is the year of entering high school.',
        undefined: 'Class ID is undefined.'
      },
      min: {
        required: 'Min is required.',
        invalid: 'Min is invalid. It should be a number and greater than 0.'
      },
      max: {
        required: 'Max is required.',
        invalid: 'Max is invalid. It should be a number and greater than 0 and min.'
      }
    },
    member: {
      person: {
        required: 'Person is required.'
      },
      mode: {
        required: 'Mode is required.'
      },
      duration: {
        required: 'Duration is required.',
        invalid: 'Duration is invalid. It should be a number and greater than 0 and less than 12.'
      }
    }
  },
  notification: {
    title: {
      required: 'Title is required.'
    },
    type: {
      required: 'Type is required.'
    },
    expire: {
      required: 'Expire is required.',
      format: 'Expire format is invalid.',
      future: 'Expire should be in the future.'
    },
    receivers: {
      required: 'Receivers is required when global is false.'
    },
    anoymous: {
      required: 'Anoymous is required.'
    }
  }
}

export const zhCN = {
  create: {
    name: {
      required: '名称不能为空。'
    },
    date: {
      required: '日期不能为空。',
      format: '日期格式不正确。'
    },
    classify: {
      required: '特殊活动分类不能为空。'
    },
    upload: {
      required: '上传不能为空。'
    },
    specified: {
      location: {
        required: '地点不能为空。'
      },
      deadline: {
        required: '截止日期不能为空。',
        format: '截止日期格式不正确。'
      },
      classes: {
        required: '班级 ID 不能为空。',
        invalid:
          '班级 ID 不正确。格式：年份（4 位数字）+ 班级（2 位数字），蛟川班以 `1` 开头，镇海班班级以 `0` 开头。年份是进入高一的年份。',
        undefined: '班级 ID 未定义。'
      },
      min: {
        required: '最小人数不能为空。',
        invalid: '最小人数不正确。它应该是一个数字，大于 0。'
      },
      max: {
        required: '最大人数不能为空。',
        invalid: '最大人数不正确。它应该是一个大于 0 和最小人数的数字。'
      }
    },
    member: {
      person: {
        required: '人员不能为空。'
      },
      mode: {
        required: '模式不能为空。'
      },
      duration: {
        required: '时长不能为空。',
        invalid: '时长不正确。它应该是一个大于 0 并且小于 12 的数字。'
      }
    }
  },
  notification: {
    title: {
      required: '标题不能为空。'
    },
    type: {
      required: '类型不能为空。'
    },
    expire: {
      required: '过期时间不能为空。',
      format: '过期时间格式不正确。',
      future: '过期时间应该在未来。'
    },
    receivers: {
      required: '非全局时，接收者不能为空。'
    },
    anoymous: {
      required: '匿名不能为空。'
    }
  }
}

export const zhTW = {
  create: {
    name: {
      required: '名稱不能為空。'
    },
    date: {
      required: '日期不能為空。',
      format: '日期格式不正確。'
    },
    classify: {
      required: '特殊活動分類不能為空。'
    },
    upload: {
      required: '上傳不能為空。'
    },
    specified: {
      location: {
        required: '地點不能為空。'
      },
      deadline: {
        required: '截止日期不能為空。',
        format: '截止日期格式不正確。'
      },
      classes: {
        required: '班級 ID 不能為空。',
        invalid:
          '班級 ID 不正確。格式：年份（4 位數字）+ 班級（2 位數字），蛟川班以 `1` 開頭，鎮海班班級以 `0` 開頭。年份是進入高一的年份。',
        undefined: '班級 ID 未定義。'
      },
      min: {
        required: '最小人數不能為空。',
        invalid: '最小人數不正確。它應該是一個數字，大於 0。'
      },
      max: {
        required: '最大人數不能為空。',
        invalid: '最大人數不正確。它應該是一個大於 0 和最小人數的數字。'
      }
    },
    member: {
      person: {
        required: '人員不能為空。'
      },
      mode: {
        required: '模式不能為空。'
      },
      duration: {
        required: '時長不能為空。',
        invalid: '時長不正確。它應該是一個數字，大於 0。'
      }
    }
  },
  notification: {
    title: {
      required: '標題不能為空。'
    },
    type: {
      required: '類型不能為空。'
    },
    expire: {
      required: '過期時間不能為空。',
      format: '過期時間格式不正確。',
      future: '過期時間應該在未來。'
    },
    receivers: {
      required: '非全局時，接收者不能為空。'
    },
    anoymous: {
      required: '匿名不能為空。'
    }
  }
}

export const jaJP = {
  create: {
    name: {
      required: '名前は必須です。'
    },
    date: {
      required: '日付は必須です。',
      format: '日付の形式が無効です。'
    },
    classify: {
      required: '特別なアクティビティの分類は必須です。'
    },
    upload: {
      required: 'アップロードは必須です。'
    },
    specified: {
      location: {
        required: '場所は必須です。'
      },
      deadline: {
        required: '締め切り日は必須です。',
        format: '締め切り日の形式が無効です。'
      },
      classes: {
        required: 'クラス ID は必須です。',
        invalid:
          'クラス ID が無効です。形式：年（4 桁）+ クラス（2 桁）、蛟川アカデミーはクラスの先頭に `1` を、本部はクラスの先頭に `0` を付けます。年は高校に入学した年です。',
        undefined: 'クラス ID が未定義です。'
      },
      min: {
        required: '最小人数は必須です。',
        invalid: '最小人数が無効です。それは数字であり、0 より大きい必要があります。'
      },
      max: {
        required: '最大人数は必須です。',
        invalid:
          '最大人数が無効です。それは数字であり、0 より大きく、最小人数より大きい必要があります。'
      }
    },
    member: {
      person: {
        required: '人は必須です。'
      },
      mode: {
        required: 'モードは必須です。'
      },
      duration: {
        required: '期間は必須です。',
        invalid: '期間が無効です。それは数字であり、0 より大きい必要があります。'
      }
    }
  },
  notification: {
    title: {
      required: 'タイトルは必須です。'
    },
    type: {
      required: 'タイプは必須です。'
    },
    expire: {
      required: '有効期限は必須です。',
      format: '有効期限の形式が無効です。',
      future: '有効期限は未来である必要があります。'
    },
    receivers: {
      required: 'グローバルが false の場合、受信者は必須です。'
    },
    anoymous: {
      required: '匿名は必須です。'
    }
  }
}

export const frFR = {
  create: {
    name: {
      required: 'Le nom est requis.'
    },
    date: {
      required: 'La date est requise.',
      format: 'Le format de la date est invalide.'
    },
    classify: {
      required: "La classification de l'activité spéciale est requise."
    },
    upload: {
      required: 'Le téléchargement est requis.'
    },
    specified: {
      location: {
        required: "L'emplacement est requis."
      },
      deadline: {
        required: 'La date limite est requise.',
        format: 'Le format de la date limite est invalide.'
      },
      classes: {
        required: "L'ID de la classe est requis.",
        invalid:
          "L'ID de la classe est invalide. Format : année (4 chiffres) + classe (2 chiffres), l'Académie Jiaochuan commence par `1` de classe, et le siège commence par `0` de classe. L'année est l'année d'entrée au lycée.",
        undefined: "L'ID de la classe est indéfini."
      },
      min: {
        required: 'Le minimum est requis.',
        invalid: 'Le minimum est invalide. Il doit être un nombre et supérieur à 0.'
      },
      max: {
        required: 'Le maximum est requis.',
        invalid: 'Le maximum est invalide. Il doit être un nombre et supérieur à 0 et au minimum.'
      }
    },
    member: {
      person: {
        required: 'La personne est requise.'
      },
      mode: {
        required: 'Le mode est requis.'
      },
      duration: {
        required: 'La durée est requise.',
        invalid: 'La durée est invalide. Il doit être un nombre et supérieur à 0.'
      }
    }
  },
  notification: {
    title: {
      required: 'Le titre est requis.'
    },
    type: {
      required: 'Le type est requis.'
    },
    expire: {
      required: "L'expire est requis.",
      format: "Le format de l'expire est invalide.",
      future: "L'expire doit être dans le futur."
    },
    receivers: {
      required: 'Les récepteurs sont requis lorsque global est faux.'
    },
    anoymous: {
      required: 'Anoymous est requis.'
    }
  }
}
