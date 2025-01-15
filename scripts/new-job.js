import { input } from '@inquirer/prompts'
import fs from 'fs'
import path from 'path'
import { isFileNameSafe } from './utils.js'

function getProjectFullPath(fileName) {
  return path.join('./src/content/experiences', `${fileName}.yaml`)
}

const fileName = await input({
  message: 'Please enter the file name',
  validate: (value) => {
    if (!isFileNameSafe(value)) {
      return 'File name can only contain letters, numbers, and hyphens'
    }
    const fullPath = getProjectFullPath(value)
    if (fs.existsSync(fullPath)) {
      return `${fullPath} already exists`
    }
    return true
  },
})

const title = await input({
  message: 'Please enter the job name',
})

const description = await input({
  message: 'Please enter the job description',
})

const role = await input({
  message: 'Please enter the your role',
})

const location = await input({
  message: 'Please enter the location',
})

const startDate = await input({
  message: 'Please enter the preview startDate',
})

const content = `title: ${title}
description: ${description}
role: ${role}
location: ${location}
startDate: ${startDate}
endDate: -
`

const fullPath = getProjectFullPath(fileName)
fs.writeFileSync(fullPath, content)
console.log(`${fullPath} created successfully`)
