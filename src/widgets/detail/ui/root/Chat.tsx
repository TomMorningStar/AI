import React from 'react'

import { Link } from 'react-router-dom'
import s from './s.module.scss'

interface Props {
	handleGenreClick: (num: string) => void
}

const BUTTONS = ['1', '2', '3']

export const Chat: React.FC<Props> = ({handleGenreClick}) => {
	return (
		<>
			<p className={s.text}>Выбор за тобой...</p>
			<div className={s.buttons}>
				{BUTTONS.map(button => {
					return (
						<button onClick={() => handleGenreClick(button)} className={s.button} key={button}>
							{button}
						</button>
					)
				})}
				<Link className={`${s.button} ${s.back}`} to={'/'}>На главную</Link>
			</div>
		</>
	)
}
