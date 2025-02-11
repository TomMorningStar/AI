import React from 'react'
import { openai } from '../services/deepseekService'

interface Props {
	className?: string
}

const firsText = 'Создай завязку для игры в текстовую Одиссею (до 20 слов). Включи загадку, активный глагол и скрытую угрозу. Оставь выбор действия за игроком всегда из трех вариантов (это важно!). Каждый следующий шаг должен логично продолжать сюжет, сохраняя лаконичность (1-2 предложения). Пример: '

const M1_TITLE = 'Магия, драконы и эпические приключения'
const M2_TITLE = 'Космические путешествия и высокие технологии'

export const Test: React.FC<Props> = () => {
	const [response, setResponse] = React.useState('')
	const [loading, setLoading] = React.useState(false)
  const [state, setState] = React.useState('')

  const handleClick = async (text: string) => {
    setLoading(true);
    setResponse(""); // Сбрасываем предыдущий ответ
  
    try {
      const completion = await openai.chat.completions.create({
        model: 'deepseek/deepseek-chat',
        messages: [{ role: 'user', content: text }],
        stream: true
      });
  

      let accumulatedResponse = "";
      for await (const chunk of completion) {
        const chunkContent = chunk.choices[0]?.delta?.content || "";
        accumulatedResponse += chunkContent;

        setResponse(prev => {
          const lastSpaceIndex = accumulatedResponse.lastIndexOf(" ");
          return prev + accumulatedResponse.slice(prev.length, lastSpaceIndex > 0 ? lastSpaceIndex : undefined);
        });
        
        // Небольшая задержка для анимации
        await new Promise(resolve => setTimeout(resolve, 20));

        setResponse(accumulatedResponse)
      }


      console.log(accumulatedResponse);
      
  
    } catch (error) {
      console.error("API Error:", error);
      setResponse("Ошибка при получении ответа");
    } finally {
      setLoading(false);
    }
  };
  

  const handleInput = async () => {
		setLoading(true)

		const completion = await openai.chat.completions.create({
			model: 'deepseek/deepseek-chat',
			messages: [
				{
					role: 'user',
					content: `запомни контекст этого ответа ${response}` + `а дальше в скобках будет значение текстового поля (${state}) на которое нужно ответить.`,
				},
			],
		})

		setLoading(false)

		setResponse(completion.choices[0].message.content as string)
  }

	return (
		<div>
			<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <input type="text" onChange={(e) => setState(e.target.value)} value={state} style={{ border: '1px solid red', padding: '10px' }} placeholder='Введите текст' />
        <button
          onClick={handleInput}
					style={{ border: '1px solid red', padding: '10px' }}
				>
					Отправить
				</button>
				<button
					onClick={() => handleClick(firsText + M1_TITLE)}
					style={{ border: '1px solid red', padding: '10px' }}
				>
					{M1_TITLE}
				</button>
				<button
					onClick={() => handleClick(firsText + M2_TITLE)}
					style={{ border: '1px solid red', padding: '10px' }}
				>
					{M2_TITLE}
				</button>
			</div>

      {loading && (
        <div
          style={{
            marginTop: '20px',
            border: '1px solid red',
            padding: '10px',
          }}
        >
          Thinking...
        </div>
      )}

			{response && (
				<div
					style={{
						marginTop: '20px',
						border: '1px solid red',
						padding: '10px',
					}}
				>
					{response}
				</div>
			)}
		</div>
	)
}
