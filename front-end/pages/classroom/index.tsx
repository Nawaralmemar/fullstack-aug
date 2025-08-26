import Header from '@components/header'
import ClassroomForm from '@components/classrooms/ClassroomForm'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { User } from '@types'

const ClassroomPage: React.FC = () => {
  const { t } = useTranslation()
  const [loggedInUser, setLoggedInUser] = useState<User>(null)

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')))
  }, [])

  const isAdmin = loggedInUser?.role === 'admin'

  return (
    <>
      <Head>
        <title>{t('classroom.title')}</title>
      </Head>
      <Header />
      <main>
        <section className="flex flex-col justify-center">
          {!isAdmin ? (
            <div className="text-center mt-6 text-red-800">{t('classroom.accessDenied')}</div>
          ) : (
            <div className="max-w-sm m-auto">
              <h3 className="px-0">{t('classroom.title')}</h3>
              <ClassroomForm />
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}

export default ClassroomPage
