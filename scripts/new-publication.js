import { input } from '@inquirer/prompts'
import fs from 'fs'
import path from 'path'
import { isFileNameSafe } from './utils.js'

function getProjectFullPath(fileName) {
  return path.join('./src/content/publications', `${fileName}.yaml`)
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
  message: 'Please enter the publication name',
})

const authors = await input({
  message: 'Please enter authors, separated by semicolons',
})

const abstract = await input({
  message: 'Please enter the abstract',
})

const venue = await input({
  message: 'Please enter the publication venue',
})

const doi = await input({
  message: 'Please enter the DOI (optional)',
})

const link = await input({
  message: 'Please enter the publication URL',
})

const date = await input({
  message: 'Please enter the date',
})

const content = `title: ${JSON.stringify(title)}
authors:
${authors
  .split(';')
  .map((author) => `  - ${JSON.stringify(author.trim())}`)
  .join('\n')}
abstract: ${JSON.stringify(abstract)}
venue: ${JSON.stringify(venue)}
${doi ? `doi: ${JSON.stringify(doi)}\n` : ''}link: ${JSON.stringify(link)}
date: ${date}
`

const fullPath = getProjectFullPath(fileName)
fs.writeFileSync(fullPath, content)
console.log(`${fullPath} created successfully`)
