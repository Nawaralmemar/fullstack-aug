import classNames from 'classnames'
import React, { useState } from 'react'
import ClassroomService from '@services/ClassroomService'
import { useTranslation } from 'next-i18next'
import { StatusMessage } from '@types'

const ClassroomForm: React.FC = () => {
  const { t } = useTranslation()
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState<string>(null)
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([])

  const clearErrors = () => {
    setNameError(null)
    setStatusMessages([])
  }

  const validate = (): boolean => {
    clearErrors()

    if (!name || name.trim() === '') {
      setNameError(t('classroom.form.error.required'))
      return false
    }
    return true
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validate()) return

    const response = await ClassroomService.createClassroom(name)

    if (response.status === 201) {
      const created = await response.json()
      setStatusMessages([
        { message: t('classroom.form.success', { name: created.name, id: created.id }), type: 'success' },
      ])
      setName("")
    } else if (response.status === 409) {
      setStatusMessages([{ message: t('classroom.form.error.exists'), type: 'error' }])
    } else {
      setStatusMessages([{ message: t('general.error'), type: 'error' }])
    }
  }

  return (
    <div className="max-w-sm m-auto">
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({ ' text-red-800': type === 'error', 'text-green-800': type === 'success' })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
              {t('classroom.form.label.name')}
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {nameError && <div className="text-red-800 ">{nameError}</div>}
          </div>
        </div>
        <div className="row">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            {t('classroom.form.button')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClassroomForm
