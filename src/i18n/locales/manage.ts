export const zhCN = {
  merge: {
    title: '合并义工',
    form: {
      name: '名称',
      type: '类型',
      list: '列表',
      prompt: '注意：只有类型相同且有效的义工才能被合并。',
      overwrite: '覆盖时间',
      overwriteInfo:
        '如果启用此选项，如果待合并的义工中存在重复用户，其结果时间将是现有义工中的最大时间；否则将是总和。',
      overwritePrompt: {
        yes: '是',
        no: '否'
      },
      action: '合并'
    }
  },
  groupList: {
    title: '群组列表',
    columns: {
      name: '名称',
      permission: '权限',
      details: '详细信息',
      search: '搜索'
    }
  },
  groupDetails: {
    tabs: {
      users: '用户',
      activities: '义工',
      time: '时间',
      statistics: '统计',
      create: '新增'
    },
    userList: {
      checkPasswordPrompt: '查看密码修改情况',
      columns: {
        name: '姓名',
        id: '学号',
        group: '群组',
        classid: '班级',
        permission: '权限',
        pwdm: '密码修改情况',
        details: '详细信息',
        pwdmStatus: {
          true: '已修改',
          false: '未修改'
        },
        remove: '删除',
        submit: '提交'
      },
      open: '进入个人详细界面'
    },
    timeList: {
      diff: '查看与达标所差时间',
      filled: '已完成',
      diffed: '还差 {time} 小时'
    }
  },
  personalPanel: {
    tabs: {
      info: '信息',
      activity: '义工',
      modify: '修改',
      logs: '日志'
    },
    resetPassword: '重置该用户密码为学号',
    resetConfirm: '请确认您的操作。',
    notFound: '无此用户'
  },
  upload: {
    label: '上传',
    requirement:
      'xls/xlsx 文件，大小不超过 5 MiB。您应保证文件是由提供的模板导出的，否则服务器将拒绝它。',
    prompt: {
      black: '拖拽文件至此或',
      em: '点击上传'
    }
  },
  manage: {
    tabs: {
      groups: '群组',
      users: '用户',
      time: '时间',
      import: '导入',
      logs: '日志'
    }
  },
  exports: {
    title: '导出数据',
    range: {
      label: '范围',
      start: '开始日期',
      to: '至',
      end: '结束日期'
    },
    name: '文件名',
    format: '格式',
    cache: '缓存',
    cacheFields: {
      enabled: '启用缓存',
      disabled: '重新计算'
    },
    desc: '描述',
    descFields: {
      enabled: '包含描述',
      disabled: '不包含描述'
    },
    formats: {
      csv: 'CSV (逗号分隔值)',
      json: 'JSON (JavaScript 对象表示法)',
      excel: 'Excel (OpenXML)',
      html: 'HTML (超文本标记语言)',
      latex: 'LaTeX (Leslie Lamport TeX)'
    },
    actions: {
      export: '导出',
      download: '下载'
    },
    prompt: '导出任务 ID 为 {task}。确认您的进度，当任务完成时点击下方「下载」按钮。'
  }
}
