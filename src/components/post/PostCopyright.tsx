import { author, site } from '@/config.json'
import { getFormattedDateTime } from '@/utils/date'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function getPostUrl(slug: string) {
  return new URL(slug, site.url).href
}

export function PostCopyright({
  title,
  slug,
  lastMod,
}: {
  title: string
  slug: string
  lastMod: Date
}) {
  const [lastModStr, setLastModStr] = useState('')
  const url = getPostUrl(slug)

  function handleCopyUrl() {
    navigator.clipboard.writeText(url)
    toast.success('Article link copied')
  }

  useEffect(() => {
    setLastModStr(getFormattedDateTime(lastMod))
  }, [lastMod])

  return (
    <section className="text-xs leading-loose text-secondary">
      <p>Article Title：{title}</p>
      <p>Author：{author.name}</p>
      <p>
        <span>Article Link：{url}</span>
        <span role="button" className="cursor-pointer select-none" onClick={handleCopyUrl}>
          [copy]
        </span>
      </p>
      <p>Last Modified：{lastModStr}</p>
      {/* <hr className="my-3 border-primary" /> */}
      {/* <div> */}
      {/*   <div className="float-right ml-4 my-2"> */}
      {/*     <AnimatedSignature /> */}
      {/*   </div> */}
      {/*   <p> */}
      {/*     For commercial reproduction, please contact the webmaster for authorization. For */}
      {/*     non-commercial reproduction, please indicate the source of this article and the article */}
      {/*     link. You can freely copy and distribute the work in any form in any media, and you can */}
      {/*     also modify and create, but the same license agreement must be used when distributing */}
      {/*     derivative works. */}
      {/*     <br /> */}
      {/*     This article adopts */}
      {/*     <a */}
      {/*       className="hover:underline hover:text-accent underline-offset-2" */}
      {/*       href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" */}
      {/*       target="_blank" */}
      {/*       rel="noopener noreferrer" */}
      {/*     > */}
      {/*       CC BY-NC-SA 4.0 */}
      {/*     </a> */}
      {/*     Proceed with permission. */}
      {/*   </p> */}
      {/* </div> */}
    </section>
  )
}
