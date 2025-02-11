import React from 'react'
import { Genres } from '../../widgets/genres'
import { Title } from '../../widgets/title'

export const Home: React.FC = () => {
	return (
		<>
			<Title hasSubtitle={true} />
			<Genres />
		</>
	)
}
