let path = require('path')
let { formatDate } = require('../lib/util')

let config = {
  basePath: path.resolve(__dirname, '../../logs'),
  error: {
    path: '/error',
    fileName: 'error',
  },
  success: {
    path: '/success',
    fileName: 'success'
  },
  warn:{
    path: '/warn',
    fileName: 'warn'
  }
}

let commonParams = {
  recipients: '收件人邮箱',
  subject: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
  sender: '发件人邮箱',
  attachment: {
    enable: true,
    filename: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') + '.txt',
    message: '请下载附件查看呦~'
  },
  SMTP: {
    host: '',
    secureConnection: true,
    auth: {
      user: "",
      pass: ""
    }
  }
}

let errorLogPath = config.basePath + config.error.path + "/" + config.error.fileName
let successLogPath = config.basePath + config.success.path + "/" + config.success.fileName
let warnLogPath = config.basePath + config.warn.path + "/" + config.warn.fileName

module.exports = {
  appenders:
    {
      errorLogger: {
        type: "dateFile",
        filename: errorLogPath,
        alwaysIncludePattern: true,
        pattern: "-yyyy-MM-dd-hh.log",
        path: config.error.path
      },
      successLogger: {
        type: "dateFile",
        filename: successLogPath,
        alwaysIncludePattern: true,
        pattern: "-yyyy-MM-dd-hh.log",
        path: config.success.path
      },
      warnLogger: {
        type: "dateFile",
        filename: warnLogPath,
        alwaysIncludePattern: true,
        pattern: "-yyyy-MM-dd-hh.log",
        path: config.warn.path
      },
      resEms: {
        type: 'smtp',
        transport: 'SMTP',
        recipients: commonParams.recipients,
        subject: commonParams.subject + '正常响应信息邮件',
        sender: commonParams.sender,
        attachment: commonParams.attachment,
        SMTP: commonParams.SMTP,
        sendInterval: 1200
      },
      errEms: {
        type: 'smtp',
        transport: 'SMTP',
        recipients: commonParams.recipients,
        subject: commonParams.subject + '错误响应信息邮件',
        sender: commonParams.sender,
        attachment: commonParams.attachment,
        SMTP: commonParams.SMTP,
        sendInterval: 20
      },
      warnEms: {
        type: 'smtp',
        transport: 'SMTP',
        recipients: commonParams.recipients,
        subject: commonParams.subject + '警告响应信息邮件',
        sender: commonParams.sender,
        attachment: commonParams.attachment,
        SMTP: commonParams.SMTP,
        sendInterval: 60
      }
    },
  categories: {
    warn: {
      appenders: ['warnLogger', 'warnEms'],
      level: 'warn'
    },
    error: {
      appenders: ['errorLogger', 'errEms'],
      level: 'error'
    },
    default: {
      appenders: ['successLogger', 'resEms'],
      level: 'trace'
    }
  } 
}