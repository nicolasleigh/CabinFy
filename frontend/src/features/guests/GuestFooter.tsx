import { GithubIcon, MailIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function GuestFooter({}) {
  const { i18n, t } = useTranslation();
  return (
    <footer className='bg-cGrey-0 text-cGrey-500 py-8 mt-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          {/* Navigation Links */}
          <div className='flex gap-6 text-sm '>
            <a
              href='https://linze.pro/projects'
              target='_blank'
              referrerPolicy='no-referrer'
              className='hover:text-cGrey-700'
            >
              {t("footer.projects")}
            </a>
            <a
              href='https://linze.pro/about'
              target='_blank'
              referrerPolicy='no-referrer'
              className='hover:text-cGrey-700'
            >
              {t("footer.about")}
            </a>
            <Link to='/admin/dashboard' className='hover:text-cGrey-700'>
              {t("footer.admin")}
            </Link>
          </div>

          {/* Brand or Name */}
          <div className='flex gap-4 '>
            <div className='text-sm text-cGrey-500'>&copy; {new Date().getFullYear()} Nicolas Leigh</div>
            {i18n.language === "zh" ? (
              <a href='https://beian.miit.gov.cn' target='_blank' rel='noreferrer nofollow' className='text-[13px]'>
                滇ICP备2024048511号
              </a>
            ) : null}
          </div>

          {/* Social Links */}
          <div className='flex gap-4 '>
            <a
              href='https://github.com/nicolasleigh'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-cGrey-700'
            >
              <GithubIcon size={20} />
            </a>

            <a href='mailto:nicolas.leigh@qq.com' className='hover:text-cGrey-700'>
              <MailIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
