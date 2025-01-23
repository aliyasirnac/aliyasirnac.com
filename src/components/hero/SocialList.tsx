import clsx from 'clsx'
import { hero } from '@/config.json'
import { motion } from 'framer-motion'

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function SocialList({ className }: { className?: string }) {
  return (
    <motion.ul
      className={clsx(
        'flex gap-4 flex-wrap items-center justify-center lg:justify-start',
        className,
      )}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: 0.1,
      }}
    >
      <a
        href="#"
        className="p-1 dark:bg-white hover:bg-black bg-black rounded-full dark:text-black dark:hover:text-white text-white hover:text-black"
      >
        CV
      </a>
      {hero.socials.map((social) => (
        <motion.li key={social.name} variants={itemVariants}>
          <a
            className="relative size-9 text-white text-xl flex justify-center items-center group"
            href={social.url}
            title={social.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className="absolute inset-0 -z-1 rounded-full group-hover:scale-105 transition"
              style={{ backgroundColor: social.color }}
            ></span>
            <i className={clsx('iconfont', social.icon)} />
          </a>
        </motion.li>
      ))}
    </motion.ul>
  )
}
