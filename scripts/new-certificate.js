import { input } from '@inquirer/prompts'
import fs from 'fs'
import path from 'path'
import { isFileNameSafe } from './utils.js'

function getProjectFullPath(fileName) {
  return path.join('./src/content/certificates', `${fileName}.yaml`)
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
  message: 'Please enter the certificate name',
})

const description = await input({
  message: 'Please enter the certificate description',
})
const link = await input({
  message: 'Please enter the certificate URL',
})

const earnedSkills = await input({
  message: 'Please enter the  earned skills',
})

const date = await input({
  message: 'Please enter the date',
})

const content = `title: ${title}
description: ${description}
link: ${link}
earnedSkills: [${earnedSkills}]
date: ${date}
draft: ${false}
`

const fullPath = getProjectFullPath(fileName)
fs.writeFileSync(fullPath, content)
console.log(`${fullPath} created successfully`)
