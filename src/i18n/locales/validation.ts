export const enUS = {
  create: {
    name: {
      required: 'Name is required.'
    },
    date: {
      required: 'Date is required.',
      format: 'Date format is invalid.'
    },
    classify: {
      required: 'Origin of activity is required.'
    },
    upload: {
      required: 'Upload is required.'
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
        invalid: 'Duration is invalid. It should be a number and greater than 0 and less than 18.'
      }
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
    mode: {
      required: '义工模式不能为空。'
    },
    classify: {
      required: '义工来源不能为空。'
    },
    upload: {
      required: '上传不能为空。'
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
        invalid: '时长不正确。它应该是一个大于 0 并且小于 18 的数字。'
      }
    }
  }
}
