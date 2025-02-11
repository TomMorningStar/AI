import React from 'react'
import logo from '../../../../assets/logo.svg'

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
