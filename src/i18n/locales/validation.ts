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
