import React from 'react'
import { markdownToHtml } from '../../../../utils/markdownToHtml'

import s from './s.module.scss'

interface Props {
	message: string
}

export const Message: React.FC<Props> = React.memo(({ message }) => {
	const processedHtml = markdownToHtml(message)

	return (
		<div
			className={s.message}
			dangerouslySetInnerHTML={{ __html: processedHtml }}
		/>
	)
})
