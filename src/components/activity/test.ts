export default [
  // SpecifiedActivity
  {
    _id: '5f9c3a7e8d3f4a2b9c7f4d62',
    type: 'specified',
    name: '数学竞赛',
    description: '参加数学竞赛，提高数学能力，赢取奖学金',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'first-instance-rejected',
        impression: '数学爱好者，期待竞赛',
        duration: 2,
        history: [
          {
            impression: '数学爱好者，期待竞赛',
            duration: 2,
            date: '2023-11-11T15:04:03.000Z',
            actioner: '5f9c3a7e8d3f4a2b9c7f4d64',
            action: 'registered'
          }
        ],
        images: []
      }
    ],
    duration: 2,
    date: '2023-11-18T15:04:03.000Z',
    createdAt: '2023-11-11T15:04:03.000Z',
    updatedAt: '2023-11-11T15:04:03.000Z',
    registration: {
      deadline: '2023-11-15T15:04:03.000Z',
      place: '教学楼101',
      classes: [
        {
          class: 1,
          min: 10,
          max: 20
        },
        {
          class: 2,
          min: 10,
          max: 20
        },
        {
          class: 3,
          min: 10,
          max: 20
        }
      ]
    }
  },

  // SocialActivity
  {
    _id: '5f9c3a7e8d3f4a2b9c7f4d67',
    type: 'social',
    name: '迎新晚会',
    description: '欢迎新生加入我们的大家庭，认识新朋友，享受美食和音乐',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'effective',
        impression: '新生，热情开朗，喜欢唱歌',
        duration: 3,
        history: [
          {
            impression: '新生，热情开朗，喜欢唱歌',
            duration: 3,
            date: '2023-11-11T15:04:03.000Z',
            actioner: '5f9c3a7e8d3f4a2b9c7f4d69',
            action: 'effective'
          }
        ],
        images: ['5f9c3a7e8d3f4a2b9c7f4d6a.jpg', '5f9c3a7e8d3f4a2b9c7f4d6b.jpg']
      }
    ],
    duration: 3,
    date: '2023-11-12T15:04:03.000Z',
    createdAt: '2023-11-11T15:04:03.000Z',
    updatedAt: '2023-11-11T15:04:03.000Z',
    image: ['5f9c3a7e8d3f4a2b9c7f4d6c.jpg', '5f9c3a7e8d3f4a2b9c7f4d6d.jpg']
  },

  // ScaleActivity
  {
    _id: '5f9c3a7e8d3f4a2b9c7f4d6e',
    type: 'scale',
    name: '校园跑步',
    description: '参与校园跑步，锻炼身体，增强体质，享受自然风光',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'first-instance',
        impression: '运动达人，喜欢跑步',
        duration: 1,
        history: [
          {
            impression: '运动达人，喜欢跑步',
            duration: 1,
            date: '2023-11-11T15:04:03.000Z',
            actioner: '5f9c3a7e8d3f4a2b9c7f4d70',
            action: 'first-instance'
          }
        ],
        images: []
      }
    ],
    duration: 1,
    date: '2023-11-13T15:04:03.000Z',
    createdAt: '2023-11-11T15:04:03.000Z',
    updatedAt: '2023-11-11T15:04:03.000Z'
  },

  // SpecialActivity
  {
    _id: '5f9c3a7e8d3f4a2b9c7f4d73',
    type: 'special',
    name: '国际交流',
    description: '参加国际交流，拓宽视野，学习外语，结识不同文化',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'rejected',
        impression: '外语高手，喜欢旅游',
        duration: 10,
        history: [
          {
            impression: '外语高手，喜欢旅游',
            duration: 10,
            date: '2023-11-11T15:04:03.000Z',
            actioner: '5f9c3a7e8d3f4a2b9c7f4d75',
            action: 'last-instance'
          }
        ],
        images: []
      },
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b1',
        status: 'approved',
        impression: '外语高手，喜欢旅游',
        duration: 10,
        history: [
          {
            impression: '外语高手，喜欢旅游',
            duration: 10,
            date: '2023-11-11T15:04:03.000Z',
            actioner: '5f9c3a7e8d3f4a2b9c7f4d76',
            action: 'last-instance'
          }
        ],
        images: []
      }
    ],
    duration: 10,
    date: '2023-11-14T15:04:03.000Z',
    createdAt: '2023-11-11T15:04:03.000Z',
    updatedAt: '2023-11-11T15:04:03.000Z',
    mode: 'off-campus',
    classify: 'import'
  }
]
