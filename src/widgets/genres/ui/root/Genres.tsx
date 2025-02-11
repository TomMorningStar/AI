import React from 'react'
import { Link } from 'react-router-dom'
import { LIST } from '../../../../root/data'

import s from './s.module.scss'

export const Genres: React.FC = () => {
	return (
		<ul className={s.list}>
			{LIST.map(genre => {
				return (
					<li className={s.listItem} key={genre.genre}>
						<Link className={s.link} to={`/chat/${genre.id}`}>
							<h2>{genre.genre}</h2>
							<p>{genre.description}</p>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
