import logo from '@/assets/Logo.svg'
import React from 'react'

import s from './s.module.scss'

interface Props {
	hasSubtitle?: boolean
}

export const Title: React.FC<Props> = ({ hasSubtitle }) => {
	return (
		<>
			<div className={s.logo}>
				<img src={logo} alt='logo' />
			</div>
			{hasSubtitle && (
				<p className={s.text}>
					Приключения в мирах, где ваши решения творят историю
				</p>
			)}
		</>
	)
}
